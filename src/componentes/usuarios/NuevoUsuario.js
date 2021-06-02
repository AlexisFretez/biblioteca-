import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import swal from 'sweetalert'

class NuevoUsuario extends Component {
    state = { 
        nombre: '',
        apellido: '',
        contraseña : '',
        email : ''
    }

    // Agrega un nuevo suscriptor a la base de datos
    agregarUsuario = e => {
        e.preventDefault();

        // extraer los valores del state
        const nuevoUsuario = this.state;

        // extraer firestore  de props
        const { firestore, history } = this.props

        //Guardarlo en la base de datos
        firestore.add({ collection : 'usuarios' }, nuevoUsuario)
            .then(() => history.push('/usuarios') )

            swal("Good job!", "Has creado un nuevo Suscriptor!", "success");
    }

    // extrae los valores del input y los coloca en el state
    leerDato = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render() { 
        return ( 
            <div className="row">
                <div className="col-12 mb-4">
                    <Link to={'/usuarios'} className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i> {''}
                        Volver al Listado
                    </Link>
                </div>
                <div className="col-12">
                    <h2>
                        <i className="fas fa-user-plus"></i> {''}
                        Nuevo Usuario
                    </h2>

                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                            <form
                                onSubmit={this.agregarUsuario}
                            >
                                <div className="form-group">
                                    <label>Nombre:</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name="nombre"
                                        placeholder="Nombre del Usuario"
                                        required
                                        onChange={this.leerDato}
                                        value={this.state.nombre}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Email:</label>
                                    <input 
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        placeholder="Email del Usuario"
                                        required
                                        onChange={this.leerDato}
                                        value={this.state.email}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Contraseña:</label>
                                    <input 
                                        type="password"
                                        className="form-control"
                                        name="contraseña"
                                        placeholder="Contraseña del Usuario"
                                        required
                                        onChange={this.leerDato}
                                        value={this.state.contraseña}
                                    />
                                </div>
                                <input 
                                    type="submit"
                                    value="Agregar Usuario"
                                    className="btn btn-success"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}

NuevoUsuario.propTypes = {
    firestore : PropTypes.object.isRequired
}
 
export default firestoreConnect()( NuevoUsuario );