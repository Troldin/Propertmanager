import React, { Component } from 'react';
import { Link } from "react-router-dom";
import DataService from "../Services/service";


export default class AdminList extends Component {
  constructor(props) {
    super(props);
    this.retrieveUsers = this.retrieveUsers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveUser = this.setActiveUser.bind(this);

    this.state = {
      tenants: [],
      currentTenant: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    this.retrieveUsers();
  }
  retrieveUsers() {
    DataService.getAllAdmins()
      .then(response => {
        this.setState({
          tenants: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  refreshList() {
    this.retrieveUsers();
    this.setState({
      currentTenant: null,
      currentIndex: -1
    });
  }

  setActiveUser(tenant, index) {
    this.setState({
      currentTenant: tenant,
      currentIndex: index
    });
  }

 

  render() {
    const {  tenants, currentTenant, currentIndex } = this.state;

    return (
      <div className="container">
        <br/>
      <div className="list row">
        
        <div className="col-md-6">
          <h4>List zarządców</h4>

          <ul className="list-group">
            {tenants && 
              tenants.map((tenant, index) => (
                
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveUser(tenant, index)}
                  onDoubleClick={() => {
                    window.location.href="/owner/admin/modify/" + currentTenant.id;
                    }}
                  key={index}
                >
                  {tenant.name }
                   &nbsp; 
                  {tenant.surname}
                </li>
                
              ))}
          </ul>

          
        </div>
        <div className="col-md-6">
          {currentTenant ? (
            <div>
              <h4>Zarządca</h4>
              <div>
                <label>
                  <strong>Imię:</strong>
                </label>{" "}
                {currentTenant.name}
              </div>
              <div>
                <label>
                  <strong>Nazwisko:</strong>
                </label>{" "}
                {currentTenant.surname}
              </div>
              <div>
                <label>
                  <strong>Email:</strong>
                </label>{" "}
                {currentTenant.email}
              </div>
              <div>
                <label>
                  <strong>Adres:</strong>
                </label>{" "}
                {currentTenant.address}
              </div>
              <div>
                <label>
                  <strong>Numer telefonu:</strong>
                </label>{" "}
                {currentTenant.phone}
              </div>

              <div>
                <label>
                  <strong>Kod pocztowy:</strong>
                </label>{" "}
                {currentTenant.city_zip}
              </div>
              <div>
                <label>
                  <strong>PESEL:</strong>
                </label>{" "}
                {currentTenant.pesel}
              </div>
              

              <Link
                to={"/owner/admin/modify/" + currentTenant.id}
                className="badge badge-warning"
              >
                Edytuj
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Wybierz najemcę z listy...</p>
            </div>
          )}
        </div>
      </div>
      </div>
    );
  }
}