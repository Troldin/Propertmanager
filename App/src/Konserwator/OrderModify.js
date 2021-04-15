import React, { Component } from 'react';
import DataService from "../Services/service";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 

export default class OrderModify extends Component {
  constructor(props) {
    super(props);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.retrieve = this.retrieve.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.asignTask = this.asignTask.bind(this);
    this.deleteAssigment = this.deleteAssigment.bind(this);
    this.updateOrder = this.updateOrder.bind(this);


    this.state = {
      order : [],
      taskNull:[],
      taskAsign:[],
      id: null,
      description: "",
      task: {
      order_id: this.props.match.params.id,
      }
    };
  }
  componentDidMount() {
    var url = window.location.pathname;
    var id = url.substring(url.lastIndexOf('/') + 1);     
    this.retrieve(this.props.match.params.id);
  } 
  retrieve(id) {
    DataService.getTaskNull()
      .then(response => {
        this.setState({
          taskNull: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    DataService.getTaskByOrderId(id)
      .then(response => {
        this.setState({
          taskAsign: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    DataService.getOrder(id)
      .then(response => {
        this.setState({
          order: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  refreshList() {
    this.retrieve(this.props.match.params.id);
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      order: {
        ...prevState.order,
        description: description
      }
    }));
  }
  updateOrder() {
    
    DataService.updateOrder(
        this.state.order.id,
        this.state.order
      )
        .then(response => {
          console.log(response.data);
          confirmAlert({
            title: 'Pomyślnie zaktualizowano dane!',
            message: response.data.massage,
            buttons: [
              {
                label: 'Dalsza modyfikacja',
             
              },
              {
                label: 'Powrót do listy zamówień',
                onClick: () => this.props.history.push('/konserwator/order/list')
              }
            ]
          });
          
         
        })
        .catch(e => {
          console.log(e);
          alert(e)
        });
    }
  asignTask(id) {
    var data = {
      order_id: this.props.match.params.id
    };
    DataService.updateTask(
        id,
        this.state.task
      )
        .then(response => {
          console.log(response.data);
         
                
           this.refreshList()
                  
        })
        .catch(e => {
          console.log(e);
          alert(e)
        });
    }
  deleteAssigment(id) {
    var data = {
      order_id: null
        };
      DataService.updateTask(
          id,
          data
        )
          .then(response => {
            console.log(response.data);
            this.refreshList()     
          })
          .catch(e => {
            console.log(e);
            alert(e)
          });
      }
  render() {
    const { taskNull,taskAsign,order } = this.state;
    
    return (
      <div className="container">
        <br/> 
     
      <div className="edit-form">
            <br />
            <h4>Zamówienie nr. {order.id}</h4>
            <form>
              <div className="form-group">
                <label htmlFor="street">Opis: </label>
                <textarea
                  type="text"
                  className="form-control"
                  id="description"
                  value={order.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              
          
              
            </form>

            
            
            <button
              type="submit"
              className="btn btn-sm badge-dark"
              onClick={this.updateOrder}
            >
              Zaktualizuj
            </button>
          
            </div>
           
      <div className="list row">
        <div className="col-md-6">
          <br/>
          <h4>Zadanie wolne</h4>

          <ul className="list-group">
            {taskNull && 
              taskNull.map((task, index) => (
                
                <li
                  className={
                    "list-group-item " 
                   
                  }
               
                  onDoubleClick={() => {
                    window.location.href="/konserwator/application/modifytasks/" + task.id;
                    }}
                  key={index}
                >
                  <div className="d-flex justify-content-between">
                  <div>
                  {task.description}
                  </div>
                  <div>
                    <button  className=" btn btn-sm badge-success " onClick={() => this.asignTask(task.id)}>Przypisz</button>
                  </div>
                  </div>
                </li>
                
              ))}
          </ul>

          
        </div>
        <div className="col-md-6">  
        <br/>
        <h4>Zadania przypisane</h4>

          <ul className="list-group">
            {taskAsign && 
              taskAsign.map((task, index) => (
                
                <li
                  className={
                    "list-group-item " 
                  }
                 
                  onDoubleClick={() => {
                    window.location.href="/konserwator/application/modifytasks/" + task.id;
                    }}
                  key={index}
                >
                 <div className="d-flex justify-content-between">
                  <div>
                  {task.description}
                  </div>
                  <div>
                    <button  className=" btn btn-sm badge-warning " onClick={() => this.deleteAssigment(task.id)}>Usuń przypisanie</button>
                  </div>
                  </div>
                   
                </li>
                
              ))}
          </ul>    
        </div>
      </div>
      </div>
    );
  }
}