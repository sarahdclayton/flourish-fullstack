import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },

  {
    path: "signup",
    component: SignupComponent
  },

  {
    path: "home",
    component: HomeComponent
  },

  {
    path: "admin",
    loadChildren: () =>
    import("./admin/admin.module").then((m) => m.AdminModule),
  },

  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },

  {
    path: "**",
    redirectTo: "login"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
