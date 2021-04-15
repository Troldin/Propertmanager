import React, { Component } from "react";
import DataService from "../Services/service";
import {Link} from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export default class BuldingAdd extends Component {
  constructor(props) {
    super(props);

    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.createTask = this.createTask.bind(this);
    this.newTask = this.newTask.bind(this);

    this.state = {
        id: null,
        price: null,
        report_id: "",  
        message: "" ,
        description: ""
    };
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }
  createTask() {
    var data = {
      price: this.state.price,
      description: this.state.description,
      report_id: this.props.match.params.id,
    };

    DataService.createTask(data)
        confirmAlert({
          
          message: 'Pomyślnie dodano zadanie',
          buttons: [
            {
              label: 'Dodaj kolejne zadanie dla tego zgłoszenia',
              onClick: () => this.newTask(),
            },
            {
              label: 'Pozostałe zadania dotyczące zgłoszenia',
              onClick: () => this.props.history.push('/konserwator/application/tasks/' + this.props.match.params.id)
            },
            {
                label: 'List zgłoszeń',
                onClick: () => this.props.history.push('/konserwator/application/list')
              }
          ]
        });
      
      
  }
  newTask() {
    this.setState({
        id: null,
        price: "",
        report_id: "",  
        message: "",
        description: ""
    });
    this.props.history.push('/konserwator/applications/addtasks/'+ this.props.match.params.id) 
  }
 

  render() {

    return (
      <div className='container'>
        
        
          <div className="edit-form">
            <br />
            <h4>Zadanie</h4>
            <form>
              <div className="form-group">
                <label htmlFor="description">Opis: </label>
                <textarea
                  className="form-control"
                  id="description"
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              
              
            </form>

            <button
              type="submit"
              className="m-3 btn btn-sm badge-success"
              onClick={this.createTask}
            >
              Dodaj zadanie
            </button> 
            <Link
                to={"/konserwator/application/list"}
              >
                <button   className=" btn btn-sm badge-secondary">
                  Powrót do listy zadań
                </button>
            </Link>
            <Link
                to={"/konserwator/application/tasks/" +this.props.match.params.id }
              >
                <button   className="m-3 btn btn-sm badge-dark">
                  Powrót do listy zgłoszeń
                </button>
            </Link>
            

            
            
            
          </div>
        
      </div>
    );
  }
}