import { Link } from "react-router-dom";

function Menu(props) {
    return (
        <div className="mt-3 text-center">
            <nav>
                <div><Link to="/">Inicio</Link></div>
                <div><Link to="/Verincidencias">Ver incidencias</Link></div>
                <div><Link to="/Registrarincidencias">Registrar incidencias</Link></div>
                
                {props.usuarioLogueado && props.usuarioLogueado.rol.nombre_rol === "admin" ? (
                    <div><Link to="/Gestionusuarios">Gestión usuarios</Link></div>
                ) : null}
            </nav>
        </div>
    );
}

export default Menu;