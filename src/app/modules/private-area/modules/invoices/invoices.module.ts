//* Angular modules:
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//* My imports:
import { invoicesRoutes } from './invoices.routing';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  declarations: [
    InvoiceListComponent,
    InvoiceDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(invoicesRoutes),
    SharedModule
  ]
})
export class InvoicesModule { }
