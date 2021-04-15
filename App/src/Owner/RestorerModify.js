import React, { Component } from "react";
import DataService from "../Services/service";
import {Link} from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 

export default class Tutorial extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeSurname = this.onChangeSurname.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeCityZip = this.onChangeCityZip.bind(this);
    this.onChangePesel = this.onChangePesel.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.getTenant = this.getTenant.bind(this);
    this.updateTenant = this.updateTenant.bind(this);
    this.deleteTenant = this.deleteTenant.bind(this);

    this.state = {
      currentTenant: {
        id: null,
        name: "",
        surname: "",
        password: "",
        email: "",
        address: "",
        phone: "",
        city_zip: "",
        pesel: "",
        
      },
      message: "" 
    };
  }

  componentDidMount() {
    this.getTenant(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTenant: {
          ...prevState.currentTenant,
          name:name
        }
      };
    });
  }
  
  onChangeSurname(e) {
    const surname = e.target.value;
    
    this.setState(prevState => ({
      currentTenant: {
        ...prevState.currentTenant,
        surname: surname
      }
    }));
  }
  onChangeAddress(e) {
    const address = e.target.value;
    
    this.setState(prevState => ({
      currentTenant: {
        ...prevState.currentTenant,
        address: address
      }
    }));
  }
  onChangePhone(e) {
    const phone = e.target.value;
    
    this.setState(prevState => ({
      currentTenant: {
        ...prevState.currentTenant,
        phone: phone
      }
    }));
  }
  onChangeCityZip(e) {
    const city_zip = e.target.value;
    
    this.setState(prevState => ({
      currentTenant: {
        ...prevState.currentTenant,
        city_zip: city_zip
      }
    }));
  }
  onChangePesel(e) {
    const pesel = e.target.value;
    
    this.setState(prevState => ({
      currentTenant: {
        ...prevState.currentTenant,
        pesel: pesel
      }
    }));
  }
  onChangePassword(e) {
    const password = e.target.value;
    
    this.setState(prevState => ({
      currentTenant: {
        ...prevState.currentTenant,
        password: password
      }
    }));
  }
  onChangeEmail(e) {
    const email = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTenant: {
          ...prevState.currentTenant,
          email:email
        }
      };
    });
  }
  getTenant(id) {  
  DataService.getUser(id)
      .then(response => {
        //response.data.password = '';
        this.setState({
          currentTenant: response.data
        });

        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
      
  }
  
  updateTenant() {
  
  DataService.updateUser(
      this.state.currentTenant.id,
      this.state.currentTenant
    )
      .then(response => {
        console.log(response.data);
        confirmAlert({
          title: 'Pomyślnie zaktualizowane dane!',
          buttons: [
            {
              label: 'Ok',
            }
          ]
        });
      })
      .catch(e => {
        console.log(e);
      });
  }
  deleteTenant() {    
    
  DataService.deleteUser(this.state.currentTenant.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/admin/tenants/list')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentTenant } = this.state;

    return (
      <div className='container'>
        
        {currentTenant ? (
          <div className="edit-form">
            <br />
            <h4>Konserwator</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Imię: </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentTenant.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="surname">Nazwisko:</label>
                <input
                  type="text"
                  className="form-control"
                  id="surname"
                  value={currentTenant.surname}
                  onChange={this.onChangeSurname}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Adres: </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  value={currentTenant.address}
                  onChange={this.onChangeAddress}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Numer telefonu: </label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  value={currentTenant.phone}
                  onChange={this.onChangePhone}
                />
              </div>  
              <div className="form-group">
                <label htmlFor="city_zip">Kod pocztowy: </label>
                <input
                  type="text"
                  className="form-control"
                  id="city_zip"
                  value={currentTenant.city_zip}
                  onChange={this.onChangeCityZip}
                />
              </div>
              <div className="form-group">
                <label htmlFor="pesel">Pesel: </label>
                <input
                  type="text"
                  className="form-control"
                  id="pesel"
                  value={currentTenant.pesel}
                  onChange={this.onChangePesel}
                />
              </div>
              <h3  className="text-dark" >Dane logowania</h3>
              <div className="form-group">
                <label htmlFor="pesel">Email: </label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  value={currentTenant.email}
                  onChange={this.onChangeEmail}
                />
              </div>
              <div className="form-group">
                <label htmlFor="surname">Nowe hasło</label>
                <input
                  type="text"
                  className="form-control"
                  id="password"
                  
                  onChange={this.onChangePassword}
                />
              </div>
            </form>

            
            <Link
                to={"/admin/restorers/list"}
              >
                <button   className="badge badge-dark">
                  Powrót do listy konserwatorów
                </button>
            </Link>
            

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateTenant}
            >
              Zaktualizuj
            </button>
            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteTenant}
            >
              Usuń
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    );
  }
}