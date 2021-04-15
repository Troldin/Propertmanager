import React, { Component } from 'react';
import DataService from "../Services/service";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
import Cookies from 'js-cookie'; 

export default class EmptycontractsList extends Component {
  constructor(props) {
    super(props);

    this.onChangeAmount= this.onChangeAmount.bind(this);
    this.onChangeTenantId = this.onChangeTenantId.bind(this);
    this.retrieveContracts = this.retrieveContracts.bind(this);
    this.createPayment = this.createPayment.bind(this);
    this.refreshList = this.refreshList.bind(this);


    this.state = {
  
      contracts: [],
      id: null,
      current: null,
      contract_id: null,
      amount: ''   
    };
  }
  componentDidMount() {    
    this.retrieveContracts(Cookies.get('id'));
  } 
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
  onChangeAmount(e) {
    this.setState({
        amount: e.target.value
       });
  }
  onChangeTenantId(e) {
    this.setState({
      tenant_id: e.target.value
       });
  }
  createPayment() { 

    var data = {
        status: '0',
        amount: this.state.amount,
        contract_id: this.state.current.id,
        date: Date.now()
    };
    DataService.createPayment(data)
      .catch(e => {
        console.log(e);
        alert(e.message)
      });
      confirmAlert({         
        message: 'Pomyślnie zarejestrowano płatność',
        buttons: [
          {
            label: 'Ok',
            onClick: () =>window.location.reload(true)
            
          }
        ]
      });
  }
  render() {
    const { contracts, current, currentIndex } = this.state;
    
    return (
      <div className="container">
        <br/> 
        
          
      <div className="list row">
        <div className="col-md-6">
          <h4>List lokali</h4>

          <ul className="list-group">
            
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
                  { unit.saldo < 0 
                  ? <div className="bg-warning">Adres: {unit.unit.building.street}  {unit.unit.building.building_nr} /Nr. Lokalu: {unit.unit.unit_nr}  - Zadłużenie! </div>
                  :<div>Adres: {unit.unit.building.street}  {unit.unit.building.building_nr} /Nr. Lokalu: {unit.unit.unit_nr} </div>
  }
                   
                </li>
                
              ))}
          </ul>

          
        </div>
        <div className="col-md-6">
          {current ? (
            <div>
              <h4>Dane umowy</h4>
         
              <div>
                <label>
                  <strong>Numer umowy:</strong>
                </label>{" "}
                {current.id}
              </div>  
              <div>
                <label>
                  <strong>Data początkowa:</strong>
                </label>{" "}
                {current.start_date}
              </div>
              <div>
                <label>
                  <strong>Data końcowa:</strong>
                </label>{" "}
                {current.end_date}
              </div>
              <div>
                <label>
                  <strong>Numer umowy:</strong>
                </label>{" "}
                {current.id}
              </div>               
              <div>
                <label>
                  <strong>Adres:</strong>
                </label>{" "}
                {current.unit.building.street}  {current.unit.building.building_nr}
              </div> 
              <div>
                <label>
                  <strong>Kod pocztowy:</strong>
                </label>{" "}
                {current.unit.building.city_zip} 
              </div>  
              <div>
                <label>
                  <strong>Numer lokalu:</strong>
                </label>{" "}
                {current.unit.unit_nr} 
              </div>
              <div>
                <label>
                  <strong>Czynsz:</strong>
                </label>{" "}
                {current.price} 
              </div>
             { current.saldo < 0
              ?
              <div>
              <h5 className="text-info">Dane do przelewu</h5>                      
              <form>
              <div>
                <label>
                  <strong>Kwota do wpłacenia:</strong>
                </label>{" "}
                {-1* current.saldo} 
              </div>
              <div className="form-group">
                <label htmlFor="street"><strong>Wpłacona kwota:</strong> </label>
                <input
                  className="form-control"
                  id="amount"
                  type="text"
                  onChange={this.onChangeAmount}
                  value={this.state.amount}
                />
              </div>
                                 
              <button
                type="submit"
                className="badge badge-success"
                onClick={this.createPayment}
             >Zadeklaruj płatność</button>
              </form>
              </div>
              : <div>
                  <h5 className="text-info">Dane do przelewu</h5>                      
              <form>
              
              <div className="form-group">
                <label htmlFor="street"><strong>Kwota nadpłacenia:</strong> </label>
                <input
                  className="form-control"
                  id="amount"
                  type="text"
                  onChange={this.onChangeAmount}
                  value={this.state.amount}
                />
              </div>
                                 
              
              </form>
              <button
                type="submit"
                className="badge badge-success"
                onClick={this.createPayment}
             >Zadeklaruj płatność</button>
              </div>
             }
            </div>
            
          ) : (
            <div>
              <br />
              <p>Wybierz z listy wynajmowany lokal...</p>
            </div>
          )}
        </div>
      </div>
      </div>
    );
  }
}