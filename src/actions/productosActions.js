import {
    // Se imoprtan desde el archivo types/index.js
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR
} from '../types';

import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

// Funciones que modifican el state
// funcion que se va a utilizar en la vista
// por ejemplo: crear producto
// Consulta a Base de Datos a traves de API

// Los datos de los componentes se pasan a las acciones

// Crear nuevo productos
export function crearNuevoProductoAction(producto) {
    return async (dispatch) => {
        // se manda a ejecutar el reducer para modificar el state
        dispatch(agregarProducto(producto));

        // API (Base de datos) 
        try {
            // Insertar producto en la API . Inserta en la Base de Datos
            // Esto se le pasa a la API
            await clienteAxios.post('/productos', producto);

            // Esto se le pasa al state
            // Si todo sale bien, actualizar el state
            dispatch(agregarProductoExito(producto));
            // Alerta
            Swal.fire(
                'Correcto',
                'El producto se agregó correctamente',
                'success'
            );
        } catch (error) {          
            // Si hay un error, cambiar el state
            dispatch(agregarProductoError(true));

            // Alerta
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            });
        }
    }
}

const agregarProducto = (producto) => ({
    type: AGREGAR_PRODUCTO,
    // payload:     // PAyload, es la parte que va a modificar los datos. El que va a modificar el state. NO lo vamos a usar (No es obligatorio)
    payload: true //Lo colocamos de prueba. LO TOMA EL REDUCER
});

// Si el producto se agrega en el Base de Datos
const agregarProductoExito = (producto) => ({  // lo que esta aqui dentro. este objeto se conoce como el Action 
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
});

// Si hubo un error
const agregarProductoError = (estado) => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
});



// #############################################
// #############################################
// Tambien se puede crear esta parte creando otro Function
// Function que descarga los productos de la BD
export function obtenerProdutosAction() {  // Peticion get
    return async (dispatch) => {
        dispatch( descargarProductos() );

        try {
            const respuesta = await clienteAxios.get('/productos');
            dispatch( descargaProductosExitosa(respuesta.data) );
        } catch (error) {
            dispatch( descargaProductosError() );
        }
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true //Para que actualice a true minetras se realiza la descarga de los productos
});

const descargaProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos 
});

const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
});