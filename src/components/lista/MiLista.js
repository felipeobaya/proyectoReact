import React, { useState } from "react";
import './MiLista.css';

function MiLista (props) {

    return (
  <div className="container mt-3">
    {props.incidencias.map((i) => (

        <div key={i.id_incidencia} className="mb-4 pb-2 border-bottom">
          <li className="text-titulopersonalizado"><strong>Título: </strong>{i.titulo}<br /></li>
          <li className="mb-0 text-muted"><strong>Descripción: </strong>{i.descripcion}<br /></li>
          <li className="mb-0"><strong>Usuario: </strong>{i.usuario}<br /></li>
          <li className="mb-0"><strong>Urgencia: </strong>{i.nivel_urgencia}<br /></li>
          <li className="mb-0"><strong>Ubicación: </strong>{i.ubicacion}<br /><br /><br /></li>
        </div>
      
    ))}
  </div>
);

}
export default MiLista;