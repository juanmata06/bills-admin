import { Route } from '@angular/router';
import { MyProfileComponent } from './modules/my-profile/my-profile.component';
import { PrivateAreaComponent } from './private-area.component';

export const privateAreaRoutes: Route[] = [
  {
    path: '',
    component: PrivateAreaComponent,
    children: [
      { path: 'my-profile', component: MyProfileComponent },
      {
        path: 'invoices',
        loadChildren: () => import('./modules/invoices/invoices.module').then((m) => m.InvoicesModule),
      },
      { path: '**', redirectTo: 'my-profile', pathMatch: 'full' },
    ],
  },
];