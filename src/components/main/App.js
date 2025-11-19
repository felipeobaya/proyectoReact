import MiLista from '../lista/MiLista';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import React, { useState } from 'react';
import Form from './Form';
import Fondo from '../../images/fondo.jpg'

function App() {

  const [incidencias, setIncidencias] = useState([
    {
      id_incidencias: 1,
      id_usuario: "felipeobaya",
      titulo: "Proyecto averia",
      descripcion: "Proyecto averiado en el aula 2",
      categoria: "Hardware",
      nivel_urgencia: "Media",
      fecha_registro: "2025-10-20",
      estado: "Abierto",
      ubicacion: "B205"
    },
    {
      id_incidencias: 2,
      id_usuario: "felipeobaya",
      titulo: "Proyecto averia",
      descripcion: "Ordenador no enciende",
      categoria: "Hardware",
      nivel_urgencia: "Baja",
      fecha_registro: "2025-10-20",
      estado: "Abierto",
      ubicacion: "B205"
    },
  ]);

  const agregarIncidencia = (
      titulo_nuevo,
      id_usuario_nuevo,
      descripcion_nuevo,
      categoria_nuevo,
      nivel_urgencia_nuevo,
      ubicacion_nuevo
    ) => {

    const fecha = new Date();
    const fecha_formateada = `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()}`;

    const nueva_incidencia = {
      id_incidencias: incidencias.length + 1,
      id_usuario: id_usuario_nuevo,
      titulo: titulo_nuevo,
      descripcion: descripcion_nuevo,
      categoria: categoria_nuevo,
      nivel_urgencia: nivel_urgencia_nuevo,
      fecha_registro: fecha_formateada,
      estado: "Abierta",
      ubicacion: ubicacion_nuevo
    };

    console.log("Nueva incidencia", nueva_incidencia);

  
    setIncidencias([...incidencias, nueva_incidencia]);
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
