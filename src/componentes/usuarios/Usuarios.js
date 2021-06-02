import React from 'react';
import { useState, ChangeEvent } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';

import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

import swal from 'sweetalert'


const Usuarios = ({usuarios, firestore}) => {


    //Paginacion y busqueda
    const [ currentPage, setCurrentPage ] = useState(0)
    const [ search, setSearch ] = useState('');


    console.log(currentPage);

    const filteredUsuarios = (): Suscriptor[] => {
    
        if( search.length === 0 ) 
        return usuarios.slice(currentPage, currentPage +5);

        //Si hay suscriptor 
        const filtered = usuarios.filter( sus => sus.nombre.toLowerCase().includes( search.toLowerCase())||sus.email.toLowerCase().includes( search.toLowerCase())
        );
        
        return filtered.slice(currentPage, currentPage +5);
    
    }

    const Siguiente = () => {
        //Este if Impide que pase al siguienbte si nom hay mas usuarios
        if(usuarios.filter( sus => sus.nombre.includes( search )).length > currentPage +5 )
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

    if(!usuarios) return <Spinner />;

    // Eliminar Suscriptores
    const eliminarSuscriptor = id => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover thi file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("Eliminado con Exito", {
                icon: "success",
              });
              // eliminar
        firestore.delete({
            collection : 'suscriptores', 
            doc : id
        });
            } else {
              swal("Your file is safe!");
            }
          });
        
    }

    

  


    return ( 
        <div className="row">
            <div className="col-md-12 mb-4">
                <Link
                    to="/usuarios/nuevo"
                    className="btn btn-primary"
                >
                    <i className="fas fa-plus"></i> {''}
                    Nuevo Usuario
                </Link>
            </div>
            <div className="col-md-8">
                <h2>
                    <i className="fas fa-users"></i> Usuarios
                </h2>
            </div>
            <hr/>
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
                placeholder="Buscar Usuario"
                value={ search }
                onChange={ e =>setSearch(e.target.value) }
                />
                
                </div>

            <table className="table table-striped mt-4">
                <thead className="text-light bg-primary">
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredUsuarios().map(usuario => (
                        <tr key={usuario.id}>
                            <td>{usuario.nombre} {usuario.apellido}</td>
                            <td>{usuario.email}</td>
                            <td>
                                <Link
                                    to={`/usuarios/mostrar/${usuario.id}`}
                                    className="btn btn-success btn-block"
                                >
                                    <i className="fas fa-angle-double-right"></i> {''}
                                    Más Información
                                
                                </Link>

                                <button
                                    type="button"
                                    className="btn btn-danger btn-block"
                                    onClick={ () => eliminarSuscriptor(usuario.id) }
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
Usuarios.propTypes = {
    firestore : PropTypes.object.isRequired,
    usuarios : PropTypes.array
}

 
export default compose(
    firestoreConnect([{ collection : 'usuarios' }]),
    connect((state, props) => ({
        usuarios : state.firestore.ordered.usuarios
    }))
)(Usuarios);