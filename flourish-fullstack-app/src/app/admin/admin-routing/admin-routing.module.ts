import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from "@angular/router";
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  {
    path: "dashboard",
    component: AdminDashboardComponent
  },

  {
    path: "**",
    pathMatch: "full",
    redirectTo: ""
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
