import React, { Component } from "react";
import DataService from "../Services/service";
import {Link} from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 

export default class Building extends Component {
  constructor(props) {
    super(props);

    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.retrieve = this.retrieve.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);

    this.state = {
      currentTask: {
        id: null,
        description: "",
        price: "",
        report_id: ""
      },
    };
  }
  componentDidMount() {
    this.retrieve(this.props.match.params.id);
  }
  onChangeDescription(e) {
    const description = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTask: {
          ...prevState.currentTask,
          description:description
        }
      };
    });
  }
  onChangePrice(e) {
    const price = e.target.value;
    
    this.setState(prevState => ({
      currentTask: {
        ...prevState.currentTask,
        price: price
      }
    }));
  }
  retrieve(id) {
    
  DataService.getTask(id)
      .then(response => {
        this.setState({
          currentTask: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    
  }
  update() {
    
  DataService.updateTask(
      this.state.currentTask.id,
      this.state.currentTask
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
              label: 'Powrót do listy zadań',
              onClick: () => this.props.history.push('/konserwator/application/tasks/'+ this.state.currentTask.report_id)
            },
            {
              label: 'Powrót do zamówień',
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
  delete() {    
 
    confirmAlert({
      
      message: 'Czy na pewno chcesz usunąć ten obiekt?',
      buttons: [
        {
          label: 'Tak',
          onClick: () => DataService.deleteTask(this.state.currentTask.id)
          .then(response => {
            console.log(response.data);
            this.props.history.push("/konserwator/application/tasks/" + this.state.currentTask.report_id)
          })
          .catch(e => {
            console.log(e);
          })
        },
        {
          label: 'Nie'
        }
      ]
    });
  
  }
  

  render() {
    const { currentTask } = this.state;

    return (
      <div className='container'>
        
        {currentTask ? (
          <div className="edit-form">
            <br />
            <h4>Budynek</h4>
            <form>
              <div className="form-group">
                <label htmlFor="description">Opis: </label>
                <textarea
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentTask.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Cena</label>
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  value={currentTask.price}
                  onChange={this.onChangePrice}
                />
              </div>
            </form>

            
            <Link
                to={"/konserwator/application/tasks/" + this.state.currentTask.report_id}
              >
                <button   className="badge badge-dark">
                  Powrót do listy zadań
                </button>
            </Link>
            

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.update}
            >
              Zaktualizuj
            </button>
            <button
              className="badge badge-danger mr-2"
              onClick={this.delete}
            >
              Usuń
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Building...</p>
          </div>
        )}
      </div>
    );
  }
}