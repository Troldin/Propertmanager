import React, { Component } from "react";
import DataService from "../Services/service";
import {Link} from "react-router-dom";

export default class Unit extends Component {
  constructor(props) {
    super(props);

    this.onChangeUnitNr = this.onChangeUnitNr.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.getUnit = this.getUnit.bind(this);
    this.updateUnit = this.updateUnit.bind(this);
    this.deleteUnit = this.deleteUnit.bind(this);

    this.state = {
      currentUnit: {
        id: null,
        unit_nr: "",
        price: ""
         
      },
      building_id: "1",
      message: "" 
    };
  }

  componentDidMount() {
    this.getUnit(this.props.match.params.id);
  }

  onChangeUnitNr(e) {
    const unit_nr = e.target.value;

    this.setState(function(prevState) {
      return {
        currentUnit: {
          ...prevState.currentUnit,
          unit_nr: unit_nr
        }
      };
    });
  }
  onChangePrice(e) {
    const price = e.target.value;
    
    this.setState(prevState => ({
      currentUnit: {
        ...prevState.currentUnit,
        price: price
      }
    }));
  }
  
  getUnit(id) {
    
  DataService.getUnit(id)
      .then(response => {
        this.setState({
          currentUnit: response.data,
          building_id: response.data.building_id
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  
  updateUnit() {
    
  DataService.updateUnit(
      this.state.currentUnit.id,
      this.state.currentUnit
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "Dane najemcy zostały pomyślnie zaktualizowane"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }
  deleteUnit() {    
    
  DataService.deleteUnit(this.state.currentUnit.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/owner/buildings/units/' + this.currentUnit.building_id)
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentUnit } = this.state;

    return (
      <div className='container'>
        
        {currentUnit ? (
          <div className="edit-form">
            <br />
            <h4>Mieszkanie</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Numer mieszkania: </label>
                <input
                  type="text"
                  className="form-control"
                  id="unit_nr"
                  value={currentUnit.unit_nr}
                  onChange={this.onChangeUnitNr}
                />
              </div>
              <div className="form-group">
                <label htmlFor="surname">Cena:</label>
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  value={currentUnit.price}
                  onChange={this.onChangePrice}
                />
              </div>
              
            </form>

            
            
            

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateUnit}
            >
              Zaktualizuj
            </button>
            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteUnit}
            >
              Usuń
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Unit...</p>
          </div>
        )}
      </div>
    );
  }
}