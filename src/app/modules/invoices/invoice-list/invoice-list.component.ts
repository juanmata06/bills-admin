import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { iInvoice } from '../../../logic/interfaces/invoice.interface';
import { InvoiceService } from '../../../logic/services/invoice.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrl: './invoice-list.component.scss'
})
export class InvoiceListComponent implements OnInit {
  /**
  * ------------------------------------------------------------------------------------------------------------------------------
  * General vars for component
  * ------------------------------------------------------------------------------------------------------------------------------
  */
  loading: boolean = false;

  /**
  * ------------------------------------------------------------------------------------------------------------------------------
  * Table vars for component
  * ------------------------------------------------------------------------------------------------------------------------------
  */
  tableDataLoading: boolean = false;
  displayedColumns: string[] = [
    'name',
    'creation_date_time',
    'amount',
    'supply_address',
    'file',
    'actions'
  ];
  dataSource = new MatTableDataSource<iInvoice>([]);
  appliedFilter = '';

  /**
   * -----------------------------------------------------------------------------------------------------------------------------
   * LYFECYCLE METHODS
   * -----------------------------------------------------------------------------------------------------------------------------
   */
  constructor(
    private _invoiceService: InvoiceService
  ) {
    this.loading = true;
    this.getInvoiceList();
  }

  ngOnInit(): void { }

  /**
  * ------------------------------------------------------------------------------------------------------------------------------
  * PRIVATE METHODS
  * ------------------------------------------------------------------------------------------------------------------------------
  */
  public getInvoiceList(): void {
    this.tableDataLoading = true;
    localStorage.setItem(`currentAppliedFilter`, this.appliedFilter);
    this.dataSource = new MatTableDataSource<iInvoice>([]);
    this._invoiceService.getInvoiceList().subscribe({
      next: (response: iInvoice[]) => {
        if (!response)
          return
        this.dataSource = new MatTableDataSource<iInvoice>(
          response
          // .filter((invoice: iInvoice) => {
          //   if (this.appliedFilter === 'first') {
          //     return invoice.is_first_invoice === true;
          //   } else if (this.appliedFilter === 'second') {
          //     return invoice.is_first_invoice === false;
          //   }
          //   return true;
          // })
        );
        this.tableDataLoading = false;
        // localStorage.setItem(`currentInvoices`, JSON.stringify(response));
      }
    });
  }

  /**
  * ------------------------------------------------------------------------------------------------------------------------------
  * PRIVATE VALIDATION AND INTERNAL PROCESS METHODS
  * ------------------------------------------------------------------------------------------------------------------------------
  */

  /**
  * ------------------------------------------------------------------------------------------------------------------------------
  * PUBLIC METHODS
  * ------------------------------------------------------------------------------------------------------------------------------
  */

  /**
  * ------------------------------------------------------------------------------------------------------------------------------
  * PUBLIC VALIDATION AND INTERNAL PROCESS METHODS
  * ------------------------------------------------------------------------------------------------------------------------------
  */
}
