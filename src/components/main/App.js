import './App.css';
import MiLista from '../lista/MiLista';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import React from 'react';
import Form from './Form';

class App extends React.Component {

  state = {
    incidencias:
        [
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
    ]
  }

  agregarIncidencia = (titulo_nuevo,id_usuario_nuevo,descripcion_nuevo,categoria_nuevo,nivel_urgencia_nuevo,
                        ubicacion_nuevo)=>{
                          const fecha = new Date();
                          const year = fecha.getFullYear();
                          const mes = fecha.getMonth()+1;
                          const dia = fecha.getDate();
                          const fecha_formateada = year + "-" + mes + "-" + dia;
                          const nueva_incidencia={
                            id_incidencias: this.state.incidencias.length +1, 
                            id_usuario: id_usuario_nuevo,
                            titulo: titulo_nuevo,

                            descripcion: descripcion_nuevo,
                            categoria: categoria_nuevo,
                            nivel_urgencia: nivel_urgencia_nuevo,
                            fecha_registro: fecha_formateada,
                            estado: "Abierta",
                            ubicacion: ubicacion_nuevo
                          }
                          console.log("Nueva incidencia", nueva_incidencia);
                          this.setState({incidencias:[...this.state.incidencias, nueva_incidencia]})
  }
  render(){
  return (
    <>
        <Header/>
          <h2>Mi Aplicación</h2>
      <div className="App">
        <main>
              <p>Este es mi contenido de la App</p>
              <MiLista incidencias={this.state.incidencias}/>
        </main>
        <aside>
          <Form agregarIncidencia={this.agregarIncidencia}/>
        </aside>
      </div>
        <Footer/>
    </>
  );
  }
}

export default App;


