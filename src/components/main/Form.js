

import React from "react";
import './Form.css';

class Form extends React.Component {

    envioFormulario= (event)=>{
        event.preventDefault();
        const form= event.target;
        this.props.agregarIncidencia(form.titulo.value,form.usuario.value,form.descripcion.value,form.categoriavalue,form.nivel.value,
                        form.ubicacion.value)
    }

    render(){
        return (
            <div>
                <h2>Registrar incidencias</h2>
                <form onSubmit={this.envioFormulario}>
                    <div className="elemento-form">
                        <label>Titulo: </label>
                        <input type="text" name="titulo" placeholder="Introduce el titulo de la incidencia" required></input>
                    </div>

                     <div className="elemento-form">
                        <label>Id_usuario: </label>
                        <input type="text" name="usuario" placeholder="Introduce el usuario de la incidencia" required></input>
                    </div>

                     <div className="elemento-form">
                        <label>Descripcion: </label>
                        <input type="text" name="descripcion" placeholder="Introduce la descripcion de la incidencia" required></input>
                    </div>

                    <div className="elemento-form">
                        <label>Categoria: </label>
                        <select type="text" name="categoria" placeholder="Introduce la categoria de la incidencia" required>
                            <option value="">Seleccionar...</option>
                            <option>Hardware</option>
                            <option>Software</option>
                            <option>Red y conectividad</option>
                            <option>Usuarios y Acceso</option>
                            <option>Infraestructura</option>
                        </select>
                    </div>

                    <div className="elemento-form">
                        <label>nivel_urgencia: </label>
                            <select type="text" name="nivel" placeholder="Introduce la categoria de la incidencia" required>
                            <option value="">Seleccionar...</option>
                            <option>Alta</option>
                            <option>Media</option>
                            <option>Baja</option>
                        </select>                  
                    </div>

                    <div className="elemento-form">
                        <label>Ubicacion: </label>
                        <input type="text" name="ubicacion" placeholder="Introduce la ubicacion de la incidencia" required></input>
                    </div>

                    <button type="submit" className="elemento-form-button">Registrar</button>

                </form>
            </div>
        )
    }
}

export default Form;
