import './App.css';
import React, { Component } from "react";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Route } from "react-router-dom";
import LoginPage from '../LoginPage/LoginPage';
import Cookies from 'js-cookie'; 
import DataService from "../Services/service";
//Component imports for Administrators
import AdminTenantsList from '../Administrator/TenantsList';
import AdminTenantsAdd from '../Administrator/TenantsAdd';
import AdminTenantsModify from '../Administrator/TenantsModify';
import AdminApplicationBuildingList from  '../Administrator/ApplicationBuildingList';
import AdminApplicationAdd from  '../Administrator/ApplicationAdd';
import AdminApplicationList from  '../Administrator/ApplicationList';
import AdminPaymentsListNotVerified from '../Administrator/PaymentsListNotVerified';
import AdminPaymentsDebts from '../Administrator/PaymentsContractDebts'
import AdminContractBuildingList from '../Administrator/ContractBuildingList';
import AdminContractBuildingUnitList from '../Administrator/ContractBuildingUnitList';
import AdminContractListActive from '../Administrator/ContractListActive';
import AdminContractListExpired from '../Administrator/ContractListExpired';
//Component imports for Owners
import OwnerBuildingsList from '../Owner/BuildingList';
import OwnerBuildingsAdd from '../Owner/BuildingAdd';
import OwnerBuildingModify from  '../Owner/BuildingModify';
import OwnerBuildingUnits from  '../Owner/BuldingCurrent';
import OwnerBuildingUnitAdd from '../Owner/BuldingLocalAdd';
import OwnerBuildingUnitModify from '../Owner/BuildingUnitModify';
import OwnerAdminAdd from '../Owner/AdminAdd';
import OwnerAdminList from '../Owner/AdminList';
import OwnerAdminModify from '../Owner/AdminModify';
import OwnerRestorerAdd from '../Owner/RestorerAdd';
import OwnerRestorerList from '../Owner/RestorerList';
import OwnerRestorerModify from '../Owner/RestorerModify';
import OwnerRaports from '../Owner/Raports';

//Component imports for Tenants
import TenantApplicationAdd from '../Tenant/ApplicationAdd';
import TenantApplicationList from '../Tenant/ApplicationList';
import TenantUnitsList from '../Tenant/LocalsList';
import TenantPaymentAdd from '../Tenant/PaymentsAdd';
import TenantPaymentList from '../Tenant/PaymentsList';
//Component imports for Keeper
import RestorerApplicationList from '../Konserwator/ApplicationList';
import RestorerApplicationTasks from '../Konserwator/ApplicationTasks';
import RestorerApplicationTasksAdd from '../Konserwator/ApplicationTasksAdd';
import RestorerApplicationTasksModify from '../Konserwator/ApplicationTasksModify';
import RestorerOrderAdd from '../Konserwator/OrderAdd';
import RestorerOrderModify from '../Konserwator/OrderModify';
import RestorerOrderList from '../Konserwator/OrderList'
// import Test from "./components/test";



