import React from "react";
import './Form.css';

function Form(props) {

    const envioFormulario = (event) => {
        event.preventDefault();
        const form = event.target;

        props.agregarIncidencia(
            form.titulo.value,
            form.usuario.value,
            form.descripcion.value,
            form.categoria.value,
            form.nivel.value,
            form.ubicacion.value
        );
    };

    return (
        <div className="card p-4">
            <h2 className="card-title mb-4 text-center">Registrar incidencia:</h2>
            <form onSubmit={envioFormulario}>
                <div>
                    <label className="mb-3 form-label">Título incidencia</label>
                    <input
                        className="mb-3 form-control"
                        type="text"
                        name="titulo"
                        placeholder="Introduce el título"
                        required
                    />
                    <br />
                </div>

                <div>
                    <label className="mb-3 form-label">Usuario</label>
                    <input
                        className="mb-3 form-control"
                        type="text"
                        name="usuario"
                        required
                    />
                    <br />
                </div>

                <div className="elemento-form">
                    <label>Descripcion: </label>
                    <input type="text" name="descripcion" required />
                </div>

                <div className="elemento-form">
                    <label>Categoria: </label>
                    <select name="categoria" required>
                        <option value="">Seleccionar...</option>
                        <option>Hardware</option>
                        <option>Software</option>
                        <option>Red y conectividad</option>
                        <option>Usuarios y Acceso</option>
                        <option>Infraestructura</option>
                    </select>
                </div>

                <div className="elemento-form">
                    <label>Nivel urgencia: </label>
                    <select name="nivel" required>
                        <option value="">Seleccionar...</option>
                        <option>Alta</option>
                        <option>Media</option>
                        <option>Baja</option>
                    </select>
                </div>

                <div className="elemento-form">
                    <label>Ubicacion: </label>
                    <input type="text" name="ubicacion" required />
                </div>

                <button type="submit" className="btn btn-outline-dark mx-auto d-grid">
                    Registrar
                </button>
            </form>
        </div>
    );
}

export default Form;
