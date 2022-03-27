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
    const error = useSelector(state => state.productos.error);
    const loading = useSelector(state => state.productos.loading);

  return (
      <Fragment>
          {/* Titulo */}
           <h2 className='text-center my-5'>Listado de productos</h2>
           {/* Error */}
           {error ? <p className='font-weight-bold alert alert-danger text-center mt-4'>Hubo un error</p> : null}
            {/* Loading */}
            {loading ? <p className='text-center'>Cargando...</p> : null}

            {/* Grid */}
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
