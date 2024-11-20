//* Angular modules:
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//* My imports:
import { AuthGuard } from './shared/guards/auth.guard';
import { LoginGuard } from './shared/guards/login.guard';
import { LoginComponent } from './modules/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'private-area',
    loadChildren: () => import('./modules/private-area/private-area.module').then(m => m.PrivateAreaModule),
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'private-area', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
