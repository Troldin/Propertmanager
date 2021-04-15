import React, { Component } from 'react';
import { Link } from "react-router-dom";
import DataService from "../Services/service";
import Cookies from 'js-cookie'; 

export default class BuidlingsList extends Component {
  constructor(props) {
    super(props);
    this.retrieve = this.retrieve.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActive = this.setActive.bind(this);

    this.state = {
    
      buildings: [],
      currentBuilding: null,
      currentIndex: -1
    };
  }

  componentDidMount() {
    this.retrieve();
  }
  retrieve() {

    DataService.getAllBuildingsByAdminId(Cookies.get('id'))
      .then(response => {
        this.setState({
          buildings: response.data
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
      currentBuilding: null,
      currentIndex: -1
    });
  }
  setActive(tenant, index) {
    this.setState({
      currentBuilding: tenant,
      currentIndex: index
    });
  }
  render() {
    const {  buildings, currentBuilding, currentIndex } = this.state;

    return (
      <div className="container">
        <br/>
      <div className="list row">
        
        <div className="col-md-6">
          <h4>List budynków</h4>

          <ul className="list-group">
            {buildings && 
              buildings.map((tenant, index) => (
                
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActive(tenant, index)}
                  onDoubleClick={() => {
                    window.location.href="/admin/contracts/buildings/units/" + currentBuilding.id;
                    }}
                  key={index}
                >
                  {tenant.street}
                   &nbsp; 
                  {tenant.building_nr}
                </li>
                
              ))}
          </ul>

          
        </div>
        <div className="col-md-6">
          {currentBuilding ? (
            <div>
              <h4>Budynek</h4>
              <div>
                <label>
                  <strong>Ulica:</strong>
                </label>{" "}
                {currentBuilding.street}
              </div>
              <div>
                <label>
                  <strong>Numer:</strong>
                </label>{" "}
                {currentBuilding.building_nr}
              </div>
              <div>
                <label>
                  <strong>Kod pocztowy:</strong>
                </label>{" "}
                {currentBuilding.city_zip}
              </div>
            
              
              
              <Link
                to={"/admin/applications/add/" + currentBuilding.id}
                className="badge badge-dark"
              >
                Lokale w budynku
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