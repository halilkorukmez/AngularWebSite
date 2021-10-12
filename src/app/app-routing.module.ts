import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { YarnPageComponent } from './pages/yarn-page/yarn-page.component';
import { ProductCategoriesComponent } from './admin/content/product-categories/product-categories.component';
import { ProductsComponent } from './admin/content/products/products.component';
import { MainPageBigTextComponent } from './admin/content/main-page-big-text/main-page-big-text.component';
import { MainPageSmallTextComponent } from './admin/content/main-page-small-text/main-page-small-text.component';
import { SliderContentComponent } from './admin/content/slider-content/slider-content.component';
import { MainPageSubImagesComponent } from './admin/content/main-page-sub-images/main-page-sub-images.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginGuardGuard } from './guards/login-guard.guard';
import { AboutsComponent } from './admin/content/abouts/abouts.component';
import { UserAddComponent } from './admin/content/user-add/user-add.component';
import { ContactsComponent } from './admin/content/contacts/contacts.component';


const routes: Routes = [
  { path: '', redirectTo: '/mainPage', pathMatch: 'full' },
  { path: 'mainPage', component: MainPageComponent },
  { path: 'yarnPage', component: YarnPageComponent },
  { path: 'productPage', component: ProductPageComponent },
  { path: 'aboutPage', component: AboutPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: "products/:categoryId", component: ProductPageComponent },

  { path: 'adminPage', component: AdminPageComponent, canActivate: [LoginGuardGuard] },
  { path: 'productCategories', component: ProductCategoriesComponent, canActivate: [LoginGuardGuard] },
  { path: 'productsPage', component: ProductsComponent, canActivate: [LoginGuardGuard] },
  { path: 'abouts', component: AboutsComponent, canActivate: [LoginGuardGuard] },
  { path: 'userAdd', component: UserAddComponent, canActivate: [LoginGuardGuard] },
  { path: 'contacts', component: ContactsComponent, canActivate: [LoginGuardGuard] },



  { path: 'mainPageBigText', component: MainPageBigTextComponent, canActivate: [LoginGuardGuard] },
  { path: 'sliderContent', component: SliderContentComponent, canActivate: [LoginGuardGuard] },
  { path: 'subImages', component: MainPageSubImagesComponent, canActivate: [LoginGuardGuard] },
  { path: 'mainPageSmallText', component: MainPageSmallTextComponent, canActivate: [LoginGuardGuard] }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
