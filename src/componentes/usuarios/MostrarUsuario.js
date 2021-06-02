import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

const MostrarUsuario = ({usuario}) => {
    if(!usuario) return <Spinner />

    return ( 
        <div className="row">
            <div className="col-md-6 mb-4">
                <Link to="/usuarios" className="btn btn-secondary">
                    <i className="fas fa-arrow-circle-left"></i> {''}
                    Volver al Listado
                </Link> 
            </div>
            <div className="col-md-6">
                <Link to={`/usuarios/editar/${usuario.id}`} className="btn btn-primary float-right">
                    <i className="fas fa-pencil-alt"></i> {''}
                    Editar Usuario
                </Link>
            </div>

            <hr className="mx-5 w-100"/>

            <div className="col-12">
                <h2 className="mb-4">
                    {usuario.nombre} 
                </h2>

                <p>
                    <span className="font-weight-bold">
                        Email:
                    </span> {''}
                    {usuario.email}
                </p>
                <p>
                    <span className="font-weight-bold">
                        Contraseña:
                    </span> {''}
                    {usuario.contraseña}
                </p>
            </div>
            

        </div>
    );
}

MostrarUsuario.propTypes = {
    firestore : PropTypes.object.isRequired
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
)(MostrarUsuario)