import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

import FichaSuscriptor from '../suscriptores/FichaSuscriptor';

// redux actions 
import { buscarUsuario } from '../../actions/buscarUsuarioActions';
import swal from 'sweetalert'


class PrestamoLibro extends Component {
    state = { 
        noResultados : false,
        busqueda : ''
     }
    //Buscar Alumno por Codigo
    buscarAlumno = e => {   
        e.preventDefault();

        //Obtener el valor buscado
        const { busqueda } = this.state;

        //extraer firestore
        const { firestore, buscarUsuario } = this.props;

        //hacer la consulta
        const coleccion = firestore.collection('suscriptores');
        const consulta = coleccion.where("codigo", "==", busqueda).get();
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
    //Almacena los datos del alumno para solictar el libro
    solicitarPrestamo = () => {
        const  {usuario}  = this.props;
        console.log(usuario);

       
        //fecha de Alta

        usuario.fecha_solicitud = new Date().toLocaleDateString();

        //No se pueden mutar los props, tomar una copia y crear un arreglo nuevo

        let prestados = [];
        prestados = [...this.props.libro.prestados, usuario];
        console.log(prestados);
        
        //Copiar el objeto y agregar los prestados

        const libro = {...this.props.libro};


        //eliminar los prestados anteriores

        delete libro.prestados;

        //Asignar los prestados
        libro.prestados = prestados;

        //extraer firestore

        const { firestore, history} = this.props;

        //Almacenamos en BD 
        firestore.update({
            collection: 'libros',
            doc: libro.id
        }, libro).then(history.push('/'));
        swal("Good job!", "Has creado un nuevo !", "success");
        usuario.nombre = '';
        
    }


    //Almacenar el codigo en el state
    leerDato = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    render() { 
        //Extrar el libro
        const { libro } = this.props;
        //Mostrar Spinner
        if(!libro) return <Spinner />
        //Extraer el Alumno
        const { usuario } = this.props;

        let fichaAlumno, btnSolicitar;
        if(usuario.nombre){
            fichaAlumno = <FichaSuscriptor 
                alumno={usuario}
            />
            btnSolicitar = <button
                                type="button"
                                className="btn btn-info btn-block"
                                onClick={this.solicitarPrestamo}
                                >Solicitar Prestamo</button>
        }else{
            fichaAlumno= null;
            btnSolicitar=null;
        }

        //extraer no resultados

        const {noResultados} = this.state;

        //Mostrar mensaje de error
        let mensajeResusltado ='';
        if(noResultados) {

            mensajeResusltado = <div className="alert alert-danger text-center font-weight-bold">Sin resultados</div>

        }else{
            mensajeResusltado= null;
        }

        return ( 
            <div className="row">
                <div className="col-12 mb-4">
                    <Link to={"/"} className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i> {""}
                        Volver al Listado
                    </Link>
                </div>
                <div className="col-12">
                    <h2>
                        <i className="fas fa-user"></i>
                        {""}
                        Solicitar Prestamo : {libro.titulo}
                    </h2>
                    <div className="row justify-content-center mt-5">
                        <div className="col-md-8">
                            <form
                                onSubmit={this.buscarAlumno}
                                className="mb-4"
                            >
                                <legend className="color-primary text-center">
                                    Buscar El Sucriptor por Codigo
                                </legend>
                                <div className="form-group">
                                    <input type="text"
                                    name="busqueda"
                                    className="form-control"
                                    onChange={this.leerDato}
                                    />
                                </div>
                                <input type="submit"
                                value="Buscar Alumno" className="btn btn-success btn-block"/>
                            </form>
                            {/* Muestra la ficha del alumno y el boton para solicitar el prestamo*/}
                            {fichaAlumno}
                            {btnSolicitar}

                            {/* muestra un mensaje de no resultados */}
                            {mensajeResusltado}
                        </div>

                    </div>
                </div>
            </div>  
         );
    }
}
 
PrestamoLibro.propTypes = {
    firestore: PropTypes.object.isRequired
}
 
export default compose(
    firestoreConnect(props => [
        {
            collection : 'libros',
            storeAs : 'libro',
            doc : props.match.params.id
        }
    ]), 
    connect(({ firestore: { ordered }, usuario}, props ) => ({
        libro : ordered.libro && ordered.libro[0],usuario: usuario
    }), {buscarUsuario})
)(PrestamoLibro)