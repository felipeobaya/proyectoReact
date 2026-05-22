import MiLista from '../lista/MiLista';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import React, { useState, useEffect } from 'react';
import Form from './Form';
import Login from '../Login/Login.js';
import Fondo from '../../images/fondo.jpg';
import { Routes, Route } from "react-router-dom"; 
import Menu from '../../Menu.js';
import GestionUsuarios from '../GestionUsuarios.js';

function App() {

  const INCIDENCIA_API_URL = 'http://localhost:3004/incidencias';
  const USUARIO_API_URL = 'http://localhost:3004/users';
  const LOGIN_API_URL = 'http://localhost:3004/login';

  const [usuarios, setUsuarios] = useState([]);
  const [incidencias, setIncidencias] = useState([]);
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);

  useEffect(() => {

    const obtenerIncidencias = async () => {
      try {
        let response = await fetch(INCIDENCIA_API_URL);
        if (!response.ok) throw new Error("HTTP Error");
        const data = await response.json();
        setIncidencias(data);
      } catch (e) {
        console.error("Error al cargar incidencias:", e);
      }
    };

    const obtenerUsuarios = async () => {
      try {
        let response = await fetch(USUARIO_API_URL);
        if (!response.ok) throw new Error("HTTP Error");
        const data = await response.json();
        setUsuarios(data);
      } catch (e) {
        console.error("Error al cargar usuarios:", e);
      }
    };

    const sesionGuardada = localStorage.getItem('usuarioLogueado');
    if (sesionGuardada) {
      setUsuarioLogueado(JSON.parse(sesionGuardada));
    }

    obtenerIncidencias();
    obtenerUsuarios();

  }, []);

  const onLogin = async (email, password) => {
    try {
      const respuesta = await fetch(LOGIN_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await respuesta.json();

      if (!respuesta.ok) {
        console.error("Error del servidor:", data);
        alert(`Error ${respuesta.status}: ${data.message || "Email o contraseña incorrectos"}`);
        return;
      }

      const token = data.accessToken || data.token;
      const usuario = data.user || data;

      if (!token) {
        alert("El servidor no devolvió un token válido");
        return;
      }

      setUsuarioLogueado(usuario);
      localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
      localStorage.setItem("token", token);

      const cabeceras = { "Authorization": `Bearer ${token}` };

      const [resInc, resUsu] = await Promise.all([
        fetch(INCIDENCIA_API_URL, { headers: cabeceras }),
        fetch(USUARIO_API_URL, { headers: cabeceras })
      ]);

      if (resInc.ok) setIncidencias(await resInc.json());
      if (resUsu.ok) setUsuarios(await resUsu.json());

    } catch (e) {
      console.error("Error crítico en login:", e);
      alert("Error de conexión con el servidor");
    }
  };

  const onLogout = () => {
    setUsuarioLogueado(null);

    localStorage.removeItem('usuarioLogueado');
    localStorage.removeItem('token');
  };

  const agregarIncidencia = async (
    titulo_nuevo,
    usuario_nuevo,
    descripcion_nuevo,
    categoria_nuevo,
    nivelurgencia_nuevo,
    ubicacion_nuevo
  ) => {
    try {
      const fecha = new Date();
      const fecha_formateada = fecha.toISOString().split("T")[0];

      let usuarioEncontrado = usuarios.find(
        (u) => u.email === usuario_nuevo
      );

      if (usuarioEncontrado) {
        const nuevaIncidencia = {
          usuario: usuarioEncontrado,
          titulo: titulo_nuevo,
          descripcion: descripcion_nuevo,
          categoria: categoria_nuevo,
          nivel_urgencia: nivelurgencia_nuevo,
          fecha_registro: fecha_formateada,
          ubicacion: ubicacion_nuevo,
          estado: "Abierta",
          comentarios: []
        };

        let response = await fetch(INCIDENCIA_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(nuevaIncidencia)
        });

        if (response.ok) {
          let data = await response.json();
          setIncidencias([...incidencias, data]);
        } else {
          throw new Error("Error al crear incidencia");
        }
      } else {
        alert("Usuario no encontrado");
      }

    } catch (e) {
      console.error("Error POST incidencia:", e);
    }
  };

  return (
    <div className='card' style={{ backgroundImage: `url(${Fondo})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", minHeight: "100vh" }}>
      <Header />
      
      {usuarioLogueado === null ? (
        <Login onLogin={onLogin} />
      ) : (
        <div className="container-fluid">
          <div className="row">
            <div className="col-7">
              <button 
                className="btn btn-danger btn-sm mt-2 fw-bold rounded-pill px-3 shadow-sm" 
                onClick={() => {
                  localStorage.removeItem("usuarioLogueado");
                  setUsuarioLogueado(null);
                }}
              >
                Cerrar sesión
              </button>
            </div>
          </div>

          <div className="mt-4">
            <Routes>
              <Route path="/" element={<p className="text-center fw-bold text-muted py-5 fs-4">Pantalla de inicio</p>} />
              <Route path="/Verincidencias" element={<MiLista incidencias={incidencias} />} />
              <Route path="/Registrarincidencias" element={<Form agregarIncidencia={agregarIncidencia} />} />
              <Route path="/Gestionusuarios" element={<GestionUsuarios usuarios={usuarios} />} />
            </Routes>
          </div>

          <Menu usuarioLogueado={usuarioLogueado}></Menu>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default App;