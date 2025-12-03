import MiLista from '../lista/MiLista';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import React, { useState, useEffect } from 'react';
import Form from './Form';
import Fondo from '../../images/fondo.jpg'

function App() {

  //Definir la URL de la API para las incidencias (si JSON se ejecuta en el puerto 3004)
  const INCIDENCIA_API_URL = 'http://localhost:3004/incidencias';
  //Definir la URL de la API para los usuarios (si JSON se ejecuta en el puerto 3004)
  const USUARIO_API_URL = 'http://localhost:3004/users';

  const [usuarios, setUsuarios] = useState([]);
  const [incidencias, setIncidencias] = useState([]);
  //Hook para cargar incidencias y usuarios. Se ejecuta una vez en el renderizado inicial
  useEffect(()=>{

      const obtenerIncidencias = async () => {
          try{
              let response = await fetch(INCIDENCIA_API_URL);
              if(!response.ok){
                  throw new Error("HTTP Error");
              }
              const data = await response.json();
              console.log(data);
              setIncidencias(data);
          } catch(e){
              console.error("Error al cargar las incidencias:", e);
          }
      }

      const obtenerUsuarios = async () => {
          try{
              let response = await fetch(USUARIO_API_URL);
              if(!response.ok){
                  throw new Error("HTTP Error");
              }
              const data = await response.json();
              console.log(data);
              setUsuarios(data);
          } catch(e){
              console.error("Error al cargar las incidencias:", e);
          }
      }

      obtenerIncidencias();
      obtenerUsuarios();

  },[]);


 const agregarIncidencia = async (titulo_nuevo, usuario_nuevo, descripcion_nuevo, categoria_nuevo, nivelurgencia_nuevo, ubicacion_nuevo) => {
    try {
        const fecha = new Date();
        const year = fecha.getFullYear();
        const month = String(fecha.getMonth() + 1).padStart(2, '0');
        const day = String(fecha.getDate()).padStart(2, '0');
        const fecha_formateada = year + "-" + month + "-" + day;

        let usuarioEncontrado = usuarios.find((u) => u.email === usuario_nuevo);
        if(usuarioEncontrado){
            const nuevaIncidencia = {
                usuario: usuarioEncontrado,
                titulo: titulo_nuevo,
                descripcion: descripcion_nuevo,
                categoria: categoria_nuevo,
                nivel_urgencia: nivelurgencia_nuevo,
                fecha_registro: fecha_formateada, // Cambiar por fecha formateada (new Date()).toISOString()
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
            if(response.ok){
                // throw new Error("Fallo de la petición POST. Estado HTTP: ${response.status}");
                let data = await response.json();
                console.log("Nueva Incidencia: ", data);
                setIncidencias([...incidencias, data]);
            }else{
                alert("No se puede crear incidencia. Usuario no encontrado");
                throw new Error("Error al crear incidencia. Usuario no encontrado");
            }
        }
    } catch(e) {
        console.error("Falló la petición POST de la incidencia", e.message);
    }
   
  };

  return (
    <>
      <Header />
      <h2 className='mb-4 text-center'>Mi Aplicación</h2>
      <div className="container-fluid mt-4 row" style={{backgroundImage: `url(${Fondo})`, 
      backgroundSize: "cover", backgroundRepeat: "no-repeat"}}>
        <main className='col-md-6'>
          <p>Este es mi contenido de la App</p>
          <MiLista incidencias={incidencias} />
        </main>
        <aside className='col-md-6'>
          <Form agregarIncidencia={agregarIncidencia} />
        </aside>
      </div>
      <Footer />
    </>
  );
}

export default App;
