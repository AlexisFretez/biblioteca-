import { createStore, combineReducers, compose } from "redux";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
/**
 * Custom Reducers 
 */
import buscarUsuarioReducer from './reducesrs/buscarUsuarioReducer'


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcwKmkSaZExYPkwC4w876Cy9SK6dCt4dw",
  authDomain: "bibliostore-c29bb.firebaseapp.com",
  projectId: "bibliostore-c29bb",
  storageBucket: "bibliostore-c29bb.appspot.com",
  messagingSenderId: "527509683583",
  appId: "1:527509683583:web:f77433912757757361ee4a",
  measurementId: "G-JTPVH9863Q"
};

// inicializar firebase
firebase.initializeApp(firebaseConfig);

// configuracion de react-redux
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true
};

// crear el enhacer con compose de redux y firestore
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
)(createStore);

// Reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  usuario : buscarUsuarioReducer
});

// state inicial
const initialState = {};

// Create el store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
export default store;
