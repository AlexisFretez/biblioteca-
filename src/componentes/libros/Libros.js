import React from 'react';
import { useState, ChangeEvent } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import Spinner from '../layout/Spinner';
import swal from 'sweetalert'


const Libros = ({libros, firestore}) => {

   //Paginacion y busqueda
   const [ currentPage, setCurrentPage ] = useState(0)
   const [ search, setSearch ] = useState('');


   console.log(currentPage);

   const filteredLibros = (): Libros[] => {
   
       if( search.length === 0 ) 
       return libros.slice(currentPage, currentPage +5);

       //Si hay suscriptor 
       const filtered = libros.filter( sus => sus.titulo.toLowerCase().includes( search.toLowerCase() ));
       return filtered.slice(currentPage, currentPage +5);
   
   }

   const Siguiente = () => {
       //Este if Impide que pase al siguienbte si nom hay mas suscriptores
       if(libros.filter( sus => sus.titulo.includes( search )).length > currentPage +5 )
           setCurrentPage( currentPage + 5 );
   }


   const Anterior = () => {
       if(currentPage > 0)
       setCurrentPage( currentPage - 5 );
}

const onSearchChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
   setCurrentPage(0);
   setSearch( target.value );
}
 // Hastaa aca Paginacion 

    const eliminarLibro = id => {
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

    if(!libros) return <Spinner />


    return ( 
        <div className="row">
            <div className="col-12 mb-4">
                <Link to="/libros/nuevo" className="btn btn-success">
                    <i className="fas fa-plus"></i> {''}
                    Nuevo Libross
                </Link>
            </div>
            <div className="col-md-8">
                <h2>
                    <i className="fas fa-book"></i> {''}
                    Libros
                </h2>
            </div>
            
            
            <div class="btn-group">
            <FontAwesome
              className='search'
              name='search'
              size='3x'
              style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',color:'lightblue',background: '#18bc9c', borderColor: "#18bc9c" }}
            />
                <input 
                type="text"
                className=""
                placeholder="Buscar Alumno"
                value={ search }
                onChange={ e =>setSearch(e.target.value) }
                />
                <div class="input-group-append">
                    <button id="show_password" class="btn btn-success" type="button" onclick="mostrarPassword()">
                        <span class="fas fa-search"></span>
                    </button>
                </div>
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
                    {filteredLibros().map(libro => (
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
                                    onClick={() => eliminarLibro(libro.id)}
                                >
                                    <i className="fas fa-trash-alt"></i> {''}
                                    Eliminar

                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>

                <div style={{float: "right"}}>
                    <button 
                     onClick={Anterior}
                    className="btn btn-primary"
                    >
                         Anteriores
                    </button>
                    &nbsp;
            
                    <button 
                    className="btn btn-primary"
                    onClick={ Siguiente }
                    >
                        Siguientes
                    </button>
                 </div>
            </table>
        </div>
     );
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