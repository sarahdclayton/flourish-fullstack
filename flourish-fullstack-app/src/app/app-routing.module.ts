import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

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
    path: "blogs/:id",
    component: BlogDetailComponent
  },

  {
    path: "profile/:username",
    component: ProfileComponent
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