class App extends Component {
  
  
  whoislogin(){
    if(Cookies.get('key') === undefined ){
      if(window.location.href !== "http://zettawhit.com:3000/login"){
      window.location.href="/login";
 
      }
    }
    else{
      var tmp = Cookies.get('key').slice(-1);
      switch(tmp){
        case '1':
          return 1;
        
        case '2':
          return 2;
        
        case '3':
          return 3;
        case '4':
          return 4;
        default:
          Cookies.remove('key');
        
      }
    }
  }
   deleteCookie(){
    DataService.deleteSession(Cookies.get('key'))
    .catch(e => {
      console.log(e);
    });
    document.cookie = "key=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href="/login";

  }
  render() {
    
    const isLoginIn = this.whoislogin();
    return (
      <div >
      
      
      <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">Promanager</Navbar.Brand>
     

        
        {isLoginIn === 3
          ? 
          <Nav className="mr-auto">
        <NavDropdown title="Najemcy" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/admin/tenants/list">Wyświetl listę</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/admin/tenants/add">Dodaj najemcę</NavDropdown.Item>
        </NavDropdown>  
  
        <NavDropdown title="Umowy najmu" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/admin/contracts/list/active">Aktywne umowy</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/admin/contracts/list/expired">Wygaśnięte umowy</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/admin/contracts/buildings/list">Dodaj nową umowę</NavDropdown.Item>
        </NavDropdown>
  
        

        <NavDropdown title="Zgłoszenia" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/admin/applications/list">Wyświetl moje zgłoszenia</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/admin/applications/buildings/list">Dodaj zgłoszenie</NavDropdown.Item>
        </NavDropdown>
        
        <NavDropdown title="Płatności" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/admin/payments/notverified">Płatności do zweryfikowania</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/admin/payments/debts">Zadłużone umowy</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link onClick={this.deleteCookie}> Wyloguj</Nav.Link>
        </Nav>
        : <div></div>
        }
        {isLoginIn === 4
          ? 
          <Nav className="mr-auto">
        <NavDropdown title="Budynki" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/owner/buildings/list">Wyświetl budynki</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/owner/buildings/add">Dodaj budynek</NavDropdown.Item>
        </NavDropdown>
        
        
        <NavDropdown title="Zarządcy" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/owner/admin/list">Wyświetl zarządców</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/owner/admin/add">Dodaj zarządce</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Konserwatorzy" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/owner/restorer/list">Wyświetl konserwatorów</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/owner/restorer/add">Dodaj konserwatora</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href="/owner/raports">Raporty</Nav.Link>
        <Nav.Link onClick={this.deleteCookie} > Wyloguj</Nav.Link>
        </Nav>
        
        
        :<div></div>
        }
        {isLoginIn === 1
          ? 
          <Nav className="mr-auto">
        <NavDropdown title="Zgłoszenia" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/tenant/application/add">Dodaj zgłoszenie</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/tenant/application/list">Wyświetl moje zgłoszenia</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href='/tenant/units/list'>Wynajmowane lokale</Nav.Link>
        
        <NavDropdown title="Płatności" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/tenant/payments/add">Dokonaj płatności</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/tenant/payments/list">Lista moich płatności</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link  onClick={this.deleteCookie} >Wyloguj</Nav.Link>
        </Nav>
        :<div></div>
        }
        {isLoginIn === 2
          ? 
        <Nav className="mr-auto">
        <Nav.Link href="/konserwator/application/list">Lista zgłoszeń</Nav.Link>
        <NavDropdown title="Zamówienia" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/konserwator/order/add">Dodaj zamówienie</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/konserwator/order/list">Lista zamówienie</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link  onClick={this.deleteCookie} >Wyloguj</Nav.Link>
        </Nav>
        :<div></div>
  }
      

    </Navbar>
    <div className="container-mt3">
    
    </div>
    {isLoginIn === 3
        ?   
      <div>   
      <Route path="/admin/tenants/list" component={AdminTenantsList} />
      <Route path="/admin/tenants/add" component={AdminTenantsAdd} />
      <Route path="/admin/tenants/modify/:id" component={AdminTenantsModify} />
      <Route path="/admin/applications/list" component={AdminApplicationList} />
      <Route path="/admin/applications/buildings/list" component={AdminApplicationBuildingList} />
      <Route path="/admin/applications/add" component={AdminApplicationAdd} />
      <Route path="/admin/payments/notverified" component={AdminPaymentsListNotVerified} />
      <Route path="/admin/payments/debts" component={AdminPaymentsDebts} />
      <Route path="/admin/contracts/buildings/list" component={AdminContractBuildingList}/>
      <Route path="/admin/contracts/buildings/units" component={AdminContractBuildingUnitList}/>
      <Route path="/admin/contracts/list/active" component={AdminContractListActive}/>
      <Route path="/admin/contracts/list/expired" component={AdminContractListExpired}/>
      </div>
      : <div>
      
      </div>
      }
      {isLoginIn === 4
        ?   
      <div>
      <Route path="/owner/buildings/add" component={OwnerBuildingsAdd} />
      <Route path="/owner/buildings/list" component={OwnerBuildingsList} />
      <Route path="/owner/buildings/modify/:id" component={OwnerBuildingModify} />
      <Route path="/owner/buildings/units/:id" component={OwnerBuildingUnits} />
      <Route path="/owner/buildings/addunits/:id" component={OwnerBuildingUnitAdd} />
      <Route path="/owner/buildings/modifyunit/:id" component={OwnerBuildingUnitModify} />
      <Route path="/owner/admin/add" component={OwnerAdminAdd} />
      <Route path="/owner/admin/list" component={OwnerAdminList} />
      <Route path="/owner/admin/modify/:id" component={OwnerAdminModify } />
      <Route path="/owner/restorer/add" component={OwnerRestorerAdd} />
      <Route path="/owner/restorer/list" component={OwnerRestorerList} />
      <Route path="/owner/restorer/modify/:id" component={OwnerRestorerModify } />
      <Route path="/owner/raports" component={OwnerRaports}/>
     
      </div>
      :<div></div> 
      } 
      {isLoginIn === 1
        ?   
      <div>
      <Route path="/tenant/application/add" component={TenantApplicationAdd}/>
      <Route path="/tenant/application/list" component={TenantApplicationList}/>
      <Route path="/tenant/units/list" component={TenantUnitsList}/>
      <Route path="/tenant/payments/add" component={TenantPaymentAdd}/>
      <Route path="/tenant/payments/list" component={TenantPaymentList}/>
      
      </div>
      :<div></div> 
      } 
      {isLoginIn === 2
        ?   
      <div>
      <Route path="/konserwator/application/list" component={RestorerApplicationList}/> 
      <Route path="/konserwator/application/tasks/:id" component={RestorerApplicationTasks}/> 
      <Route path="/konserwator/application/addtasks/:id" component={RestorerApplicationTasksAdd}/>
      <Route path="/konserwator/application/modifytasks/:id" component={RestorerApplicationTasksModify}/>
      <Route path="/konserwator/order/add" component={RestorerOrderAdd}/> 
      <Route path="/konserwator/order/modify/:id" component={RestorerOrderModify}  />
      <Route path="/konserwator/order/list" component={RestorerOrderList}  />
      </div>
      : <div>   
      </div>
    }
    <Route path="/login" component={LoginPage} />
    </div>
      
    )
  }

}

export default App;
