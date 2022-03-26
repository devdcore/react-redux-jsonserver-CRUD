import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { obtenerProdutosAction } from "../actions/productosActions";
import Producto from "./Producto";


const Productos = () => {
    // Declara variable dispatch
    const dispatch = useDispatch();

    // UseEffect para que descargue la lista de productos en lo que cargue el componente la primera vez
    useEffect(() => {
       const cargarProductos = () => dispatch( obtenerProdutosAction() );
        cargarProductos();
    }, []);  //[] dependencia vacia

    // Obtener el State. Use Selector para acceder al state
    const productos = useSelector(state => state.productos.productos);
    console.log(productos);


  return (
      <Fragment>
           <h2 className='text-center my-5'>Listado de productos</h2>

           <table className='table table-striped'>
               <thead className='bg-primary table-dark'>
                   <tr>
                       <th scope='col'>Nombre</th>
                       <th scope='col'>Precio</th>
                       <th scope='col'>Acciones</th>
                   </tr>
               </thead>
                <tbody>
                    { productos.length === 0 ? 'No hay productos' : (
                        productos.map(producto => (
                            <Producto
                            key={producto.id}      
                            producto={producto}                
                            />
                        ))
                    )}
                    </tbody>

           </table>


      </Fragment>
  );
};

export default Productos;
