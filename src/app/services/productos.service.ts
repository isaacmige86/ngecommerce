import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private products = [
    {id: 1, nombre: "MacBook Pro 2024", descripcion:"el ordenador para sobornar a la profe", colores: ["silver", "grey", "white"]},
    {id: 2, nombre: "Imac de 2017", descripcion:"el modelo de Imac que representa a Apple", colores: "grey"},
    {id: 3, nombre: "Iphone12", descripcion:"No hace falta tener el último Iphone para llamar a tus amigos", colores: ["yellow", "blue", "purple"]}
  ];

  constructor() { }

  getProducts() {
    return this.products;
  }

  createProduct(product: any) {
    this.products.push(product);
  }

  updateProduct(id: number, updatedProduct: any) {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedProduct };
    }
  }

  deleteProduct(id: number) {
    this.products = this.products.filter(product => product.id !== id);
  }
}
