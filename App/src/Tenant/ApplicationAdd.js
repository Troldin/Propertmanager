import React, { Component } from 'react';
import { Link } from "react-router-dom";
import DataService from "../Services/service";
import FormControl from "react-bootstrap/FormControl";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
import Cookies from 'js-cookie'; 

export default class EmptycontractsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onChangeDescription= this.onChangeDescription.bind(this);
    this.onChangeTenantId = this.onChangeTenantId.bind(this);
    this.retrieveContracts = this.retrieveContracts.bind(this);
    this.createApplication = this.createApplication.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActive = this.setActive.bind(this);
    this.search = this.search.bind(this);

    this.state = {
  
      contracts: [],
      id: null,
      current: null,
      currentIndex: -1,
      search: "",
      contract_id: null,
      description: ''   
    };
  }

  componentDidMount() {    
    this.retrieveContracts(Cookies.get('id'));
  } 
  onChangeSearch(e) {
    const search = e.target.value;

    this.setState({
      search: search
    });
  }
  // DO ZMIANY: pobierz wszystkie puste lokale (bez powiazanego contractu) w wczesniej wybranym budynku
  retrieveContracts(id) {
    DataService.getAllContractsByTenantId(id)
      .then(response => {
        this.setState({
          contracts: response.data
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
      current: null,
      currentIndex: -1
    });
  }
  setActive(unit, index) {
    
    this.setState({
      current: unit,
      currentIndex: index,     
    });
    
  }
  search() {
    DataService.findByTitle(this.state.search)
      .then(response => {
        this.setState({
          contracts: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  
  onChangeDescription(e) {
    this.setState({
      description: e.target.value
       });
  }
  onChangeTenantId(e) {
    this.setState({
      tenant_id: e.target.value
       });
  }
  createApplication() { 
    var url = window.location.pathname;  
    var data = {
        status: '0',
        description: this.state.description,
        user_id: Cookies.get('id'),
        unit_id: this.state.current.unit_id,
        building_id: this.state.current.unit.building_id,
    };
    DataService.createApplication(data)
      .catch(e => {
        console.log(e);
        alert(e.message)
      });
      confirmAlert({         
        message: 'Pomyślnie utworzono zgłoszenie',
        buttons: [
          {
            label: 'Lista twoich zgłoszeń',
            //onClick: () => this.props.history.push('admin/contracts/buildings/list')
            
          },
          {
            label: 'Nowa umowa',
            //onClick: () => this.props.history.push('admin/contracts/buildings/list')
          }
        ]
      });
  }
  
  

  render() {
    const { search, contracts, current, currentIndex } = this.state;
    
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
          <h4>List lokali</h4>

          <ul className="list-group">
            <li key={''}className={"list-group-item " + ('' === currentIndex ? "active" : "") } onClick={() => this.setActive(1, '') }  >Część wspólna</li>
            {contracts && 
              contracts.map((unit, index) => (
                
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActive(unit, index)}
                  key={index}
                >
                  Adres: {unit.unit.building.street}  {unit.unit.building.building_nr} /Nr. Lokalu: {unit.unit.unit_nr} 
                   
                </li>
                
              ))}
          </ul>

          
        </div>
        <div className="col-md-6">
          {current ? (
            <div>
              <h4>Utwórz zgłoszenie</h4>
              <form>
              <div>
                <label>
                  <strong>Numer lokalu:</strong>
                </label>{" "}
                {current.unit_nr}
              </div>
              <div className="form-group">
                <label htmlFor="street">Opis: </label>
                <textarea
                  className="form-control"
                  id="description"
                  onChange={this.onChangeDescription}
                  value={this.state.description}
                />
              </div>
                                 
              <button
                type="submit"
                className="badge badge-success"
                onClick={this.createApplication}
             >Utwórz</button>
              </form>
            </div>
          ) : (
            <div>
              <br />
              <p>Wybierz z listy czego tyczy sie zgłoszenie...</p>
            </div>
          )}
        </div>
      </div>
      </div>
    );
  }
}