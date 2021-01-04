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

import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { HeaderComponent } from './admin/header/header.component';
import { FooterComponent } from './admin/footer/footer.component';
import { HttpErrorInterceptor } from './error_interceptor/httpErrorInterceptor ';
import { DialogComponent } from './admin/dialog/dialog.component';
import { DialogService } from './services/dialog.service';
import { PhoneMaskDirective } from './directives/phone-mask.directive_not_use';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';



const appRoutes: Routes =
  [
    // { path: '',  redirectTo: '/login', pathMatch: 'full' },



    // { path: 'login', component: LoginComponent },
    //{ path: 'singup', component: SignupComponent },

    {
      path: 'admin',
      component: AdminComponent,

      children: [


        { path: 'dashboard', component: DashboardComponent },

        { path: 'all-client', component: AllClientComponent },
        { path: 'all-client/:id', component: EditAddClientComponent },
        { path: 'add-client', component: EditAddClientComponent },

        { path: 'all-product', component: AllProductComponent },
        { path: 'all-product/:id', component: EditAddProductComponent },
        { path: 'add-product', component: EditAddProductComponent },

        { path: 'all-product-category', component: AllCategoryProductComponent },
        { path: 'all-product-category/:id', component: EditAddCategoryProductComponent },
        { path: 'add-product-category', component: EditAddCategoryProductComponent },


        { path: '', redirectTo: 'admin', pathMatch: 'full' },

      ]
    }

  ]

@NgModule({

exports:[
  DialogComponent
],

  declarations: [
    AppComponent,
    AllClientComponent,
    EditAddClientComponent,
    AllCategoryProductComponent,
    EditAddCategoryProductComponent,
    AllProductComponent,
    EditAddProductComponent,
    AdminComponent,

    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    DialogComponent,
    PhoneMaskDirective,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxIntlTelInputModule,

  ],
  providers: [
    HttpErrorInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
  
  DialogService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
