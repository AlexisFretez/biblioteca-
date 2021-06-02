import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import swal from 'sweetalert'

class EditarUsuario extends Component {

    // crear los refs
    nombreInput = React.createRef();
    emailInput = React.createRef();
    contraseñaInput = React.createRef();

    // Edita el Suscriptor en la base de datos
    editarUsuario = e => {
        swal("Good job!", "Editaste un Suscriptor!", "success");
        e.preventDefault();

        // crear el objeto que va a actualizar
        const usuarioActualizado = {
            nombre : this.nombreInput.current.value,
            email : this.emailInput.current.value,
            contraseña : this.contraseñaInput.current.value,
        }
        // extraer firestore, y history de props
        const { usuario, firestore, history } = this.props;
        
        // almacenar en la base de datos con firestore
        firestore.update({
            collection: 'usuarios',
            doc: usuario.id
        }, usuarioActualizado ).then(history.push('/usuarios'));

    }


    render() { 

        const { usuario} = this.props;

        if(!usuario) return <Spinner />

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
                        <i className="fas fa-user"></i> {''}
                        Editar Usuario
                    </h2>

                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                            <form
                                onSubmit={this.editarUsuario}
                            >
                                <div className="form-group">
                                    <label>Nombre:</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name="nombre"
                                        placeholder="Nombre del Usuario"
                                        required
                                        ref={this.nombreInput}
                                        defaultValue={usuario.nombre}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Email:</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        placeholder="Email del Usuario"
                                        required
                                        ref={this.emailInput}
                                        defaultValue={usuario.email}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Contraseña:</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name="contraseña"
                                        placeholder="Carrera del Suscriptor"
                                        required
                                        ref={this.contraseñaInput}
                                        defaultValue={usuario.contraseña}
                                    />
                                </div>


                                <input 
                                    type="submit"
                                    value="Editar Usuario"
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

EditarUsuario.propTypes = {
    firestore: PropTypes.object.isRequired
}
 
export default compose(
    firestoreConnect(props => [
        {
            collection : 'usuarios',
            storeAs : 'usuario',
            doc : props.match.params.id
        }
    ]), 
    connect(({ firestore: { ordered }}, props ) => ({
        usuario : ordered.usuario && ordered.usuario[0]
    }))
)(EditarUsuario)