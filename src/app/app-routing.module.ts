import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { MyProfileComponent } from './modules/my-profile/my-profile.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'invoices',
    loadChildren: () => import('./modules/invoices/invoices.module').then(m => m.InvoicesModule),
  },
  {
    path: 'my-profile',
    component: MyProfileComponent,
  },
  { path: '**', redirectTo: 'invoices', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
