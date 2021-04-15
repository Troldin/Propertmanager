import React, { Component } from "react";
import DataService from "../Services/service";
import FormControl from "react-bootstrap/FormControl"
import {Link} from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export default class BuldingAdd extends Component {
  constructor(props) {
    super(props);

    this.onChangeStreet = this.onChangeStreet.bind(this);
    this.onChangeBuilidingNr = this.onChangeBuilidingNr.bind(this);
    this.onChangeCityZip = this.onChangeCityZip.bind(this);
    this.onChangeRestorerId = this.onChangeRestorerId.bind(this);
    this.onChangeAdministratorId = this.onChangeAdministratorId.bind(this);
    this.getAdmins = this.getAdmins.bind(this);
    this.getRestorers = this.getRestorers.bind(this);
    this.createBuilding = this.createBuilding.bind(this);
    this.newBuilding = this.newBuilding.bind(this);

    this.state = {
      admins: [],
      restorers: [],
      
        id: "",
        street: "",
        building_nr: "",
        city_zip: "",
        restorer_id: "",
        administrator_id: "",
      
      
      message: "" 
    };
  }

  componentDidMount() {
    this.getAdmins();
    this.getRestorers();
  }

  onChangeStreet(e) {
    this.setState({
      street: e.target.value
    });
    console.log(this.state.street);
  }
  onChangeBuilidingNr(e) {
    this.setState({
      building_nr: e.target.value
    });
  }
  onChangeCityZip(e) {
    this.setState({
      city_zip: e.target.value
    });
    console.log(this.state.city_zip)
  }
  onChangeRestorerId(e) {
    this.setState({
      restorer_id: e.target.value
    });
  }
  onChangeAdministratorId(e) {
    this.setState({
      administrator_id: e.target.value
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
  createBuilding() {
    var data = {
      street: this.state.street,
      building_nr: this.state.building_nr,
      city_zip: this.state.city_zip,
      restorer_id: this.state.restorer_id,
      administrator_id: this.state.administrator_id
    };

    DataService.createBuilding(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          street: response.data.street,
          building_nr: response.data.building_nr,
          city_zip: response.data.city_zip,
          restorer_id: response.data.restorer_id,
          administrator_id: response.data.administrator_id,

          submitted: true
        });
        confirmAlert({
          
          message: 'Pomyślnie dodano budynek',
          buttons: [
            {
              label: 'Dodaj kolejny budynek',
              onClick: () => this.newBuilding(),
            },
            {
              label: 'Lista budynków',
              onClick: () => this.props.history.push('/owner/buildings/list')
            }
          ]
        });
      })
      .catch(e => {
        console.log(e);
        alert(e.message)
      });
  }
  newBuilding() {
    this.setState({
      id: null,
      street: "",
      building_nr: "",
      city_zip: "",
      restorer_id: "",
      administrator_id: "",
    });
    this.props.history.push('/owner/buildings/add')
  }
 

  render() {

    return (
      <div className='container'>
        
        
          <div className="edit-form">
            <br />
            <h4>Budynek</h4>
            <form>
              <div className="form-group">
                <label htmlFor="street">Ulica: </label>
                <input
                  type="text"
                  name="street"
                  className="form-control"
                  id="street"
                  value={this.state.street}
                  onChange={this.onChangeStreet}
                />
              </div>
              <div className="form-group">
                <label htmlFor="building_nr">Numer budynku:</label>
                <input
                  type="text"
                  className="form-control"
                  id="building_nr"
                  value={this.state.building_nr}
                  onChange={this.onChangeBuilidingNr}
                />
              </div>
              <div className="form-group">
                <label htmlFor="city_zip">Kod pocztowy: </label>
                <input
                  type="text"
                  className="form-control"
                  id="city_zip"
                  value={this.state.city_zip}
                  onChange={this.onChangeCityZip}
                />
              </div>
              <div className="form-group">
                <label htmlFor="restorer_id">Konserwator budynku: </label>
                
                <FormControl as="select" onChange={this.onChangeRestorerId} value = {this.state.restorer_id} defaultValue  = "-- select an option -- " >
                                <option value="" selected disabled hidden></option>
                                {this.state.restorers && this.state.restorers.map((restorer, index) => {
                                  return <option id={index} value={restorer.id} > {restorer.name }&nbsp;{restorer.surname }&nbsp;({restorer.pesel})</option>;
                                 })}
                </FormControl>
              </div>  
              <div className="form-group">
                <label htmlFor="administrator_id">Administrator budynku: </label>
                
                <FormControl as="select" onChange={this.onChangeAdministratorId} value = {this.state.administrator_id} >
                                  <option value="" selected disabled hidden></option>
                                {this.state.admins && this.state.admins.map((admins, index) => {
                                  return <option id={index} value={admins.id} > {admins.name }&nbsp;{admins.surname}&nbsp;({admins.pesel})</option>;
                                 })}
                </FormControl>
                
              </div>
            </form>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.createBuilding}
            >
              Dodaj budynek
            </button>
            <Link
                to={"/owner/buildings/list"}
              >
                <button   className="badge badge-dark">
                  Powrót do listy budynków
                </button>
            </Link>
            

            
            
            
          </div>
        
      </div>
    );
  }
}