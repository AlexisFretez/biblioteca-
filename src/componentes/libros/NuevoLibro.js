import React, { Component } from 'react';
//im,portar botones
import { Link } from "react-router-dom";
// Con esto tenemos acceso a todas las funciones de firestore
import { firestoreConnect } from "react-redux-firebase";

import PropTypes from "prop-types";
class NuevoLibro extends Component {
    state = { 
        titulo: "",
        ISBN: "",
        editorial : "",
        existencia: "",


     }
     //Guarda el LIbro el BD
     agregarLibro = e => {
         e.preventDefault();

        //TOMAR UNA COPIA DEL STATE
        const nuevoLibro = this.state;

//Agregar un arreglo de Prestados
nuevoLibro.prestados = [];


        //EXTRAER FIRESTORE CON SUS METODOS
        const { firestore, history } = this.props;

        //AÑADIR A LA BD Y REDIRECCIONARLO
        firestore.add({collection: "libros"}, nuevoLibro)
        .then(() => history.push('/'))
     }

     //Almacena Lo que el usuario Escribe
     leerDato = e => {
         this.setState({
             [e.target.name] : e.target.value
         })
     }
    render() { 
        return ( 
            <div className="row">
                <div className="col-12 mb-4">
                    <Link to="/" className="btn btn-info">
                    <i className="fas fa-arrow-circle-left"></i> {""}
                    Volver
                    </Link>
                </div>
                <div className="col-12">
                    <h2>
                        <i className="fas fa-book"> {""}
                        Nuevo Libro

                        </i>
                    </h2>
                    <div className="row justify-contenc-center">
                        <div className="col-md-8 mt-5">
                            <form
                                onSubmit={this.agregarLibro}
                            >
                                <div className="form-group">
                                    <label>Titulo</label>
                                    <input 
                                    type="text"
                                    className="form-control"
                                    name="titulo"
                                    placeholder="Titulo del Libro"
                                    required
                                    value={this.state.titulo}
                                    onChange={this.leerDato}

                                    />
                                </div>
                                <div className="form-group">
                                    <label>Editorial</label>
                                    <input 
                                    type="text"
                                    className="form-control"
                                    name="editorial"
                                    placeholder="Editorial del Libro"
                                    required
                                    value={this.state.editorial}
                                    onChange={this.leerDato}

                                    />
                                </div>
                                <div className="form-group">
                                    <label>ISBN</label>
                                    <input 
                                    type="text"
                                    className="form-control"
                                    name="ISBN"
                                    placeholder="ISBN del Libro"
                                    required
                                    value={this.state.ISBN}
                                    onChange={this.leerDato}

                                    />
                                </div>
                                <div className="form-group">
                                    <label>Existencia</label>
                                    <input 
                                    type="number"
                                    min="0"
                                    className="form-control"
                                    name="existencia"
                                    placeholder="Cantidad del Libro"
                                    required
                                    value={this.state.existencia}
                                    onChange={this.leerDato}

                                    />
                                </div>
                                <input type="submit" value="Agregar" className="btn btn-success"/>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
NuevoLibro.propTypes = {
    firestore: PropTypes.object.isRequired,
    //libros: PropTypes.array
  };
 
export default firestoreConnect()(NuevoLibro);