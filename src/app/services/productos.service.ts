import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';
import { resolve } from '../../../node_modules/@types/q';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto [] = [];

  constructor(private http: HttpClient ) {
    this.cargarProductos();
  }

  private cargarProductos() {

    return new Promise(  ( resolve, reject ) => {
      this.http.get('https://angular-html-a9122.firebaseio.com/productos_idx.json')
          .subscribe( (resp: Producto[]) => {
            this.productos = resp;
            this.cargando = false;
            // para indicar que la promesa se resolvio exitosamente
            resolve();
          });
    });

  }

getProducto(id: string) {
  // devuelve el link
  return this.http.get(`https://angular-html-a9122.firebaseio.com/productos/${id}.json`);

}

buscarProducto( termino: string) {

  if (this.productos.length === 0 ) {
    // cargar productos
    this.cargarProductos().then( () => {
      // depues de tener los productos
      // aplicar filtro
      this.filtrarProductos( termino );
    });
  } else {
    // aplicar el filtro
    this.filtrarProductos( termino );
  }

}

private filtrarProductos( termino: string ) {

  // console.log(this.productos);
  /* purgar busqueda (muestra solo ultima respuesta
     de busqueda sin adicionar anteriores) */
  this.productosFiltrado = [];
  /* convertir a minusculas para que la busqueda
     no sea key sensitive*/
  termino = termino.toLocaleLowerCase();

  this.productos.forEach( prod => {
    // convierte titulo  de prod. a minusculas
    const tituloLower = prod.titulo.toLocaleLowerCase();
    /* pregunta: termino de busqueda coinside o
       esta contenido en categoria? */
    if ( prod.categoria.indexOf( termino ) >= 0 ||
    /* para que la busqueda sea por titulo tambien */
         tituloLower.indexOf( termino ) >= 0) {
      // agrega el termino al arreglo de productos filtrados
      this.productosFiltrado.push( prod );
    }

  });

}

}
