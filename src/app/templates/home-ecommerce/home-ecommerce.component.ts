import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-home-ecommerce',
  templateUrl: './home-ecommerce.component.html',
  styleUrls: ['./home-ecommerce.component.css']
})
export class HomeEcommerceComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = []; 
  searchTerm: string = ''; 

  productToUpdate: any = { id: null, nombre: '', descripcion: '', colores: '' }; 

  showToast: boolean = false; 
  toastMessage: string = ''; 
  productToDelete: any = null; 
  showConfirmDeleteModal: boolean = false; 

  constructor(private productService: ProductosService) {}

  ngOnInit() {
    this.products = this.productService.getProducts();
    this.filteredProducts = this.products; // Inicializamos los productos filtrados
  }

  // Abre el modal para añadir un nuevo producto
  openAddProductModal() {
    this.productToUpdate = { id: null, nombre: '', descripcion: '', colores: '' };
  }

  // Abre el modal para editar un producto existente
  openEditProductModal(product: any) {
    this.productToUpdate = { ...product }; 
  }

  // Método para añadir o actualizar el producto
  saveProduct() {
    if (this.productToUpdate.id === null) {

      this.addProduct();
    } else {

      this.updateProduct();
    }
  }

  addProduct() {
    if (this.productToUpdate.nombre && this.productToUpdate.descripcion) {
      this.productService.createProduct({
        id: this.products.length + 1, //No es la forma mas efectiva de asignar id... pero como no hace uso de una BBDD 
        nombre: this.productToUpdate.nombre,
        descripcion: this.productToUpdate.descripcion,
        colores: this.productToUpdate.colores
      });
      this.products = this.productService.getProducts();
      this.filterProducts(); 
      this.productToUpdate = { id: null, nombre: '', descripcion: '', colores: '' }; 
      this.showToastMessage('Producto añadido exitosamente', 'success');
      // console.log(this.products);
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
      this.filterProducts(); 
      this.productToUpdate = { id: null, nombre: '', descripcion: '', colores: '' };
      this.showToastMessage('Producto actualizado exitosamente', 'success');
    }
  }

  // Abre el modal de confirmación de eliminación
  openConfirmDeleteModal(product: any) {
    // console.log(product);
    this.productToDelete = product; 
    this.showConfirmDeleteModal = true; 
  }

  // Método para eliminar un producto
  deleteProduct() {
    if (this.productToDelete) {
      this.productService.deleteProduct(this.productToDelete.id);
      this.products = this.productService.getProducts(); 
      this.filterProducts(); 
      this.productToDelete = null; 
      this.showConfirmDeleteModal = false;
      this.showToastMessage('Producto eliminado exitosamente', 'danger');
    }
  }

  
  closeConfirmDeleteModal() {
    this.showConfirmDeleteModal = false; 
  }

  // Filtrar productos para mostrarlos 
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

  // Mostrar el toast que recibe por parametros los mensajes de eliminar/editar/añadir
  showToastMessage(message: string, type: string) {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => {
      this.hideToast();
    }, 3000); 
  }


  hideToast() {
    this.showToast = false;
  }
}
