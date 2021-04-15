import React, { Component } from 'react';
import DataService from "../Services/service";
import Cookies from 'js-cookie'; 

export default class EmptycontractsList extends Component {
  constructor(props) {
    super(props);

    this.retrieveContracts = this.retrieveContracts.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActive = this.setActive.bind(this);


    this.state = {
  
      contracts: [],
      id: null,
      current: null,
      currentIndex: -1,
      contract_id: null,  
    };
  }

  componentDidMount() {    
    this.retrieveContracts(Cookies.get('id'));
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
                  
                  Adres: {unit.unit.building.street}  {unit.unit.building.building_nr} /Nr. Lokalu: {unit.unit.unit_nr} 
                   
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
              <div>
                <label>
                  <strong>Saldo:</strong>
                </label>{" "}
                {current.saldo} 
              </div>                       

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