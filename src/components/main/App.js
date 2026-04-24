import MiLista from '../lista/MiLista';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import React, { useState, useEffect } from 'react';
import Form from './Form';
import Login from '../Login/Login.js';
import Fondo from '../../images/fondo.jpg';

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

    // 🔹 Recuperar sesión guardada
    const sesionGuardada = localStorage.getItem('usuarioLogueado');
    if (sesionGuardada) {
      setUsuarioLogueado(JSON.parse(sesionGuardada));
    }

    obtenerIncidencias();
    obtenerUsuarios();

  }, []);

  const onLogin = async (email, password) => {
    try {
      const response = await fetch(LOGIN_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      if (response.ok) {
        const userData = await response.json();

        setUsuarioLogueado(userData.user);

        localStorage.setItem(
          'usuarioLogueado',
          JSON.stringify(userData.user)
        );

        localStorage.setItem(
          'token',
          userData.accessToken
        );

      } else {
        alert('Email o contraseña incorrectos');
      }

    } catch (e) {
      console.error("Error login:", e);
      alert("Servidor apagado");
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
    <>
      <Header />

      <div
        className="container-fluid mt-4"
        style={{
          backgroundImage: `url(${Fondo})`,
          backgroundSize: "cover",
          minHeight: "100vh"
        }}
      >
        <h2 className='text-center py-3'>Mi Aplicación</h2>

        {!usuarioLogueado ? (
          <div className="row justify-content-center">
            <aside className="col-md-4">
              <Login onLogin={onLogin} />
            </aside>
          </div>
        ) : (
          <div className="row">
            <main className='col-md-7'>
              <div className="d-flex justify-content-between align-items-center mb-3 bg-secondary text-white p-3 rounded-4 shadow-sm">
                <span className="fw-semibold">
                  Bienvenido, <strong>{usuarioLogueado.nombre}</strong>
                </span>
                <button
                  className="btn btn-light btn-sm fw-bold rounded-pill px-3"
                  onClick={onLogout}
                >
                  Cerrar sesión
                </button>
              </div>

              <MiLista incidencias={incidencias} />
            </main>

            <aside className='col-md-5'>
              <Form agregarIncidencia={agregarIncidencia} />
            </aside>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default App;