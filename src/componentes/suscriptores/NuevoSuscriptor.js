import React, { Component } from "react";
import { Link } from "react-router-dom";
// Con esto tenemos acceso a todas las funciones de firestore
import { firestoreConnect } from "react-redux-firebase";

import PropTypes from "prop-types";

class NuevoSuscriptor extends Component {
  state = {
    nombre: "",
    apellido: "",
    carrera: "",
    codigo: ""
  };
  //Agregar u nuevo Suscriptor a la BD
  agregarSuscriptor = e => {
    e.preventDefault();

    //Extrae los Valores del State
    const nuevoSuscriptor = this.state;

    //Extraer firestore de props
    const { firestore, history } = this.props;

    //Gurdar en la BD
    firestore
      .add({ collection: "suscriptores" }, nuevoSuscriptor)
      .then(() => history.push("/suscriptores"));
  };

  //Extrae los valores de los Input y lo muestra en el State
  leerDato = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
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
            <i className="fas fa-user-plus"></i>
            {""}
            Nuevo Suscriptor
          </h2>
          <div className="row justify-content-center">
            <div className="col-md-8 mt-5">
              <form onSubmit={this.agregarSuscriptor}>
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
                    onChange={this.leerDato}
                    value={this.state.nombre}
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
                    onChange={this.leerDato}
                    value={this.state.apellido}
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
                    onChange={this.leerDato}
                    value={this.state.carrera}
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
                    onChange={this.leerDato}
                    value={this.state.codigo}
                  />
                </div>
                <input
                  type="submit"
                  value="Agregar"
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
NuevoSuscriptor.protoType = {
  firestore: PropTypes.object.isRequired
};

export default firestoreConnect()(NuevoSuscriptor);
