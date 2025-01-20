import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-home-ecommerce',
  templateUrl: './home-ecommerce.component.html',
  styleUrls: ['./home-ecommerce.component.css']
})
export class HomeEcommerceComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = []; // Lista de productos filtrados
  searchTerm: string = ''; // Texto de búsqueda

  productToUpdate: any = { id: null, nombre: '', descripcion: '', colores: '' }; // Para añadir o editar productos

  showToast: boolean = false; // Controla la visibilidad del toast
  toastMessage: string = ''; // El mensaje del toast

  constructor(private productService: ProductosService) {}

  ngOnInit() {
    this.products = this.productService.getProducts();
    this.filteredProducts = this.products; // Inicializamos los productos filtrados
  }

  // Abre el modal para añadir un nuevo producto (establece los campos vacíos)
  openAddProductModal() {
    this.productToUpdate = { id: null, nombre: '', descripcion: '', colores: '' };
  }

  // Abre el modal para editar un producto existente
  openEditProductModal(product: any) {
    this.productToUpdate = { ...product }; // Carga los datos del producto en el modal
  }

  // Método para añadir o actualizar el producto
  saveProduct() {
    if (this.productToUpdate.id === null) {
      // Añadir producto
      this.addProduct();
    } else {
      // Editar producto
      this.updateProduct();
    }
  }

  addProduct() {
    if (this.productToUpdate.nombre && this.productToUpdate.descripcion) {
      this.productService.createProduct({
        id: new Date().getTime(), // Asigna un id único
        nombre: this.productToUpdate.nombre,
        descripcion: this.productToUpdate.descripcion,
        colores: this.productToUpdate.colores
      });
      this.products = this.productService.getProducts();
      this.filterProducts(); // Filtra los productos tras añadir uno nuevo
      this.productToUpdate = { id: null, nombre: '', descripcion: '', colores: '' }; // Resetea el formulario
      this.showToastMessage('Producto añadido exitosamente', 'success');
    }
  }

  updateProduct() {
    if (this.productToUpdate.id !== null) {
      this.productService.updateProduct(this.productToUpdate.id, {
        nombre: this.productToUpdate.nombre,
        descripcion: this.productToUpdate.descripcion,
        colores: this.productToUpdate.colores
      });
      this.products = this.productService.getProducts();
      this.filterProducts(); // Filtra los productos tras actualizar uno
      this.productToUpdate = { id: null, nombre: '', descripcion: '', colores: '' }; // Resetea el formulario
      this.showToastMessage('Producto actualizado exitosamente', 'success');
    }
  }

  // Método para eliminar un producto
  deleteProduct(productId: number) {
    this.productService.deleteProduct(productId);
    this.products = this.productService.getProducts(); // Refresca la lista de productos
    this.filterProducts(); // Filtra los productos tras eliminar uno
    this.showToastMessage('Producto eliminado exitosamente', 'danger');
  }

  // Filtra los productos según el texto de búsqueda
  filterProducts() {
    if (this.searchTerm) {
      this.filteredProducts = this.products.filter(product =>
        product.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.descripcion.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (Array.isArray(product.colores) ? product.colores.join(' ').toLowerCase().includes(this.searchTerm.toLowerCase()) : product.colores.toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
    } else {
      this.filteredProducts = this.products;
    }
  }

  // Muestra el toast con el mensaje correspondiente
  showToastMessage(message: string, type: string) {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => {
      this.hideToast();
    }, 3000); // El toast se oculta después de 3 segundos
  }

  // Oculta el toast
  hideToast() {
    this.showToast = false;
  }
}
