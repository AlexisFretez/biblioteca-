import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
//import { from } from 'webpack-sources/lib/CompatSource';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2'



class Login extends Component {
    state = { 
        email: '',
        password: ''
     }

     //Iniciar sesion en firebase
     iniciarSesion = e => {
         e.preventDefault();

         //extrer firebase
         const { firebase } = this.props

         //estraer el state

         const { email, password } = this.state;

         //Autenticar el usuario

         firebase.login({
             email,
             password
         })
         .then(resultado => console.log('Ini Sesion'))
         .catch(error=> Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error de Mail o Contraseña!',
          })
         )
         
     }

    // Almacena lo que el usuario escribe en el state
    leerDatos = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    render() { 
        return ( 
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card mt-5">
                        <div className="card-body">
                            <h2 className="text-center py-4">
                                <i className="fas fa-lock"></i> {''}
                                Iniciar Sesión
                            </h2>
                            <form 
                                onSubmit={this.iniciarSesion}
                            >
                                <div className="form-group">
                                    <label>Email</label>
                                    <input  
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    required
                                    value={this.state.email}
                                    onChange={this.leerDatos}
                                    placeholder="Escriba Su Correo"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Password</label>
                                    <input  
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    required
                                    value={this.state.password}
                                    onChange={this.leerDatos}
                                    placeholder="Escriba Su password"
                                    />
                                </div>
                                <input 
                                type="submit"
                                className="btn btn-success btn-block"
                                value="Iniciar Sesion"
                                
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}

Login.propTypes = {
    firenase : PropTypes.object.isRequired,
}
 
export default firebaseConnect() (Login);