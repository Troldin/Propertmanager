import React, { Component } from 'react';
import { Link } from "react-router-dom";
import DataService from "../Services/service";

export default class BuidlingsList extends Component {
  constructor(props) {
    super(props);
    this.retrieveTasks = this.retrieveTasks.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActive = this.setActive.bind(this);


    this.state = {
      tasks: [],
      id: null,
      currentTask: null,
      currentIndex: -1,
    
    };
  }

  componentDidMount() {
    this.retrieveTasks(this.props.match.params.id);
  }



  retrieveTasks(id) {
    DataService.getTaskByReportId(id)
      .then(response => {
        this.setState({
          tasks: response.data
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
      currentTask: null,
      currentIndex: -1
    });
  }

  setActive(task, index) {
    this.setState({
      currentTask: task,
      currentIndex: index
    });
  }
 
  

  render() {
    const { tasks, currentTask, currentIndex } = this.state;

    return (
      <div className="container">
        <br/>

        
        
      <div className="list row">

        <div className="col-md-6">
        <br/>
          <h4>List zadań do zgłoszenia nr {this.props.match.params.id}</h4>

          <ul className="list-group">
            {tasks && 
              tasks.map((task, index) => (
                
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActive(task, index)}
                  onDoubleClick={() => {
                    window.location.href="/konserwator/application/modifytasks/" + currentTask.id;
                    }}
                  key={index}
                >
                  {task.description}
                   
                </li>
                
              ))}
          </ul>

          
        </div>
        <div className="col-md-6">
          {currentTask ? (
            <div>
              <div>
                  <Link
                        to={"/konserwator/application/addtasks/"+ this.props.match.params.id}
                      >
                        <button   className="m-3 btn btn-sm badge-dark">
                          Dodaj zadanie
                        </button>
                </Link> 
                <Link
                        to={"/konserwator/application/list"}
                      >
                        <button   className="m-3 btn btn-sm badge-dark">
                          Powrót do listy zgłoszeń
                        </button>
                </Link>
              </div>
              <h4>Zadanie</h4>
              
              <div>
                <label>
                  <strong>Numer:</strong>
                </label>{" "}
                {currentTask.id}
              </div>
              <div>
                <label>
                  <strong>Cena:</strong>
                </label>{" "}
                {currentTask.price}
              </div>
              <div>
                <label>
                  <strong>Opis:</strong>
                </label>{" "}
                {currentTask.description}
              </div>
              <Link
                to={"/konserwator/application/modifytasks/" + currentTask.id}
                className="m-3 btn btn-sm badge-warning"
              >
                Edytuj
              </Link>
              

                
            </div>
          ) : (
            <div>
              <br />
              
              <Link
                to={"/konserwator/application/addtasks/"+ this.props.match.params.id}
              >
                <button   className="m-3 btn btn-sm badge-dark">
                  Dodaj zadanie
                </button>
        </Link> 
        <Link
                to={"/konserwator/application/list"}
              >
                <button   className="m-3 btn btn-sm badge-dark">
                  Powrót do listy zgłoszeń
                </button>
        </Link>  
        <p>Wybierz zadanie z listy...</p>
            </div>
          )}
        </div>
        
      </div>
      </div>
    );
  }
}