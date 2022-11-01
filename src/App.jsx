import {useState, useEffect} from "react";
import { nanoid } from "nanoid";
import Swal from 'sweetalert2';


function App() {

  const [ tarea, setTarea] = useState('');
  const [ tareas, setTareas] = useState(JSON.parse(localStorage.getItem('tareas')) ?? []); // Nuevo state para crear Tareas
  const [ modoEdicion, setModoEdicion] = useState(false)
  const [ id, setId] = useState('')

  // state 1 - 180
  const agregarTarea = e => {
    e.preventDefault()  // evita procese del form
    if(!tarea.trim()){
      // console.log('Elemento vacío');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes ingresar una Tarea',
        
      })
      return
    }

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Tarea Agregada',
      showConfirmButton: false,
      timer: 1500
    })
    
    // console.log(tarea)

    // Add Tareas 137
    setTareas([
      ...tareas,
      {
        id: nanoid(10), 
        nombreTarea: tarea
      }
     
    ])

    setTarea('') // value={tarea}
    
  }


  // LocalStorage
  useEffect( () => {
    localStorage.setItem('tareas', JSON.stringify(tareas));
  },[tareas])
  

  // Eliminar 143
  const eliminarTarea = id => {
    // console.log(id)
    Swal.fire({
      title: '¿Estás seguro de Eliminar esta Tarea?',
      text: "¡La Acción no se puede Revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Borrar!'
    }).then((result) => {     
      if (result.isConfirmed) {
        const arrayFiltrado = tareas.filter( item => item.id !== id)
        setTareas(arrayFiltrado)
        // console.log(arrayFiltrado)

        Swal.fire(
          'Tarea Eliminada!',
        )
      }
    })  
  }

  // Editar - 150- 165
  const editar = item => {
    // console.log(item)
    setModoEdicion(true)
    setTarea(item.nombreTarea)
    setId(item.id)
    // 171
  
  }

  // Este editarTarea se ejecuta al presionar Editar en el form
  const editarTarea = e => {
    e.preventDefault()  
    if(!tarea.trim()){
      // console.log('Elemento vacío')
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Tarea no encontrada',
        
      })
      return
    }

    const arrayEditado = tareas.map(item => item.id === id ? {id: id, nombreTarea:tarea} : item)
      setTareas(arrayEditado)
      setModoEdicion(false)
      setTarea('')
      setId('')
    
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Cambios Guardados!',
        showConfirmButton: false,
        timer: 1500
      })
    
  }

//   Estructura 
  return (
    <>
    <h1 className="text-center border-bottom p-3">Administrador de Tareas</h1>  
    <div className="container mt-5">
      <div className="row mt-5">
        <div className="col-8">
          <h4 className="text-center">Lista de Tareas</h4>
          <ul className="list-group">
          {
            // Validacion length -> longitud de un string
            tareas.length === 0 ? (
              <p className="border rounded p-2">No hay Tareas</p>
            ) : (

              // Listar Las Tareas key crear listas de elementos
              tareas.map(item => (
                <li className="list-group-item" key={item.id}>
                <span className="lead">{item.nombreTarea}</span> 
                <button 
                  className="btn btn-danger btn-sm float-right mx-2"
                  onClick={ () => eliminarTarea(item.id)}
                >
                  Eliminar
                </button>
  
                <button 
                  className="btn btn-warning btn-sm float-right"
                  onClick={ () => editar(item)}
                >
                  Editar
                </button>
              </li>
              ))
            )

            
          }            

          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {/* mod edicion */}

            {
              modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
            }
          </h4>

          <form onSubmit={modoEdicion ? editarTarea :  agregarTarea}>

            {/* Estado Tarea */}
            <input 
              placeholder="Ingrese Tarea"
              type="text" 
              className="form-control mb-2"
              // onChange={ e => console.log(e.target.value)}
              onChange={ e => setTarea(e.target.value)}
              value={tarea}
            />

            {
              modoEdicion ? (
                <button className="btn btn-warning btn-block" type="submit">Editar</button>
              ) : (
                <button className="btn btn-dark btn-block mt-3" type="submit">Agregar</button>
              )
            }
         
          </form>
        </div>
      </div>
    </div>
    </>
    
  );
}

export default App;
