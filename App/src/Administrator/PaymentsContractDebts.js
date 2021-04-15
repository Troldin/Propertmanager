import React, { Component } from 'react';
import DataService from "../Services/service";
import Cookies from 'js-cookie'; 

export default class PaymentsUserDebts extends Component {
  constructor(props) {
    super(props);
    this.retrieve = this.retrieve.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActive = this.setActive.bind(this);

    this.state = {
      contracts: [],
      currentContract: null,
      currentIndex: -1,
      search: ""
    };
  }

  componentDidMount() {
    this.retrieve();
  }
  retrieve() {
    DataService.getAllContractsDebtsByAdminId(Cookies.get('id'))
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
    const { search, contracts, currentContract, currentIndex } = this.state;

    return (
      <div className="container">
        <br/>
      <div className="list row" > 
        <div className="col-md-6">
          <h4>Umowy z zaległościami w płatnościach</h4>

          <ul className="list-group">
            {contracts && 
              contracts.map((contract, index) => (
                
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActive(contract, index)}
                  key={index}
                >
                  {contract.id}
                   &nbsp; 
                  {contract.saldo}
                </li>
                
              ))}
          </ul>

          
        </div>
        <div className="col-md-6">
          {currentContract ? (
            <div>
              <h4></h4>
              <div>
                <label>
                  <strong>Numer umowy:</strong>
                </label>{" "}
                {currentContract.id}
              </div>
              <h5 class="text-info">Obiekt umowy</h5>
              <div>
                <label>
                  <strong>Adres</strong>
                </label>{" "}
                 {currentContract.unit.building.street} {currentContract.unit.building.building_nr} Kod pocztowy {currentContract.unit.building.city_zip}
              </div>
              <div>
                <label>
                  <strong>Numer lokalu:</strong>
                </label>{" "}
                {currentContract.unit.unit_nr}
              </div>
              <h5 class="text-info">Płatności</h5>
              <div>
                <label>
                  <strong>Należność (zł):</strong>
                </label>{" "}
                {currentContract.naleznosc}
              </div>
              <div>
                <label>
                  <strong>Zaakceptowane wpłaty (zł):</strong>
                </label>{" "}
                {currentContract.zaakceptowane_wplaty}
              </div>
              <div>
                <label>
                  <strong>Oczekujące wpłaty (zł):</strong>
                </label>{" "}
                {currentContract.oczekujace_wplaty}
              </div>
              <div>
                <label>
                  <strong>Saldo (zł):</strong>
                </label>{" "}
                {currentContract.saldo}
              </div>
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