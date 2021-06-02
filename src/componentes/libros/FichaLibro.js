import React from 'react';

const FichaLibro = ({libro}) => {
    return ( 
        <div className="card my-3">
            <h3 className="card-header bg-primary text-white">Datos Libro</h3>

            <div className="card-body">
                <p className="font-weight-bold">Nombre: {''}
                    <span className="font-weight-normal">{libro.titulo}</span>
                </p>
                <p className="font-weight-bold">Editorial: {''}
                    <span className="font-weight-normal">{libro.editorial}</span>
                </p>
                <p className="font-weight-bold">ISBN: {''}
                    <span className="font-weight-normal">{libro.ISBN}</span>
                </p>
                <p className="font-weight-bold">Existencia: {''}
                    <span className="font-weight-normal">{libro.existencia}</span>
                </p>
                
            </div>
        </div>
     );
}
 
export default FichaLibro;