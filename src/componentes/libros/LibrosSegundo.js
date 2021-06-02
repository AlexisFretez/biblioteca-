import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import swal from 'sweetalert'


//const Libros = ({libros, firestore}) => {

class Libros extends Component {
    state = { 
        noResultados : false,
        busqueda : ''
     }

         //Buscar Alumno por Codigo
    buscarLibro = e => {   
        e.preventDefault();

        //Obtener el valor buscado
        const { busqueda } = this.state;

        //extraer firestore
        const { firestore, buscarUsuario } = this.props;

        //hacer la consulta
        const coleccion = firestore.collection('libros');
        const consulta = coleccion.where("titulo", "==", busqueda).get();
        //Limpia el Input
        e.target.reset()
        //leer los resultados
        consulta.then(resultado =>{
            if(resultado.empty){
                // No hubo resultado

                //almacenar en redux un objeto vacio
                buscarUsuario({})
                //actualiza el state en base si hay resulatdos
                this.setState({
                    noResultados: true
                   
                });
            }else{
                //si hay resultado

                //colocarel resultado en el state de redux
                const datos = resultado.docs[0] ;
                buscarUsuario(datos.data());
                
                //actualiza el state en base si hay resulatdos


                this.setState({
                    
                    noResultados: false

                })
                
            }
            
        })
        
    }


     eliminarLibro (id, e)  {
        const { firestore } = this.props;
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this file!",
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
        firestore.delete({
            collection : 'libros',
            doc : id
        });
            } else {
              swal("Your file is safe!");
            }
          });
        
        
    }
    render() { 
        const { libros } = this.props;
        
        const { firestore } = this.props;
    if(!libros) return <Spinner />


    return ( 
        <div className="row">
            <div className="col-12 mb-4">
                <Link to="/libros/nuevo" className="btn btn-success">
                    <i className="fas fa-plus"></i> {''}
                    Nuevo Libro
                </Link>
            </div>
            
            <div className="col-md-8">
                <h2>
                    <i className="fas fa-book"></i> {''}
                    Libros
                </h2>
            </div>
            <div className="text-center">
                            <form
                                onSubmit={this.buscarLibro}
                                className="mb-4"
                            >
                                <legend className="color-primary text-center">
                                    Buscar El Libro por Nombre
                                </legend>
                                <div className="form-group">
                                    <input type="text"
                                    name="busqueda"
                                    className="form-control"
                                    onChange={this.leerDato}
                                    />
                                </div>
                                <input type="submit"
                                value="Buscar Libro" className="btn btn-success btn-block"/>
                            </form>
                            {/* Muestra la ficha del alumno y el boton para solicitar el prestamo*/}
                           

                            {/* muestra un mensaje de no resultados */}
                            
                        </div>

            <table className="table table-striped mt-4">
                <thead className="text-light bg-primary">
                    <tr>
                        <th>Titulo</th>
                        <th>ISBN</th>
                        <th>Editorial</th>
                        <th>Existencia</th>
                        <th>Disponibles</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {libros.map(libro => (
                        <tr key={libro.id}>
                            <td>{libro.titulo}</td>
                            <td>{libro.ISBN}</td>
                            <td>{libro.editorial}</td>
                            <td>{libro.existencia}</td>
                            <td>{libro.existencia - libro.prestados.length}</td>
                            <td>
                                <Link 
                                    to={`/libros/mostrar/${libro.id}`}
                                    className="btn btn-success btn-block"
                                > 
                                    <i className="fas fa-angle-double-right"></i> {''}  
                                    Más Información
                                </Link>

                                <button 
                                    type="button"
                                    className="btn btn-danger btn-block"
                                    onClick={(e) => this.eliminarLibro(libro.id, e)}
                                >
                                    <i className="fas fa-trash-alt"></i> {''}
                                    Eliminar

                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
     );
     }
}

Libros.propTypes = {
    firestore : PropTypes.object.isRequired,
    libros: PropTypes.array
}
 
export default compose(
    firestoreConnect([{ collection : 'libros' }]),
    connect((state, props) => ({
        libros : state.firestore.ordered.libros
    }))
)(Libros);