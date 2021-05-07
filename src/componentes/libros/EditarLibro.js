import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
class EditarLibro extends Component {
    //refs
    tituloInput = React.createRef();
    editorialInput = React.createRef();
    ISBNImput = React.createRef();
    existenciaInput = React.createRef();


    render() { 
        // obtener el libro
        const { libro } = this.props;

        if(!libro) return <Spinner />


        return ( 
            <div className="row">
                <div className="col-12 mb-4">
                    <Link to={"/suscriptores"} className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i> {""}
                        Volver al Listado
                    </Link>
                </div>
                <div className="col-12">
                    <h2>
                        <i className="fas fa-user"></i>
                        {""}
                        Editar Libro
                    </h2>
                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                            <form 
                                onSubmit={this.actualizarLibro}
                            >
                                <div className="form-group">
                                    <label>Titulo</label>
                                    <input 
                                    type="text"
                                    className="form-control"
                                    name="titulo"
                                    placeholder="Titulo del Libro"
                                    required
                                    defaultValue={libro.titulo}
                                    ref={this.tituloInput}

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
                                    defaultValue={libro.editorial}
                                    ref={this.editorialInput}

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
                                    defaultValue={libro.ISBN}
                                    ref={this.ISBNImput}

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
                                    defaultValue={libro.existencia}
                                    ref={this.existenciaInput}

                                    />
                                </div>
                                <input type="submit" value="Editar" className="btn btn-success"/>

                            </form>

                        </div>
                    </div>
                </div>
            </div>

         );
    }
}
 
EditarLibro.propTypes = {
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
    connect(({ firestore: { ordered }}, props ) => ({
        libro : ordered.libro && ordered.libro[0]
    }))
)(EditarLibro)