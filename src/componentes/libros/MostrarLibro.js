import React, { Component } from 'react';
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";
//im,portar botones
import { Link } from "react-router-dom";
//Importar el Spinner
import Spinner from "../layout/Spinner";
class MostrarLibro extends Component {
    state = {  }
    render() {
        //Extraer el libro
        const { libro } = this.props;
        if(!libro) return <Spinner />;
        //boton para solicitar Libro
        let btnPrestamo;
        if(libro.existencia - libro.prestados.length > 0 ){
            btnPrestamo = <Link to={`/libros/prestamo/${libro.id}`}
            className="btn btn-success my-3">
                Solicitar Prestamo

            </Link>
        }else{
            btnPrestamo = null;
        }
        return ( 
            <div className="row">
                <div className="col-md-6 mb-4">
                    <Link to="/" className="btn btn-info">
                        <i className="fas fa-arrow-circle-left"></i> {""}
                        Atras
                    </Link>
                </div>
                <div className="col-md-6 mb-4">
                    <Link to={`/libros/editar/$libro.id`} className="btn btn-primary float-right">
                        <i className="fas fa-pencil-alt"></i> {""}
                        Editar Libro
                    </Link>
                </div>
                <hr className="mx-5 w-100"/>
                <div className="col-12">
                    <h2 className="mb-4">{libro.titulo}</h2>
                    <p>
                        <span className="font-weight-bold">
                        ISBN:</span> {""}
                        {libro.ISBN}

                    </p>
                    <p>
                        <span className="font-weight-bold">
                        Editorial:</span> {""}
                        {libro.editorial}

                    </p>
                    <p>
                        <span className="font-weight-bold">
                        Existencia:</span> {""}
                        {libro.existencia}

                    </p>
                    <p>
                        <span className="font-weight-bold">
                        Disponibles:
                        </span> {""}
                        {libro.existencia - libro.prestados.length}

                    </p>
                    {/* Boton para solicitar un prestamo del libro*/}
                    {btnPrestamo}
                </div>
                
            </div>
         );
    }
}
MostrarLibro.propTypes = {
    firestore: PropTypes.object.isRequired
  };
 
export default compose(
    firestoreConnect(props => [
      {
        collection: "libros",
        storeAs: "libro",
        doc: props.match.params.id
      }
    ]),
    connect(({ firestore: { ordered } }, props) => ({
      libro: ordered.libro && ordered.libro[0]
    }))
  )(MostrarLibro);