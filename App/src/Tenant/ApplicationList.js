import React, { Component } from 'react';
import DataService from "../Services/service";
import Cookies from 'js-cookie'; 

export default class ApplicationList extends Component {
  constructor(props) {
    super(props);
    this.retrieve = this.retrieve.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActive = this.setActive.bind(this);
    this.deleteApplication = this.deleteApplication.bind(this);

    this.state = {
      application: [],
      currentApplication: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    this.retrieve();
  }

  retrieve() {
    DataService.getAllApplicationsByUserId(Cookies.get('id'))
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
  deleteApplication() {    
    
    DataService.deleteApplication(this.state.currentApplication.id)
        .then(response => {
          console.log(response.data);
          
          
        })
        .catch(e => {
          console.log(e);
        });
        window.location.reload(true)
       // this.props.history.push('/admin/applications/list')
    }
   
  render() {
    const { search, application, currentApplication, currentIndex } = this.state;

    return (
      <div className="container">
        <br/>
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={search}
              onChange={this.onChangeSearch}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.search}
              >
                Wyszukaj
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>List moich zgłoszeń</h4>

          <ul className="list-group">
            {application && 
              application.map((application, index) => (
                
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
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
              <h5 className="text-info">Dotyczy</h5>
              <div>
                <label>
                  <strong>Adres:</strong>
                </label>{" "}
                {currentApplication.building.street} {currentApplication.building.building_nr}
              </div>
              {currentApplication.unit_id === null
              ? 
              <div>
              <label>
                <strong>Dotyczy części wspólnej</strong>
              </label>
            </div>
              :
            <div>
            <label>
              <strong>Numer lokalu:</strong>
            </label>{" "}
            {currentApplication.unit.unit_nr}
          </div>
              }
              <div>
                <label>
                  <strong>Kod pocztowy:</strong>
                </label>{" "}
                {currentApplication.building.city_zip}
              </div>
              <h5 className="text-info">Dane zgłoszenia</h5>
              <div>
                <label>
                  <strong>Opis zgłoszenia:</strong>
                </label>{" "}
                {currentApplication.description}
              </div>
              <h5 className="text-info">Status</h5>
              {currentApplication.status === 0
              ?
              <div>
              
               Przyjęte do realizacji
               <button  className="m-3 btn btn-sm badge-danger" onClick={this.deleteApplication}>Anuluj zgłoszenie</button>
            </div>
              :<div></div>
              }
              {currentApplication.status === 1
              ?
              
              <div>
               W realizacji
              </div>
            
              :<div></div>
              }
              {currentApplication.status === 2
              ?
              <div>
               Ukończone
              </div>
              :<div></div>
              }
              {currentApplication.status === 3
              ?
              <div>
              
               Odrzucone
            </div>
              :<div></div>
              }

              
            </div>
          ) : (
            <div>
              <br />
              <p>Wybierz budynek z listy...</p>
            </div>
          )}
        </div>
      </div>
      </div>
    );
  }
}