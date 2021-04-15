import React, { Component } from 'react';
import { Link } from "react-router-dom";
import DataService from "../Services/service";
import Cookies from 'js-cookie'; 
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 

export default class OrderList extends Component {
  constructor(props) {
    super(props);
    this.retrieve = this.retrieve.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActive = this.setActive.bind(this);
    this.finishOrder = this.finishOrder.bind(this);
    this.acceptOrder = this.acceptOrder.bind(this);
    this.resetOrder = this.resetOrder.bind(this);

    this.state = {
    
      orders: [],
      currentOrders: null,
      currentIndex: -1,
      search: ""
    };
  }

  componentDidMount() {
    this.retrieve();
  }
  retrieve() {
    DataService.getOrderByRestorerId(Cookies.get('id'))
      .then(response => {
        this.setState({
          orders: response.data
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
      currentOrders: null,
      currentIndex: -1
    });
  }
  setActive(contract, index) {
    this.setState({
      currentOrders: contract,
      currentIndex: index
    });
  }
  acceptOrder(){
    var data = {
        status : '1'
    }
    DataService.updateOrder(
        this.state.currentOrders.id,
        data
      )
        .then(response => {
          console.log(response.data);
          confirmAlert({
            title: 'Pomyślnie zmienione status zamówienia ',
            message: 'na "Przyjęto do realizacji"!',
            buttons: [
              {
                label: 'Ok',
                onClick: () => this.refreshList()
              },
              {
                label: 'Cofnij',
                onClick: () => this.resetOrder()
              }
            ]
          });
        })
        .catch(e => {
          console.log(e);
          alert(e)
        });
  }
  finishOrder(){
    var d = new Date();
    var data = {
        status : '2',
        date: d
    }
    DataService.updateOrder(
        this.state.currentOrders.id,
        data
      )
        .then(response => {
          console.log(response.data);
          confirmAlert({
            title: 'Pomyślnie zmienione status zgłoszenia',
            message: 'na Ukończone!',
            buttons: [
              {
                label: 'Ok',
                onClick: () => this.refreshList()
              },
              {
                label: 'Cofnij',
                onClick: () => this.resetOrder()
              }
            ]
          });      
        })
        .catch(e => {
          console.log(e);
          alert(e)
        });
  }
  resetOrder(){
    var data = {
        status : '0'
    }
    DataService.updateOrder(
        this.state.currentOrders.id,
        data
      )
      .then(response => {
        console.log(response.data);
        confirmAlert({
          title: 'Pomyślnie zresetowano status zamówienia!',
          buttons: [
            {
              label: 'Ok',
              onClick: () => this.refreshList()
            },
          ],
          onClickOutside: () => {this.refreshList()},
        });
      })
        .catch(e => {
          console.log(e);
        });
  }
  render() {
    const { orders, currentOrders, currentIndex } = this.state;

    return (
      <div className="container">
        <br/>
      <div className="list row">
        <div className="col-md-6">
          <h4>List aktywnych przypisanych zamówień</h4>

          <ul className="list-group">
            {orders && 
              orders.map((orders, index) => (
                <div>
                {orders.status !== 2
                ?<li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActive(orders, index)}
                  onDoubleClick={() => {
                    window.location.href="/konserwator/orders/modify/" + currentIndex;
                    }}
                  key={index}
                >
                  {orders.description}  
                </li>
                  :<div></div>
                }
                </div>
              ))}
          </ul>     
        </div>
        <div className="col-md-6">
          {currentOrders ? (
           
            <div>
              <h4>Zamówienie</h4>
              <div>
                <label>
                  <strong>Numer zamówienia:</strong>
                </label>{" "}
                {currentOrders.id}
              </div>
              <div>
                <label>
                  <strong>Opis:</strong>
                </label>{" "}
                {currentOrders.description}
              </div>
              <div>
                {currentOrders.status === 0
                ?<div><strong>Status:</strong> Oczekujące na realizację</div>
                :<div></div>}
                {currentOrders.status === 1
                ?<div><strong>Status:</strong> W realizacji</div>
                :<div></div>}
                {currentOrders.status === 2
                ?<div><strong>Status:</strong> Zrealizowane</div>
                :<div></div>}
              </div>
              <Link
                to={"/konserwator/order/modify/" + currentOrders.id}
                className="m-3 btn btn-sm badge-warning"
              >
                Edytuj
              </Link>
              <div>
              <strong>Zmień status</strong>
                  </div>
              {this.state.currentOrders.status === 0 && this.state.currentOrders.status !== 2
              ?<button  className="m-3 btn btn-sm badge-success" onClick={this.acceptOrder}>Przyjmij do realizacji</button>
                :
                <div>
                {this.state.currentOrders.status === 1 && this.state.currentOrders.status !== 2
                    ? <button  className="m-3 btn btn-sm badge-success" onClick={this.finishOrder}>Zakończ realizację</button>
                    : <div></div>
                }
                <button  className="m-3 btn btn-sm badge-warning" onClick={this.resetOrder}>Reset statusu</button>
                </div>
                }
              
              
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