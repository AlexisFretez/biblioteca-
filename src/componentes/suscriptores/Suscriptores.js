import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
//im,portar botones
import { Link } from "react-router-dom";
//Importar el Spinner
import Spinner from "../layout/Spinner";

const Suscriptores = ({ suscriptores }) => {
  console.log(suscriptores);

  if (!suscriptores) return <Spinner />;

  return (
    <div className="row">
      <div className="col-md-12 mb-4">
        <Link to="/suscriptores/nuevo" className="btn btn-primary">
          <i className="fas fa-plus"></i> {""}
          Agregar Nuevo
        </Link>
      </div>
      <div className="col-md-8">
        <h2>
          <i className="fas fa-users">Suscriptores</i>
        </h2>
      </div>
      <table className="table table-striped mt-4">
        <thead className="text-light bg-primary">
          <tr>
            <th>Nombre</th>
            <th>Carrera</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {suscriptores.map(suscriptor => (
            <tr key={suscriptor.id}>
              <td>
                {suscriptor.nombre} {suscriptor.apellido}
              </td>
              <td>{suscriptor.carrera}</td>
              <td>
                <Link
                  to={`/suscriptores/mostrar/${suscriptor.id}`}
                  className="btn btn-info btn-block"
                >
                  <i className="fas fa-angle-double-right"></i> {""}
                  Mas Info..
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default compose(
  firestoreConnect([{ collection: "suscriptores" }]),
  connect((state, props) => ({
    suscriptores: state.firestore.ordered.suscriptores
  }))
)(Suscriptores);
