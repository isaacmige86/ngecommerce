import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeEcommerceComponent } from './templates/home-ecommerce/home-ecommerce.component';
import { ProductosService } from './services/productos.service';
import { HeaderComponent } from './components/header/header.component';

const routes: Routes = [
  { path: '', redirectTo: '/home-ecommerce', pathMatch: 'full' },
  { path: 'home-ecommerce', component: HomeEcommerceComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeEcommerceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ProductosService],
  bootstrap: [AppComponent]
})
export class AppModule {}
