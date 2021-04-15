import React, { Component } from 'react';
import DataService from "../Services/service";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 



export default class Raports extends Component {
    constructor(props) {
        super(props);
        this.onChangeFrom = this.onChangeFrom.bind(this);
        this.onChangeTo = this.onChangeTo.bind(this);
        this.raportUnitsPayments = this.raportUnitsPayments.bind(this);

          this.state = {
            from: '',
            to: ''
        };
      }
    onChangeTo(e) {
        this.setState({
          to: e.target.value
           });
           console.log(this.state.to)
      }
    onChangeFrom(e) {
        this.setState({
          from: e.target.value 
           });
        console.log(this.state.from)
      }
    raportUnitsStats(){
        DataService.raportUnitStats()
        .then(({ data }) => {
            const downloadUrl = window.URL.createObjectURL(new Blob([data]));
            const link = document.createElement('a');
            link.href = downloadUrl;
            var d = new Date();

            link.setAttribute('download', 'raport_lokali_'+d.getDay()+'-'+(d.getMonth()+1)+'-'+d.getFullYear()+'.pdf'); //any other extension
            document.body.appendChild(link);
            link.click();
            link.remove();
        })
    }
    raportUnitsPayments(){
        var data = {
            from: this.state.from,
            to: this.state.to        
        };
        DataService.raportUnitPayments(data)
        .then(({ data }) => {
            const downloadUrl = window.URL.createObjectURL(new Blob([data]));
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', 'raport_rentownosci.pdf'); //any other extension
            document.body.appendChild(link);
            link.click();
            link.remove();
        })
    }
    render() {
        return(
        <div className="container sm" >
          <br/>
            <h2 className="text-dark">Raport pustych i zajętych lokali</h2>
            <br/>
            <button onClick={this.raportUnitsStats} className="badge badge-success" >Wygeneruj raport</button>
            <br/>
            <br/>
            <h2 className="text-dark">Raport rentowności</h2>
            <div className="md-6">
                
            <form>
                
            <div className="form-group">
                <label htmlFor="street">Od: </label>
                <input
                  type="date"
                  className="form-control"
                  id="tenant_start_date"
                  onChange={this.onChangeFrom}
                  value={this.state.from}
                />
              </div>
              <div className="form-group">
                <label htmlFor="tenant_end_date">Do: </label>
                <input
                  type="date"
                  className="form-control"
                  id="tenant_end_date"
                  onChange={this.onChangeTo}
                  value={this.state.to}
                />
              </div>
              
            </form>
            <button
                type="submit"
                className="badge badge-success"
                onClick={this.raportUnitsPayments}
             >Wygeneruj raport</button>
          
            </div>
        </div>
        

        )
    }
}