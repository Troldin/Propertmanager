import React, { Component } from 'react';
import DataService from "../Services/service";
import Cookies from 'js-cookie'; 

export default class PaymentsListNotVerified extends Component {
  constructor(props) {
    super(props);
    this.retrieve = this.retrieve.bind(this);
    this.refreshList = this.refreshList.bind(this);
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
    DataService.getAllTenantPayments(Cookies.get('id'))
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

  render() {
    const { payments, currentPayment, currentIndex } = this.state;

    return (
      <div className="container">
        <br/>
      <div className="list row">
        <div className="col-md-6">
          <h4>Lista moich płatności</h4>

          <ul className="list-group">
            {payments && 
              payments.map((payment, index) => (
                
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActive(payment, index)}

                  key={index}
                >
                    { payment.status === 1 
                    ?<div className="bg-success"> Nr. Umowy &nbsp;{payment.contract_id} &nbsp; Data płatności &nbsp; {payment.date} </div>
                    :<div>
                        { payment.status === 2
                            ? <div className="bg-danger"> Nr. Umowy &nbsp;{payment.contract_id} &nbsp; Data płatności &nbsp; {payment.date} </div>
                            : <div > Nr. Umowy &nbsp;{payment.contract_id} &nbsp; Data płatności &nbsp; {payment.date} </div>
                        }
                    </div>
                    }
                </li>
                
              ))}
          </ul>

          
        </div>
        <div className="col-md-6">
          {currentPayment ? (
            <div>
              <h4>Dane płatności</h4>
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
                {currentPayment.status === 0
                ?<div><strong>Status:</strong> Rozpatrywane </div>
                :<div></div>}
                {currentPayment.status === 1
                ?<div className="text-success"><strong>Status:</strong> Zaakceptowane</div>
                :<div></div>}
                {currentPayment.status === 2
                ?<div className="text-danger"><strong>Status:</strong> Odrzucone</div>
                :<div></div>}
              </div>
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