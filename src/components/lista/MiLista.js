import React, { useState } from "react";

function MiLista (props) {

    return(
        <div ClassName='lista'>
            <ul>
                {
                    props.incidencias.map((i)=> (
                        <li>
                            
                            <strong>ID incidencia:</strong> {i.id_incidencias}<br></br>
                            <strong>Titulo: </strong>{i.titulo}<br></br>
                           <strong>Descripcion: </strong>{i.descripcion}<br></br>
                            <strong>Categoria: </strong>{i.categoria}<br></br>
                            <strong>Nivel de urgencia: </strong>{i.nivel_urgencia}<br></br>
                            <strong>Fecha de registro: </strong>{i.fecha_registro}<br></br>
                            <strong>Estado: </strong>{i.estado}<br></br>
                            <strong>Ubicacion: </strong>{i.ubicacion}<br></br>
                            
                        </li>
                        
                    ))

                }
            </ul>
        </div>
    );
}
export default MiLista;