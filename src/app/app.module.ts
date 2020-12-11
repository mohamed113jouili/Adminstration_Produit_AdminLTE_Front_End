import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllClientComponent } from './client/all-client/all-client.component';
import { EditAddClientComponent } from './client/edit-add-client/edit-add-client.component';
import { AllCategoryProductComponent } from './product_category/all-category-product/all-category-product.component';
import { EditAddCategoryProductComponent } from './product_category/edit-add-category-product/edit-add-category-product.component';
import { AllProductComponent } from './product/all-product/all-product.component';
import { EditAddProductComponent } from './product/edit-add-product/edit-add-product.component';
import { AdminComponent } from './admin/admin/admin.component';
import { TestComponent } from './test/test/test.component';
import { Tes2Component } from './test/tes2/tes2.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { HeaderComponent } from './admin/header/header.component';
import { FooterComponent } from './admin/footer/footer.component';
import { HttpErrorInterceptor } from './error_interceptor/httpErrorInterceptor ';



const appRoutes:Routes =
  [
   // { path: '',  redirectTo: '/login', pathMatch: 'full' },

   
   
   // { path: 'login', component: LoginComponent },
     //{ path: 'singup', component: SignupComponent },

     {
      path: 'admin',
    component: AdminComponent,

      children: [

        //{ path: '', redirectTo: 'all-client', pathMatch: 'full' },

        { path: 'dashboard', component: DashboardComponent},

        { path: 'all-client', component: AllClientComponent},
        { path: 'all-client/:id', component: EditAddClientComponent },
        { path: 'add-client', component: EditAddClientComponent } ,

        { path: 'all-product', component: AllProductComponent } ,
        { path: 'all-product/:id', component: EditAddProductComponent },
        { path: 'add-product', component: EditAddProductComponent} ,

        { path: 'all-product-category',component : AllCategoryProductComponent } ,
        { path: 'all-product-category/:id', component: EditAddCategoryProductComponent },
        { path: 'add-product-category', component: EditAddCategoryProductComponent } ,


        { path: '', redirectTo: 'admin', pathMatch: 'full' },

      ]
    }

  ]

@NgModule({
  declarations: [
    AppComponent,
    AllClientComponent,
    EditAddClientComponent,
    AllCategoryProductComponent,
    EditAddCategoryProductComponent,
    AllProductComponent,
    EditAddProductComponent,
    AdminComponent,
    TestComponent,
    Tes2Component,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
  
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule ,
    HttpClientModule
 
  ],
  providers: [ HttpErrorInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },],
  bootstrap: [AppComponent]
})
export class AppModule { }
