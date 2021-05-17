import {Component} from 'react';
import { Link } from 'react-router-dom';
import {compose} from 'redux';
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import PropTypes from 'prop-types';

class Navbar extends Component {
  state = { 
    usuarioAutenticado : false
   }

  //recibe los props automaticamente

  static getDerivedStateFromProps(props, state) {
  //static getDerivedStateFromProps(nextProps, prevState) {
    
   const { auth } = props;

   if(auth.uid){
     return { usuarioAutenticado : true }
   }else{
     return {usuarioAutenticado : false}
   }
    
    
  }

  // cerrar la sesion
  cerrarSesion = () => {
    const { firebase } = this.props;
    firebase.logout();
  }
  render() { 
    /* */
    const { usuarioAutenticado } = this.state;

    //Extraer la persona autenticada
    const { auth } = this.props;
    console.log(auth);
    

    
    
    
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-5">
        <nav className="navbar navbar-light">
          <span className="navbar-brand mb-0 h1">
            Administrador de Biblioteca
          </span>
        </nav>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
  
        <div className="collapse navbar-collapse" id="navbarColor01">
          {usuarioAutenticado ? (
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/suscriptores"} className="nav-link">
                  Suscriptores
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/"} className="nav-link">
                  Libros
                </Link>
              </li>
            </ul>

          ) : null }

          {usuarioAutenticado ? (
            <ul className="navbar-nav ml-auto">
              <l1 className="nav-item">
                <a href="#!" className="nav-link">
                    { auth.email}
                </a>
              </l1>
              <li className="nav-item">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={this.cerrarSesion}
                >
                  Cerrar Sesion
                </button>
              </li>
            </ul>
          ) : null }
        </div>
      </nav>
    );
  };
  }
  Navbar.propTypes = {
    firenase : PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  }
export default compose(
  firebaseConnect(),
  connect((state, props) =>({
    auth: state.firebase.auth
  }))
)(Navbar)

