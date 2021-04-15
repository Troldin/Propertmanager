import React, { Component } from "react";
import DataService from "../Services/service";
import {Link} from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 

export default class Admin extends Component {
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
    this.getAdmin = this.getAdmin.bind(this);
    this.updateAdmin = this.updateAdmin.bind(this);
    this.deleteAdmin = this.deleteAdmin.bind(this);

    this.state = {
      currentAdmin: {
        id: null,
        name: "",
        surname: "",
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
    this.getAdmin(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentAdmin: {
          ...prevState.currentAdmin,
          name:name
        }
      };
    });
  }
  onChangeSurname(e) {
    const surname = e.target.value;
    
    this.setState(prevState => ({
      currentAdmin: {
        ...prevState.currentAdmin,
        surname: surname
      }
    }));
  }
  onChangeAddress(e) {
    const address = e.target.value;
    
    this.setState(prevState => ({
      currentAdmin: {
        ...prevState.currentAdmin,
        address: address
      }
    }));
  }
  onChangePhone(e) {
    const phone = e.target.value;
    
    this.setState(prevState => ({
      currentAdmin: {
        ...prevState.currentAdmin,
        phone: phone
      }
    }));
  }
  onChangeCityZip(e) {
    const city_zip = e.target.value;
    
    this.setState(prevState => ({
      currentAdmin: {
        ...prevState.currentAdmin,
        city_zip: city_zip
      }
    }));
  }
  onChangePesel(e) {
    const pesel = e.target.value;
    
    this.setState(prevState => ({
      currentAdmin: {
        ...prevState.currentAdmin,
        pesel: pesel
      }
    }));
  }
  onChangePassword(e) {
    const password = e.target.value;
    
    this.setState(prevState => ({
      currentAdmin: {
        ...prevState.currentAdmin,
        password: password
      }
    }));
  }
  onChangeEmail(e) {
    const email = e.target.value;

    this.setState(function(prevState) {
      return {
        currentAdmin: {
          ...prevState.currentAdmin,
          email:email
        }
      };
    });
  }
  getAdmin(id) {
    
  DataService.getUser(id)
      .then(response => {
        this.setState({
          currentAdmin: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  
  updateAdmin() {
    
  DataService.updateUser(
      this.state.currentAdmin.id,
      this.state.currentAdmin
    )
      .then(response => {
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
  deleteAdmin() {    
    
  DataService.deleteUser(this.state.currentAdmin.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/owner/admin/list')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentAdmin } = this.state;

    return (
      <div className='container'>
        
        {currentAdmin ? (
          <div className="edit-form">
            <br />
            <h4>Zarządca</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Imię: </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentAdmin.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="surname">Nazwisko:</label>
                <input
                  type="text"
                  className="form-control"
                  id="surname"
                  value={currentAdmin.surname}
                  onChange={this.onChangeSurname}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Adres: </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  value={currentAdmin.address}
                  onChange={this.onChangeAddress}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Numer telefonu: </label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  value={currentAdmin.phone}
                  onChange={this.onChangePhone}
                />
              </div>  
              <div className="form-group">
                <label htmlFor="city_zip">Kod pocztowy: </label>
                <input
                  type="text"
                  className="form-control"
                  id="city_zip"
                  value={currentAdmin.city_zip}
                  onChange={this.onChangeCityZip}
                />
              </div>
              <div className="form-group">
                <label htmlFor="pesel">Pesel: </label>
                <input
                  type="text"
                  className="form-control"
                  id="pesel"
                  value={currentAdmin.pesel}
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
                  value={currentAdmin.email}
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
                to={"/owner/admin/list"}
              >
                <button   className="badge badge-dark">
                  Powrót do listy najemców
                </button>
            </Link>
            

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateAdmin}
            >
              Zaktualizuj
            </button>
            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteAdmin}
            >
              Usuń
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Admin...</p>
          </div>
        )}
      </div>
    );
  }
}