import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";
//im,portar botones
import { Link } from "react-router-dom";
//Importar el Spinner
import Spinner from "../layout/Spinner";

class EditarSuscriptor extends Component {
  //crear los refs
  nombreInput = React.createRef();
  apellidoInput = React.createRef();
  codigoInput = React.createRef();
  carreraInput = React.createRef();
  cursoInput = React.createRef();
  telefonoInput = React.createRef();

  //Edita el suscriptor en la BD
  editarSuscriptor = e => {
    e.preventDefault();
    //Crear el Objeto a Actualizar
    const suscriptorActualizado = {
      nombre: this.nombreInput.current.value,
      apellido: this.apellidoInput.current.value,
      codigo: this.codigoInput.current.value,
      carrera: this.carreraInput.current.value,
      curso: this.cursoInput.current.value,
      telefono: this.telefonoInput.current.value
    };
    console.log(suscriptorActualizado);
    //Extraer de firestore y history de props
    const { suscriptor, firestore, history } = this.props;

    //Almacena en la BD con Firestore
    firestore
      .update(
        {
          collection: "suscriptores",
          doc: suscriptor.id
        },
        suscriptorActualizado
      )
      .then(history.push("/suscriptores"));
  };
  render() {
    const { suscriptor } = this.props;
    if (!suscriptor) return <Spinner />;
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
            Editar Suscriptor
          </h2>
          <div className="row justify-content-center">
            <div className="col-md-8 mt-5">
              <form onSubmit={this.editarSuscriptor}>
                <div className="form-group">
                  <strong>
                    <label>Nombre</label>
                  </strong>
                  <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    placeholder="Nombre del Suscriptor"
                    required
                    ref={this.nombreInput}
                    defaultValue={suscriptor.nombre}
                  />
                </div>
                <div className="form-group">
                  <strong>
                    <label>Apellido</label>
                  </strong>
                  <input
                    type="text"
                    className="form-control"
                    name="apellido"
                    placeholder="Apellido del Suscriptor"
                    required
                    ref={this.apellidoInput}
                    defaultValue={suscriptor.apellido}
                  />
                </div>
                <div className="form-group">
                  <strong>
                    <label>Curso</label>
                  </strong>
                  <input
                    type="text"
                    className="form-control"
                    name="curso"
                    placeholder="Curso del Suscriptor"
                    required
                    ref={this.cursoInput}
                    defaultValue={suscriptor.curso}
                  />
                </div>
                <div className="form-group">
                  <strong>
                    <label>Carrera</label>
                  </strong>
                  <input
                    type="text"
                    className="form-control"
                    name="carrera"
                    placeholder="Carrera del Suscriptor"
                    required
                    ref={this.carreraInput}
                    defaultValue={suscriptor.carrera}
                  />
                </div>
                <div className="form-group">
                  <strong>
                    <label>Telefono</label>
                  </strong>
                  <input
                    type="text"
                    className="form-control"
                    name="telefono"
                    placeholder="Telefono del Suscriptor"
                    required
                    ref={this.telefonoInput}
                    defaultValue={suscriptor.telefono}
                  />
                </div>
                <div className="form-group">
                  <strong>
                    <label>Codigo</label>
                  </strong>
                  <input
                    type="text"
                    className="form-control"
                    name="codigo"
                    placeholder="Codigo del Suscriptor"
                    required
                    ref={this.codigoInput}
                    defaultValue={suscriptor.codigo}
                  />
                </div>
                <input
                  type="submit"
                  defaultValue="Editar"
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
EditarSuscriptor.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    {
      collection: "suscriptores",
      storeAs: "suscriptor",
      doc: props.match.params.id
    }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    suscriptor: ordered.suscriptor && ordered.suscriptor[0]
  }))
)(EditarSuscriptor);
