import { combineReducers } from "redux";
import productosReducer from "./productosReducer";


// Aqui se exportan los diferentes reducer
// cada reducer va a tener su state, por asi decirlo. 
// carda uno tendra su informacion. alguno por ejemplo puede tener su usuario autenticado
export default combineReducers({
    productos: productosReducer
})