import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import swal from 'sweetalert'

class MostrarLibro extends Component {
    

    devolverLibro = id => {
        swal({
            title: "Estas Seguro?",
            text: "Una vez eliminado, no podrá recuperar este archivo.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("Your file has been deleted!", {
                icon: "success",
              });
              // eliminar libro de Firestore
       
        // extraer firestore
        const { firestore } = this.props;

        // copia del libro
        const libroActualizado = {...this.props.libro};

        // eliminar la persona que esta realizando la devolución de prestados
        const prestados = libroActualizado.prestados.filter(elemento => elemento.codigo !== id);
        libroActualizado.prestados = prestados;

        // actualizar en firebase
        firestore.update({
            collection : 'libros',
            doc: libroActualizado.id
        }, libroActualizado);
       // window.location.reload(true);
            } else {
              swal("Your file is safe!");
            }
          });


    }

    //Almacenar el codigo en el state
    leerDato = e => {
        this.setState({
            [e.target.name] : e.target.value
            
        })
    }

    render() {
        
        // extraer el libro
        const { libro } = this.props;

        if(!libro) return <Spinner />;

        swal("Bienvenido Al" + " Libro " +  libro.titulo);

        // boton para solicitar un libro
        let btnPrestamo;

        if(libro.existencia - libro.prestados.length > 0 ) {
            btnPrestamo = <Link to={`/libros/prestamo/${libro.id}`}
                                className="btn btn-success my-3 btn-block"
                            >Buscar Suscriptor
                            </Link>
                            
        } else {
            swal("Ya no hay Libros");
            btnPrestamo = null;
        }
        
        return ( 
            <div className="row">
                <div className="col-md-6 mb-4">
                    <Link to="/" className="btn btn-info">
                        <i className="fas fa-arrow-circle-left"></i> {''}
                        Volver Al Listado
                    </Link> 
                </div>
                <div className="col-md-6 mb-4">
                    <Link to={`/libros/editar/${libro.id}`} className="btn btn-primary float-right">
                        <i className="fas fa-pencil-alt"></i> {''}
                        Editar Libro
                    </Link> 
                </div>

                <hr className="mx-5 w-100"/>

                <div className="col-12">
                    <h2 className="mb-4">{libro.titulo}</h2>

                    <p>
                        <span className="font-weight-bold">
                            ISBN:
                        </span> {''}
                        {libro.ISBN}
                    </p>

                    <p>
                        <span className="font-weight-bold">
                            Editorial:
                        </span> {''}
                        {libro.editorial}
                    </p>

                    <p>
                        <span className="font-weight-bold">
                            Existencia:
                        </span> {''}
                        {libro.existencia}
                    </p>

                    <p>
                        <span className="font-weight-bold">
                            Disponibles:
                        </span> {''}
                        {libro.existencia - libro.prestados.length }
                    </p>

                    {/* Boton para solicitar un prestamo de libro */}
                    {btnPrestamo}

                    {/* Muestra las personas que tienen los libros */}

                    <h6 className="my-2">Personas que tienen el Libro Prestado</h6>

                    {libro.prestados.map(prestado => (
                        <div key={prestado.codigo} className="row">
                            <h5 className="col-lg-4"> Nombre y Apellido:
                                {prestado.nombre} {prestado.apellido}
                            </h5>

                            <div className="card-body">
                                <p>
                                    <span className="font-weight-bold">
                                        Código:
                                    </span> {''}
                                    {prestado.codigo}
                                </p>

                                <p>
                                    <span className="font-weight-bold">
                                        Carrera:
                                    </span> {''}
                                    {prestado.carrera}
                                </p>

                                <p>
                                    <span className="font-weight-bold">
                                        Fecha Solicitud:
                                    </span> {''}
                                    {prestado.fecha_solicitud}
                                </p>
                            </div>

                            <div className="card-footer">
                                <button 
                                    type="button"
                                    className="btn btn-success font-weight-bold"
                                    onClick={() => this.devolverLibro(prestado.codigo)}
                                > Realizar Devolución </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>        
         );
    }
}

MostrarLibro.propTypes = {
    firestore : PropTypes.object.isRequired
}

export default compose(
    firestoreConnect(props => [
        {
            collection : 'libros',
            storeAs : 'libro',
            doc : props.match.params.id
        }
    ]), 
    connect(({ firestore: { ordered }}, props ) => ({
        libro : ordered.libro && ordered.libro[0]
    }))
)(MostrarLibro)