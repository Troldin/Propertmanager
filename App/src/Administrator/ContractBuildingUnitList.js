import React, { Component } from 'react';
import DataService from "../Services/service";
import FormControl from "react-bootstrap/FormControl";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 

export default class EmptyUnitsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangeEndDate = this.onChangeEndDate.bind(this);
    //this.onChangeUnitId = this.onChangeUnitId.bind(this);
    this.onChangeTenantId = this.onChangeTenantId.bind(this);
    this.retrieveUnits = this.retrieveUnits.bind(this);
    this.createContract = this.createContract.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActive = this.setActive.bind(this);

    this.state = {
      tenants: [],
      units: [],
      id: null,
      currentUnit: null,
      currentIndex: -1,
      search: "",
      contract_id: null,
      contract_start_date: "",
      contract_end_date: null,
      contract_tenant_id:""
      
    
    };
  }

  componentDidMount() {
    var url = window.location.pathname;
    var id = url.substring(url.lastIndexOf('/') + 1);     
    this.retrieveUnits(id);
    this.retrieveTenants();
  } 
  onChangeSearch(e) {
    const search = e.target.value;

    this.setState({
      search: search
    });
  }
  retrieveUnits(id) {
    DataService.getAvailable(id)
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
  retrieveTenants() {
    DataService.getAllTenants()
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
    this.retrieve();
    this.setState({
      currentUnit: null,
      currentIndex: -1
    });
  }
  setActive(unit, index) {
    
    this.setState({
      currentUnit: unit,
      currentIndex: index,
 
      contract_start_date: "",
      contract_end_date: null,
      contract_tenant_id:""
      
      
    });
    
  }
  onChangeEndDate(e) {
    this.setState({
      contract_end_date: e.target.value
       });
       console.log(this.state.contract_end_date)
  }
  onChangeStartDate(e) {
    console.log("sede") 
    this.setState({
      contract_start_date: e.target.value 
       });
    console.log(this.state.contract_start_date)
  }
  onChangeTenantId(e) {
    this.setState({
      contract_tenant_id: e.target.value 
       });
       console.log(this.state.contract_tenant_id)
  }
  createContract() { 
    var data = {
        start_date: this.state.contract_start_date,
        end_date: this.state.contract_end_date,
        tenant_id: this.state.contract_tenant_id,
        unit_id: this.state.currentUnit.id,
        price: this.state.currentUnit.price
    };
    DataService.createContract(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          start_date: response.data.start_date,
          end_date: response.data.end_date,
          price: response.data.price,
          tenant_id: response.data.tenant_id
        });
        confirmAlert({         
          message: 'Pomyślnie utworzono umowę',
          buttons: [
            {
              label: 'Lista aktywnych umów',
              onClick: () => this.props.history.push('/admin/contracts/list/active')
              
            },
            {
              label: 'Nowa umowa',
              onClick: () => this.props.history.push('/admin/contracts/buildings/list')
            }
          ]
        });
      })
      .catch(e => {
        console.log(e);
        alert(e.message)
      });
  }

  render() {
    const { units, currentUnit, currentIndex } = this.state;
    
    return (
      <div className="container">
        <br/> 
        
          
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
                    window.location.href="/owner/buildings/modifyunit/" + currentUnit.id;
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
              <h4>Utwórz umowę</h4>
              <form>
              <div>
                <label>
                  <strong>Numer:</strong>
                </label>{" "}
                {currentUnit.unit_nr}
              </div>
              <div>
                <label>
                  <strong>Czynsz (zł):</strong>
                </label>{" "}
                {currentUnit.price}
              </div>
              <div className="form-group">
                <label htmlFor="street">Data początkowa: </label>
                <input
                  type="date"
                  className="form-control"
                  id="tenant_start_date"
                  onChange={this.onChangeStartDate}
                  value={this.state.contract_start_date}
                />
              </div>
              <div className="form-group">
                <label htmlFor="tenant_end_date">Data końcowa: </label>
                <input
                  type="date"
                  className="form-control"
                  id="tenant_end_date"
                  onChange={this.onChangeEndDate}
                  value={this.state.contract_end_date}
                />
              </div>
              <div className="form-group">
                <label htmlFor="contract_tenant_id">Najemca: </label>
                
                <FormControl as="select" onChange={this.onChangeTenantId}>
                                <option value="" selected disabled hidden></option>
                                {this.state.tenants && this.state.tenants.map((tenants, index) => {
                                  return <option id={index} value={tenants.id} > {tenants.name }&nbsp;{tenants.surname}&nbsp;({tenants.id})</option>;
                                 })}
                </FormControl>
                
              </div>
                                 
              
              </form>
              <button
                type="submit"
                className="badge badge-success"
                onClick={this.createContract}
             >Utwórz</button>
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