import React, { Component } from 'react';
import DataService from "../Services/service";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
import Cookies from 'js-cookie'; 

export default class CreateOrder extends Component {
  constructor(props) {
    super(props);
    this.onChangeDescription= this.onChangeDescription.bind(this);
    this.createOrder = this.createOrder.bind(this);
    this.newOrder = this.newOrder.bind(this);

    this.state = {
      id: null,
      description: ''   
    };
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
       });
  }

  createOrder() { 
    var data = {
        status: '0',
        description: this.state.description,
        restorer_id: Cookies.get('id')
    };
    DataService.createOrder(data)
    .then(response => {
        this.setState({
          id: response.data.id,
        });      
      confirmAlert({         
        message: 'Pomyślnie utworzono zamówienie',
        buttons: [
          {
            label: 'Dodaj zadania do zamówienia ',
            onClick: () => window.location.assign('/konserwator/order/modify/'+ response.data.id) //this.props.history.push('/konserwator/' )
            
          },
          {
            label: 'Nowe zamówienie',
            onClick: () => this.newOrder()
          }
        ]
      });
    })
      .catch(e => {
        console.log(e);
        alert(e.message)
      });
       
  }
  newOrder() {
    this.setState({
        id: null,
        description: ''  
    });
    this.props.history.push('/konserwator/order/add')
  }
  
  

  render() {
    
    return (
      <div className="container">
        <br/> 
        
          
      <div className="list row">
        
        <div className="container">
          
            <div>
              <h4>Utwórz zamówienie</h4>
              <form>
              <div className="form-group">
                <label htmlFor="street">Opis: </label>
                <textarea
                  required
                  className="form-control"
                  id="description"
                  onChange={this.onChangeDescription}
                  value={this.state.description}
                />
              </div>                          
              
              </form>
              <button
                type="submit"
                className="badge badge-success"
                onClick={this.createOrder}
             >Utwórz</button>
            </div>
        </div>
      </div>
      </div>
    );
  }
}