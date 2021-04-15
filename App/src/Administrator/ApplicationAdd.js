import React, { Component } from 'react';
import DataService from "../Services/service";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
import Cookies from 'js-cookie'; 

export default class EmptyUnitsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeDescription= this.onChangeDescription.bind(this);
    this.onChangeTenantId = this.onChangeTenantId.bind(this);
    this.retrieveUnits = this.retrieveUnits.bind(this);
    this.createApplication = this.createApplication.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActive = this.setActive.bind(this);
    this.state = {
  
      units: [],
      id: null,
      currentUnit: null,
      currentIndex: -1,
      contract_id: null,
      description: ''   
    };
  }
  componentDidMount() {
    var url = window.location.pathname;
    var id = url.substring(url.lastIndexOf('/') + 1);     
    this.retrieveUnits(id);
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
      currentIndex: index,
 
      contract_start_date: "",
      contract_end_date: "",
      contract_tenant_id:""
      
      
    });
    
  } 
  onChangeDescription(e) {
    this.setState({
      description: e.target.value
       });
  }
  onChangeTenantId(e) {
    this.setState({
      tenant_id: e.target.value
       });
  }
  createApplication() { 
    var url = window.location.pathname;  
    var data = {
        status: '0',
        description: this.state.description,
        user_id: Cookies.get('id'),
        unit_id: this.state.currentUnit.id,
        building_id: url.substring(url.lastIndexOf('/') + 1),
    };
    DataService.createApplication(data)
      .catch(e => {
        console.log(e);
        alert(e.message)
      });
      confirmAlert({         
        message: 'Pomyślnie utworzono zgłoszenie',
        buttons: [
          {
            label: 'Lista twoich zgłoszeń',
            //onClick: () => this.props.history.push('admin/contracts/buildings/list')
            
          },
          {
            label: 'Nowa umowa',
            //onClick: () => this.props.history.push('admin/contracts/buildings/list')
          }
        ]
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
            <li key={''}className={"list-group-item " + ('' === currentIndex ? "active" : "") } onClick={() => this.setActive(1, '') }  >Część wspólna</li>
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
                  Nr. lokalu: {unit.unit_nr} 
                   
                </li>
                
              ))}
          </ul>

          
        </div>
        <div className="col-md-6">
          {currentUnit ? (
            <div>
              <h4>Utwórz zgłoszenie</h4>
              <form>
              <div>
                <label>
                  <strong>Numer lokalu:</strong>
                </label>{" "}
                {currentUnit.unit_nr}
              </div>
              <div className="form-group">
                <label htmlFor="street">Opis: </label>
                <textarea
                  className="form-control"
                  id="description"
                  onChange={this.onChangeDescription}
                  value={this.state.description}
                />
              </div>
                                 
              <button
                type="submit"
                className="badge badge-success"
                onClick={this.createApplication}
             >Utwórz</button>
              </form>
            </div>
          ) : (
            <div>
              <br />
              <p>Wybierz z listy czego tyczy sie zgłoszenie...</p>
            </div>
          )}
        </div>
      </div>
      </div>
    );
  }
}