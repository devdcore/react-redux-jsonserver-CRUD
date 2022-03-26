// sE IMPORTAM LOS TYPES
// Se importan tanto en el action cono en el reducer
import {
    // Se imoprtan desde el archivo types/index.js
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR
} from '../types';


// Cada reducer tiene su propio state
// El state siempore es un objeto
// DEntro definimos lo que contendra el state de productos
const initialState = {
    productos: [],
    error: null,
    loading: false
}

// El reducer siempre es una funcion  
// Se le pasa el state y el action. Si no trae state entonces 
// toma el initialState, tal cual como esta definido aqui.

// el reeucer fue diseñado como un switch
export default function (state = initialState, action) {
    switch (action.type) {

        // Estos 2 Types retornan lo mismo por lo tanto lo ponemos juntos para ahorrar codigo
        case COMENZAR_DESCARGA_PRODUCTOS:
        case AGREGAR_PRODUCTO:
            return {
                ...state,
                loading: action.payload
            }

        case AGREGAR_PRODUCTO_EXITO:
            return {
                ...state,
                loading: false, // False. Ya guardo en la BD
                productos: [...state.productos, action.payload]
            }
            
        case DESCARGA_PRODUCTOS_ERROR:
        case AGREGAR_PRODUCTO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

            case DESCARGA_PRODUCTOS_EXITO:
                return {
                    ...state,
                    loading: false,
                    error: null,
                    productos: action.payload
                }
        default:
            return state;
    }
}