import React, { Component } from "react";
import DataService from "../Services/service";
import FormControl from "react-bootstrap/FormControl"
import {Link} from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 

export default class Building extends Component {
  constructor(props) {
    super(props);

    this.onChangeStreet = this.onChangeStreet.bind(this);
    this.onChangeBuilidingNr = this.onChangeBuilidingNr.bind(this);
    this.onChangeCityZip = this.onChangeCityZip.bind(this);
    this.onChangeRestorerId = this.onChangeRestorerId.bind(this);
    this.onChangeAdministratorId = this.onChangeAdministratorId.bind(this);
    this.getBuilding = this.getBuilding.bind(this);
    this.updateBuilding = this.updateBuilding.bind(this);
    this.deleteBulding = this.deleteBulding.bind(this);
    this.getAdmins = this.getAdmins.bind(this);
    this.getRestorers = this.getRestorers.bind(this);

    this.state = {
      admins: [],
      restorers: [],
      currentBuilding: {
        id: null,
        street: "",
        building_nr: "",
        city_zip: "",
        restorer_id: "",
        administrator_id: "",
      },
      
      message: "" 
    };
  }

  componentDidMount() {
    this.getBuilding(this.props.match.params.id);
    this.getAdmins();
    this.getRestorers();
  }

  onChangeStreet(e) {
    const street = e.target.value;

    this.setState(function(prevState) {
      return {
        currentBulding: {
          ...prevState.currentBulding,
          street:street
        }
      };
    });
  }
  onChangeBuilidingNr(e) {
    const building_nr = e.target.value;
    
    this.setState(prevState => ({
      currentBulding: {
        ...prevState.currentBulding,
        building_nr: building_nr
      }
    }));
  }
  onChangeCityZip(e) {
    const city_zip = e.target.value;
    
    this.setState(prevState => ({
      currentBulding: {
        ...prevState.currentBulding,
        city_zip: city_zip
      }
    }));
  }
  onChangeRestorerId(e) {
    const restorer_id = e.target.value;
    
    this.setState(prevState => ({
      currentBulding: {
        ...prevState.currentBulding,
        restorer_id: restorer_id
      }
    }));
  }
  onChangeAdministratorId(e) {
    const administrator_id = e.target.value;
    
    this.setState(prevState => ({
      currentBulding: {
        ...prevState.currentBulding,
        administrator_id: administrator_id
      }
    }));
  }
  getBuilding(id) {
    
  DataService.getBuilding(id)
      .then(response => {
        this.setState({
          currentBulding: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    
  }

  getRestorers() {
    DataService.getAllRestorers()
      .then(response => {
        this.setState({
          restorers: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  getAdmins() {
    DataService.getAllAdmins()
      .then(response => {
        this.setState({
          admins: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  
  updateBuilding() {
    
  DataService.updateBuilding(
      this.state.currentBulding.id,
      this.state.currentBulding
    )
      .then(response => {
        console.log(response.data);
        confirmAlert({
          title: 'Pomyślnie zaktualizowano dane!',
          message: response.data.massage,
          buttons: [
            {
              label: 'Dalsza modyfikacja',
           
            },
            {
              label: 'Powrót do listy budynków',
              onClick: () => this.props.history.push('/owner/buildings/list')
            }
          ]
        });
        
       
      })
      .catch(e => {
        console.log(e);
        alert(e)
      });
  }
  deleteBulding() {    
 
    confirmAlert({
      
      message: 'Czy na pewno chcesz usunąć ten obiekt?',
      buttons: [
        {
          label: 'Tak',
          onClick: () => DataService.deleteBuilding(this.state.currentBulding.id)
          .then(response => {
            console.log(response.data);
            this.props.history.push('/owner/buildings/list')
          })
          .catch(e => {
            console.log(e);
          })
        },
        {
          label: 'Nie'
        }
      ]
    });
  
  }
  

  render() {
    const { currentBulding } = this.state;

    return (
      <div className='container'>
        
        {currentBulding ? (
          <div className="edit-form">
            <br />
            <h4>Budynek</h4>
            <form>
              <div className="form-group">
                <label htmlFor="street">Ulica: </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentBulding.street}
                  onChange={this.onChangeStreet}
                />
              </div>
              <div className="form-group">
                <label htmlFor="building_nr">Numer budynku:</label>
                <input
                  type="text"
                  className="form-control"
                  id="building_nr"
                  value={currentBulding.building_nr}
                  onChange={this.onChangeBuilidingNr}
                />
              </div>
              <div className="form-group">
                <label htmlFor="city_zip">Kod pocztowy: </label>
                <input
                  type="text"
                  className="form-control"
                  id="city_zip"
                  value={currentBulding.city_zip}
                  onChange={this.onChangeCityZip}
                />
              </div>
              <div className="form-group">
                <label htmlFor="restorer_id">Konserwator budynku: </label>
                
                <FormControl as="select" onChange={this.onChangeRestorerId} value = {currentBulding.restorer_id}  >
                                {this.state.restorers && this.state.restorers.map((restorer, index) => {
                                  return <option id={index} value={restorer.id} > {restorer.name }&nbsp;{restorer.surname }&nbsp;({restorer.pesel})</option>;
                                 })}
                </FormControl>
              </div>  
              <div className="form-group">
                <label htmlFor="administrator_id">Administrator budynku: </label>
                
                <FormControl as="select" onChange={this.onChangeAdministratorId} value = {currentBulding.administrator_id}  >
                                {this.state.admins && this.state.admins.map((admins, index) => {
                                  return <option id={index} value={admins.id} > {admins.name }&nbsp;{admins.surname}&nbsp;({admins.pesel})</option>;
                                 })}
                </FormControl>
                
              </div>
            </form>

            
            <Link
                to={"/owner/buildings/list"}
              >
                <button   className="badge badge-dark">
                  Powrót do listy budynków
                </button>
            </Link>
            

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateBuilding}
            >
              Zaktualizuj
            </button>
            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteBulding}
            >
              Usuń
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Nie udało sie pobrać danych o budynku</p>
          </div>
        )}
      </div>
    );
  }
}