import React from 'react'
import { withFormik, Form, useFormik } from 'formik'
import DataService from "../Services/service";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 

const AddTenantForm = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      password:'',
      email:'',
      address: '',
      phone: '',
      city_zip: '',
      pesel: '',
      type: '1',
    },
    onSubmit: values => {
      console.log(values);
      DataService.createUser(values)
      .then(response => {
        confirmAlert({
          title: 'Pomyślnie utworzono konto',
          buttons: [
            {
              label: 'Utwórz kolejnego użytkownika',
              onClick: () => window.location.reload()
            },
            {
              label: 'Lista użytkowników',
              onClick: () => window.location.href='/admin/tenants/list'
            }
          ]
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
        
      
    
    }
  })

  return(
    <div className='container'>
      <div className="form-group">
          <br />
          <h2>Dodaj nowego najemce</h2>
          
          <Form className="form-container" onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Imię</label>
              <br />
              <input
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.name}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="surname">Nazwisko</label>
              <br />
              <input
                id="surname"
                name="surname"
                type="text"
                className="form-control"
                onChange={formik.handleChange}
                value={formik.values.surname}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Adres</label>
              <br />
              <input
                id="address"
                name="address"
                type="text"
                className="form-control"
                onChange={formik.handleChange}
                value={formik.values.address}
              />
              </div>
            <div className="form-group">
              <label htmlFor="phone">Numer telefonu</label>
              <br />
              <input
                id="phone"
                name="phone"
                type="tel"
                className="form-control"
                onChange={formik.handleChange}
                value={formik.values.phone}
              />
            </div>
            <div className="form-group">
              <label htmlFor="city_zip">Kod pocztowy</label>
              <br />
              <input
                id="city_zip"
                name="city_zip"
                type="text"
                className="form-control"
                onChange={formik.handleChange}
                value={formik.values.city_zip}
              />
            </div>
            <div className="form-group">
              <label htmlFor="pesel">PESEL</label>
              <br />
              <input
                id="pesel"
                name="pesel"
                type="text"
                className="form-control"
                onChange={formik.handleChange}
                value={formik.values.pesel}
              />
              </div>
              <h3  className="text-dark" >Dane logowania</h3>
              <div className="form-group">
              <label htmlFor="name">Email</label>
              <br />
              <input
                id="email"
                name="email"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.email}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="surname">Hasło</label>
              <br />
              <input
                id="password"
                name="password"
                type="password"
                className="form-control"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </div>
             <button type="submit" className="badge badge-success">Dodaj</button>
          
          </Form>
        </div>
      
        </div>
  )
}

const AddTenant = withFormik({
})(AddTenantForm)

export default AddTenant