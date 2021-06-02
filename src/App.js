import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';

import Libros from './componentes/libros/libros';
import MostrarLibro from './componentes/libros/MostrarLibro';
import NuevoLibro from './componentes/libros/NuevoLibro';
import EditarLibro from './componentes/libros/EditarLibro';
import PrestamoLibro from './componentes/libros/PrestamoLibro';

import Suscriptores from './componentes/suscriptores/Suscriptores';
import MostrarSuscriptor from './componentes/suscriptores/MostrarSuscriptor';
import EditarSuscriptor from './componentes/suscriptores/EditarSuscriptor';
import NuevoSuscriptor from './componentes/suscriptores/NuevoSuscriptor';

import Usuarios from './componentes/usuarios/Usuarios';
import NuevoUsuario from './componentes/usuarios/NuevoUsuario';
import MostrarUsuario from './componentes/usuarios/MostrarUsuario';
import EditarUsuario from './componentes/usuarios/EditarUsuario';

import Login from './componentes/auth/Login';
import Navbar from './componentes/layout/Navbar';

import { UserIsAuthenticated, UserIsNotAuthenticated } from './helpers/auth';

function App() {
  return (
    <Provider store={store}>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
                <Route exact path="/" component={ UserIsAuthenticated(Libros)} />
                <Route exact path="/libros/mostrar/:id" component={ UserIsAuthenticated(MostrarLibro)} />
                <Route exact path="/libros/nuevo" component={ UserIsAuthenticated(NuevoLibro)} />
                <Route exact path="/libros/editar/:id" component={ UserIsAuthenticated(EditarLibro)} />
                <Route exact path="/libros/prestamo/:id" component={ UserIsAuthenticated(PrestamoLibro)} />


                <Route exact path="/suscriptores" component={ UserIsAuthenticated(Suscriptores)} />
                <Route exact path="/suscriptores/nuevo" component={ UserIsAuthenticated(NuevoSuscriptor)} />
                <Route exact path="/suscriptores/mostrar/:id" component={ UserIsAuthenticated(MostrarSuscriptor)} />
                <Route exact path="/suscriptores/editar/:id" component={ UserIsAuthenticated(EditarSuscriptor)} />

                <Route exact path="/usuarios" component={ UserIsAuthenticated(Usuarios)} />
                <Route exact path="/usuarios/nuevo" component={ UserIsAuthenticated(NuevoUsuario)} />
                <Route exact path="/usuarios/mostrar/:id" component={ UserIsAuthenticated(MostrarUsuario)} />
                <Route exact path="/usuarios/editar/:id" component={ UserIsAuthenticated(EditarUsuario)} />

                <Route exact path="/login" component={UserIsNotAuthenticated(Login)} />


                
            </Switch>
          </div>
      </Router>
    </Provider>
  );
}

export default App;
