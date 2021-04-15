import React, { Component } from 'react';
import DataService from "../Services/service";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Cookies from 'js-cookie';  

export default class PaymentsListNotVerified extends Component {
  constructor(props) {
    super(props);
    this.retrieve = this.retrieve.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActive = this.setActive.bind(this);
    this.aceptPayment = this.aceptPayment.bind(this);
    this.declinedPayment = this.declinedPayment.bind(this);
    this.resetPayment = this.resetPayment.bind(this);
    this.state = {
      payments: [],
      currentPayment: null,
      currentIndex: -1,

    };
  }

  componentDidMount() {
    this.retrieve();
  }

  

  retrieve() {
    //DataService.getPaymentsNotVerifiedByAdminId(Cookies.get('id'))
    DataService.getAllPaymentsNotVerified()
      .then(response => {
        this.setState({
          payments: response.data
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
      currentPayment: null,
      currentIndex: -1
    });
  }
  setActive(tenant, index) {
    this.setState({
      currentPayment: tenant,
      currentIndex: index
    });
  }
  
  aceptPayment(){
    var data = {
        status : '1'
    }
    DataService.updatePayment(
        this.state.currentPayment.id,
        data
      )
        .then(response => {
          console.log(response.data);
          confirmAlert({
            title: 'Pomyślnie zmienione status płatności!',
            message: response.data.massage,
            buttons: [
              {
                label: 'Ok',
                onClick: () => this.refreshList()
              },
              {
                label: 'Cofnij',
                onClick: () => this.resetPayment()
              }
            ]
          });
          
         
        })
        .catch(e => {
          console.log(e);
          alert(e)
        });
  }
  declinedPayment(){
    var data = {
        status : '2'
    }
    DataService.updatePayment(
        this.state.currentPayment.id,
        data
      )
        .then(response => {
          console.log(response.data);
          confirmAlert({
            title: 'Pomyślnie zmienione status płatności!',
            message: 'na odrzucona',
            buttons: [
              {
                label: 'Ok',
                onClick: () => this.refreshList()
              },
              {
                label: 'Cofnij',
                onClick: () => this.resetPayment()
              }
            ]
          });
          
         
        })
        .catch(e => {
          console.log(e);
          alert(e)
        });
  }
  resetPayment(){
    var data = {
        status : '0'
    }
    DataService.updatePayment(
        this.state.currentPayment.id,
        data
      )
        .catch(e => {
          console.log(e);
        });
  }

  render() {
    const { payments, currentPayment, currentIndex } = this.state;

    return (
      <div className="container">
        <br/>
      <div className="list row">
        <div className="col-md-6">
          <h4>Płatności do weryfikacji</h4>

          <ul className="list-group">
            {payments && 
              payments.map((payment, index) => (
                
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActive(payment, index)}
                  onDoubleClick={() => {
                    window.location.href="/owner/payments/units/" + currentPayment.id;
                    }}
                  key={index}
                >
                    Nr. Umowy &nbsp;
                  {payment.contract_id}
                   &nbsp;
                    Data płatności &nbsp;
                  {payment.date}
                </li>
                
              ))}
          </ul>

          
        </div>
        <div className="col-md-6">
          {currentPayment ? (
            <div>
              <h4>Płatnośći do weryfikacji</h4>
              <div>
                <label>
                  <strong>Data płatnośći:</strong>
                </label>{" "}
                {currentPayment.date}
              </div>
              <div>
                <label>
                  <strong>Numer umowy:</strong>
                </label>{" "}
                {currentPayment.contract_id}
              </div>
              <div>
                <label>
                  <strong>Kwota:</strong>
                </label>{" "}
                {currentPayment.amount}
              </div>
              <div>
                <label>
                  <strong>Należność:</strong>
                </label>{" "}
                {currentPayment.contract.price}
              </div>
              <div>
                <label>
                  <strong>Osoba wpłacająca:</strong>
                </label>{" "}
                {currentPayment.contract.tenant.name} {currentPayment.contract.tenant.surname}
              </div>
               <h4>Dane kontakowe </h4> 

              <div>
                <label>
                  <strong>Email</strong>
                </label>{" "}
                {currentPayment.contract.tenant.email}
              </div>
              <div>
                <label>
                  <strong>Telefon</strong>
                </label>{" "}
                {currentPayment.contract.tenant.phone}
              </div>
              <button  className="m-3 btn btn-sm badge-success" onClick={this.aceptPayment}>Potwierdź</button>
              <button  className="m-3 btn btn-sm badge-danger" onClick={this.declinedPayment}>Odrzuć</button>
            </div>
          ) : (
            <div>
              <br />
              <p>Wybierz z listy...</p>
            </div>
          )}
        </div>
      </div>
      </div>
    );
  }
}