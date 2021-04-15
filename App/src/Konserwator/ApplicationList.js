import React, { Component } from 'react';
import { Link } from "react-router-dom";
import DataService from "../Services/service";
import Cookies from 'js-cookie'; 
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 

export default class ApplicationList extends Component {
  constructor(props) {
    super(props);
    this.retrieve = this.retrieve.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActive = this.setActive.bind(this);
    this.finishApplication = this.finishApplication.bind(this);
    this.resetApplication = this.resetApplication.bind(this);
    this.acceptApplication = this.acceptApplication.bind(this);
    this.declinedApplication = this.declinedApplication.bind(this);
    this.state = {
    
      application: [],
      currentApplication: null,
      currentIndex: -1,
      search: ""
    };
  }
  componentDidMount() {
    this.retrieve();
  }
  retrieve() {
    DataService.getAllRestorerApplications(Cookies.get('id'))
      .then(response => {
        this.setState({
          application: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  refreshList() {
    this.retrieve();
    this.setState({
      currentApplication: null,
      currentIndex: -1
    });
  }
  setActive(contract, index) {
    this.setState({
      currentApplication: contract,
      currentIndex: index
    });
  }
  acceptApplication(){
    var data = {
        status : '1'
    }
    DataService.updateApplication(
        this.state.currentApplication.id,
        data
      )
        .then(response => {
          console.log(response.data);
          confirmAlert({
            title: 'Pomyślnie zmienione status zgłoszenia',
            message: 'na "Przyjęto do realizacji"!',
            onClickOutside: () => {this.refreshList()},
            buttons: [
              {
                label: 'Ok',
                onClick: () => this.refreshList()
              },
              {
                label: 'Cofnij',
                onClick: () => this.resetApplication()
              }
            ]
          });
          
         
        })
        .catch(e => {
          console.log(e);
          alert(e)
        });
  }
  finishApplication(){
    var data = {
        status : '2'
    }
    DataService.updateApplication(
        this.state.currentApplication.id,
        data
      )
        .then(response => {
          console.log(response.data);
          confirmAlert({
            title: 'Pomyślnie zmienione status zgłoszenia',
            message: 'na "Ukończone"!',
            onClickOutside: () => {this.refreshList()},
            buttons: [
              {
                label: 'Ok',
                onClick: () => this.refreshList()
              },
              {
                label: 'Cofnij',
                onClick: () => this.resetApplication()
              }
            ]
          });
          
         
        })
        .catch(e => {
          console.log(e);
          alert(e)
        });
  }
  declinedApplication(){
    var data = {
        status : '3'
    }
    DataService.updateApplication(
        this.state.currentApplication.id,
        data
      )
        .then(response => {
          console.log(response.data);
          confirmAlert({
            title: 'Pomyślnie zmienione status zgłoszenia!',
            message: 'na "Odrzucone"!',
            onClickOutside: () => {this.refreshList()},
            buttons: [
              {
                label: 'Ok',
                onClick: () => this.refreshList()
              },
              {
                label: 'Cofnij',
                onClick: () => this.resetApplication()
              }
            ]
          });
          
         
        })
        .catch(e => {
          console.log(e);
          alert(e)
        });
  }
  resetApplication(){
    var data = {
        status : '0'
    }
    DataService.updateApplication(
        this.state.currentApplication.id,
        data
      )
      .then(response => {
        console.log(response.data);
        confirmAlert({
          title: 'Pomyślnie zresetowano status zgłoszenia!',
          buttons: [
            {
              label: 'Ok',
              onClick: () => this.refreshList()
            },
          ],
          onClickOutside: () => {this.refreshList()},
        });
      })
        .catch(e => {
          console.log(e);
        });
  }
  render() {
    const {application, currentApplication, currentIndex } = this.state;

    return (
      <div className="container">
        <br/>
      <div className="list row">
        <div className="col-md-6">
          <h4>List zgłoszeń</h4>

          <ul className="list-group">
            {application && 
              application.map((application, index) => (
                
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onDoubleClick={() => {
                    window.location.href="/konserwator/application/tasks/" + currentApplication.id;
                    }}
                  onClick={() => this.setActive(application, index)}
                  key={index}
                >
                  {application.description}
                   &nbsp; 
                  {application.building_id}
                </li>
                
              ))}
          </ul>

          
        </div>
        <div className="col-md-6">
          {currentApplication ? (
           
            <div>
              <h4>Zgłoszenie</h4>
              <div>
                <label>
                  <strong>Numer budynku:</strong>
                </label>{" "}
                {currentApplication.building_id}
              </div>
              <div>
                <label>
                  <strong>Numer lokalu:</strong>
                </label>{" "}
                {currentApplication.unit_id}
              </div>
              <div>
                <label>
                  <strong>Opis:</strong>
                </label>{" "}
                {currentApplication.description}
              </div>
              <div>
                {currentApplication.status == 0
                ?<div><strong>Status:</strong> Zgłoszone</div>
                :<div></div>}
                {currentApplication.status == 1
                ?<div><strong>Status:</strong> Zaakceptowane</div>
                :<div></div>}
                {currentApplication.status == 3
                ?<div><strong>Status:</strong> Odrzucone</div>
                :<div></div>}
                {currentApplication.status == 2
                ?<div><strong>Status:</strong> Ukończone</div>
                :<div></div>}
              </div>
              <Link
                to={"/konserwator/application/addtasks/"+ currentApplication.id}
                className="m-3 btn btn-sm badge-success"
              >
                Dodaj zadanie do zgłoszenia
              </Link>
              <Link
                to={"/konserwator/application/tasks/" + currentApplication.id}
                className="m-3 btn btn-sm badge-success"
              >
                Lista zadań
              </Link>
              
              <div>
              <strong>Zmień status</strong>
              <br/>
              {this.state.currentApplication.status == 0
              ?
              <div>
              <button  className="m-3 btn btn-sm badge-success" onClick={this.acceptApplication}>Zaakceptuj</button>
              <button  className="m-3 btn btn-sm badge-danger" onClick={this.declinedApplication}>Odrzuć</button>
              </div>: <div></div>}
              {this.state.currentApplication.status == 1
              ?
              <div>
              <button  className="m-3 btn btn-sm badge-success" onClick={this.finishApplication}>Potwierdź wykonanie</button>
              <button  className="m-3 btn btn-sm badge-warning" onClick={this.resetApplication}>Reset statusu</button>
              </div>: <div></div>}
              {this.state.currentApplication.status == 2 ||  this.state.currentApplication.status == 3
              ?
              <div>
              <button  className="m-3 btn btn-sm badge-warning" onClick={this.resetApplication}>Reset statusu</button>
              </div>: <div></div>}

              </div>
              
              
            </div>
          ) : (
            <div>
              <br />
              <p>Wybierz zgłoszenie z listy...</p>
            </div>
          )}
        </div>
      </div>
      </div>
    );
  }
}