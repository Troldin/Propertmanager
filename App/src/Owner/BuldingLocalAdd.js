import React, { Component } from "react";
import DataService from "../Services/service";
import {Link} from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export default class BuldingAdd extends Component {
  constructor(props) {
    super(props);

    this.onChangeUnitNr = this.onChangeUnitNr.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.createUnit = this.createUnit.bind(this);
    this.newUnit = this.newUnit.bind(this);

    this.state = {

      
        id: null,
        unit_nr: "",
        price: "",
        building_id: "",
      
      
      message: "" 
    };
  }
  
  onChangeUnitNr(e) {
    this.setState({
      unit_nr: e.target.value
    });
  }
  onChangePrice(e) {
    this.setState({
     price: e.target.value
    });
  }
  createUnit() {
    var data = {
      unit_nr: this.state.unit_nr,
      price: this.state.price,
      building_id: this.props.match.params.id,
      submitted: true
    };

    DataService.createUnit(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          unit_nr: response.data.unit_nr,
          price: response.data.price,
          building_id: response.data.building_id ,      
          
        });
        confirmAlert({
          
          message: 'Pomyślnie dodano lokal',
          buttons: [
            {
              label: 'Dodaj kolejny lokal w tym budynku',
              onClick: () => this.newUnit(),
            },
            {
              label: 'Lista lokali',
              onClick: () => this.props.history.push('/owner/buildings/units/' + this.props.match.params.id)
            },
            {
                label: 'List budynków',
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
  newUnit() {
    this.setState({
      id: null,
      unit_nr: "",
      price: "",
      building_id: "",
    });
    this.props.history.push('/owner/buildings/addunits/'+ this.props.match.params.id) 
  }
 

  render() {

    return (
      <div className='container'>
        
        
          <div className="edit-form">
            <br />
            <h4>Mieszkanie</h4>
            <form>
              <div className="form-group">
                <label htmlFor="street">Numer mieszkania: </label>
                <input
                  type="text"
                  name="unit_nr"
                  className="form-control"
                  id="unit_nr"
                  value={this.state.unit_nr}
                  onChange={this.onChangeUnitNr}
                />
              </div>
              <div className="form-group">
                <label htmlFor="building_nr">Czynsz:</label>
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  value={this.state.price}
                  onChange={this.onChangePrice}
                />
              </div>
              
            </form>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.createUnit}
            >
              Dodaj lokal
            </button>
            <Link
                to={"/owner/buildings/list"}
              >
                <button   className="badge badge-dark">
                  Powrót do listy lokali w budynku
                </button>
            </Link>
            

            
            
            
          </div>
        
      </div>
    );
  }
}