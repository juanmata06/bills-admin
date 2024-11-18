import { Route } from '@angular/router';

import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';

export const invoicesRoutes: Route[] = [
  { path: '', component: InvoiceListComponent },
  { path: 'create', component: InvoiceDetailComponent },
  { path: ':id', component: InvoiceDetailComponent },
  { path: '**', redirectTo: '' },
];