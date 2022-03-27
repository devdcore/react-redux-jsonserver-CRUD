import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // UseSelector nos ayuda a acceder al state dentro del compomente. Es el hook que nos da Redux para leer lo que tenemos en el state
import { useNavigate } from "react-router-dom";

// Actions de Redux
import { crearNuevoProductoAction } from '../actions/productosActions';

const NuevoProducto = ({history}) => { // History pertenece al react ruter DOM. Redireccionar
    // Variable para navegar
    let navigate = useNavigate();

    // States
    const [nombre, guardarNombre] = useState('');
    const [precio, guardarPrecio] = useState(0);

    // Dispatch nos ayuda a ejecutar las funciones que tengamos en los actions
    const dispatch = useDispatch();

    // Acceder al state del store.
    // Siempre usar UseSelector para acceder al state
    const cargando = useSelector(state => state.productos.loading);
    const error = useSelector(state => state.productos.error);

    // Mandar llamar el action de productoAction
    const agregarProducto = (producto) =>  dispatch( crearNuevoProductoAction(producto) );
    
    // Submit (boton) Agregar nuevo produvto
    const submitNuevoProducto = e => {
        e.preventDefault();

        // Validar Formulario
        if(nombre.trim() === '' || precio <= 0 ){
            return;
        }

        // si no hay errores

        // crear el nuevo producto
        agregarProducto({
            nombre,
            precio
        });

        // Redireccionar Home (Lista de productos)
        navigate('/');

    }

    return (
        <div className='row justify-content-center'>
            <div className='col-md-8'>
                <div className='card'>
                    <div className='card-body'>
                        <h2 className='text-center mb-4 font-weight-bold'>
                            Agregar Nuevo Producto
                        </h2>             

                        <form
                            onSubmit={submitNuevoProducto}
                        >
                            <div className='form-group'>
                                <label>Nombre Producto</label>
                                <input
                                    type="text"
                                    className='form-control'
                                    placeholder='Nombre Producto'
                                    name='nombre'
                                    value={nombre}
                                    onChange={e => guardarNombre(e.target.value)}/>
                            </div>
                            <div className='form-group'>
                                <label>Precio Producto</label>
                                <input
                                    type="number"
                                    className='form-control'
                                    placeholder='Precio Producto'
                                    name='precio'
                                    value={precio}
                                    onChange={e => guardarPrecio( Number(e.target.value) )}/>
                            </div>
                            <button
                                type='submit'
                                className='btn btn-primary font-weight-bold text-uppercase d-block w-100'
                            >
                                Agregar
                            </button>
                        </form>

                        {cargando ? <p>Cargando ...</p> : null}
                        {error ? <p className='alert alert-danger p2 mt-4 text-center'>Hubo un error</p> : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NuevoProducto;
