import React from 'react'
import {useFormik, withFormik, Form } from 'formik'
import DataService from "../Services/service";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


const FormularzLogowania = (props) => {
  const loginPageStyle = {
    margin: "50px auto 50px",
    maxWidth: "500px",
    background: "#fff",
    padding: "50px",
    borderRadius: "50px",
    boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.15)"
  }
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => {
      DataService.createSession(values)
      .then(response => {
        console.log(response.data.key);
        if(response.data.key != undefined){
        var data = new Date (response.data.exp_date);
        document.cookie = "key=" +  response.data.key + "; expires=" + data.toUTCString();
        document.cookie = "id=" +  response.data.user_id + "; expires=" + data.toUTCString();
        window.location.href = "/"; 
        }
        else{
          confirmAlert({
            title: 'Błędne dane logownia!',
            massage: 'Spróbuj ponownie',
            buttons: [
              {
                label: 'Ok',
                onClick: () => window.location.href = "/login"
              }
            ]
          })

        }
      })

      .catch(e => {
        console.log(e);
      });

    }
  })
    

  return(
    <React.Fragment>
      <div className="container">
        <div className="login-wrapper" style={loginPageStyle}>
          <h2>Strona logowania</h2>
          <Form className="form-container" onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Adres email</label>
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
            <button type="submit" className="btn btn-primary">Login</button>
            </Form>
        </div>
      </div>
    </React.Fragment>
  )
}

const LoginFormik = withFormik({
})(FormularzLogowania)

export default LoginFormik
