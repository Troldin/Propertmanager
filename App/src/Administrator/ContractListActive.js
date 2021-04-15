import React, { Component } from 'react';
import { Link } from "react-router-dom";
import DataService from "../Services/service";
import Cookies from 'js-cookie'; 

export default class ContractList extends Component {
  constructor(props) {
    super(props);
    this.retrieveActive = this.retrieveActive.bind(this);
    this.retrieveExpired = this.retrieveExpired.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActive = this.setActive.bind(this);

    this.state = {
      active_contract: [],
      expired_contract: [],
      currentContract: null,
      currentIndex: -1,
      contract: []
    };
  }
  componentDidMount() {
    this.retrieveActive();
  }
  retrieveActive() { 
    DataService.getActive(Cookies.get('id'))
      .then(response => {
        this.setState({
          contract: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  retrieveExpired() {
    DataService.getExpired(Cookies.get('id'))
      .then(response => {
        this.setState({
          contract: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  refreshList() {
    this.setState({
      currentContract: null,
      currentIndex: -1
    });
  }
  setActive(contract, index) {
    this.setState({
      currentContract: contract,
      currentIndex: index
    });
  }

  
  

  render() {
    const {  contract, currentContract, currentIndex } = this.state;
    
    return (
        
      <div className="container">
        <br/>
        
      <div className="list row">
        <div className="col-md-6">
          <h4>List aktywnych umów</h4>
          <ul className="list-group">
            {contract && 
              contract.map((contract, index) => (
                
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActive(contract, index)}
                  
                  key={index}
                >
                  Nr. umowy:  &nbsp; 
                  {contract.id}
                   &nbsp; 
                  
                </li>
                
              ))}
          </ul>        
        </div>
        <div className="col-md-6">
          {currentContract ? (
            
            <div >

              <h4>Umowa</h4>
     
              <h5 className="text-info">Lokal</h5>
              <div>
                <label>
                  <strong>Adres:</strong>
                </label>{" "}
                {currentContract.unit.building.street}  {currentContract.unit.building.building_nr}
              </div>
              <div>
                <label>
                  <strong>Kod pocztowy:</strong>
                </label>{" "}
                {currentContract.unit.building.city_zip}
              </div>
              <div>
                <label>
                  <strong>Numer mieszkania:</strong>
                </label>{" "}
                {currentContract.unit.unit_nr}
              </div>
              <div>
                <label>
                  <strong>Czynsz (zł):</strong>
                </label>{" "}
                {currentContract.unit.price}
              </div>

              <h5 className="text-info">Najemca</h5>
              <div>
                <label>
                  <strong>Imię i nazwisko:</strong>
                </label>{" "}
                {currentContract.tenant.name} {currentContract.tenant.surname}
              </div>
              <div>
                <label>
                  <strong>Telefon:</strong>
                </label>{" "}
                {currentContract.tenant.phone} 
              </div>
              <div>
                <label>
                  <strong>Adres email:</strong>
                </label>{" "}
                {currentContract.tenant.email}
              </div>
              <h5 className="text-info">Dane umowy</h5>
              <div>
                <label>
                  <strong>Data początkowa:</strong>
                </label>{" "}
                {currentContract.start_date}
              </div>
              <div>
                <label>
                  <strong>Data końcowa:</strong>
                </label>{" "}
                {currentContract.end_date}
              </div>
              <div>
                <label>
                  <strong>Numer umowy:</strong>
                </label>{" "}
                {currentContract.id}
              </div>
              

              <Link
                to={"/owner/contract/units/" + currentContract.id}
                className="badge badge-danger"
              >
                Rozwiąż umowę 
              </Link>

              
            </div>
          ) : (
            <div>
              <br />
              <p>Wybierz umowę z listy...</p>
            </div>
          )}
        </div>
      </div>
      </div>
    );
  }
}