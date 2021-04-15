import React, { Component } from 'react';
import { Link } from "react-router-dom";
import DataService from "../Services/service";

export default class BuidlingsList extends Component {
  constructor(props) {
    super(props);
    this.retrieveUnits = this.retrieveUnits.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActive = this.setActive.bind(this);

    this.state = {
      units: [],
      id: null,
      currentUnit: null,
      currentIndex: -1,
      search: ""
    
    };
  }

  componentDidMount() {
    this.retrieveUnits(this.props.match.params.id);
  }
  retrieveUnits(id) {
    DataService.getUnitsByBuildingId(id)
      .then(response => {
        this.setState({
          units: response.data
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
      currentUnit: null,
      currentIndex: -1
    });
  }
  setActive(unit, index) {
    this.setState({
      currentUnit: unit,
      currentIndex: index
    });
  }
  render() {
    const { units, currentUnit, currentIndex } = this.state;

    return (
      <div className="container">
        <br/>
        <Link
                to={"/owner/buildings/addunits/"+ this.props.match.params.id}
              >
                <button   className="badge badge-dark">
                  Dodaj lokal
                </button>
        </Link>  
      <div className="list row">
        <div className="col-md-6">
          <h4>List lokali</h4>

          <ul className="list-group">
            {units && 
              units.map((unit, index) => (
                
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActive(unit, index)}
                  onDoubleClick={() => {
                    window.location.href="/owner/units/modify/" + currentUnit.id;
                    }}
                  key={index}
                >
                  {unit.unit_nr}
                   
                </li>
                
              ))}
          </ul>

          
        </div>
        <div className="col-md-6">
          {currentUnit ? (
            <div>
              <h4>Lokal</h4>
              
              <div>
                <label>
                  <strong>Numer:</strong>
                </label>{" "}
                {currentUnit.unit_nr}
              </div>
              <div>
                <label>
                  <strong>Najemca:</strong>
                </label>{" "}
                {currentUnit.name} &nbsp; {currentUnit.surname} 
              </div>
              <div>
                <label>
                  <strong>Czynsz (zł):</strong>
                </label>{" "}
                {currentUnit.price}
              </div>
              

              <Link
                to={"/owner/buildings/modifyunit/" + currentUnit.id}
                className="badge badge-warning"
              >
                Edytuj
              </Link>
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