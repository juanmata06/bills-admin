import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { iInvoice } from '../../../../../logic/interfaces/invoice.interface';
import { InvoiceService } from '../../../../../logic/services/invoice.service';

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
  invoicesStats = {
    totalInvoices: 0,
    totalAmount: 0,
    todayInvoices: 0
  };

  /**
  * ------------------------------------------------------------------------------------------------------------------------------
  * Table vars for component
  * ------------------------------------------------------------------------------------------------------------------------------
  */
  tableDataLoading: boolean = false;
  displayedColumns: string[] = [
    'name',
    'creation_date',
    'amount',
    'supply_address',
    'file',
    'actions'
  ];
  dataSource = new MatTableDataSource<iInvoice>([]);

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
    this.dataSource = new MatTableDataSource<iInvoice>([]);
    this._invoiceService.getInvoiceList().subscribe({
      next: (response: iInvoice[]) => {
        if (!response)
          return
        this.invoicesStats = {
          totalInvoices: response.length || 0,
          totalAmount: response.reduce((sum, invoice: iInvoice) => sum + (invoice.amount || 0), 0),
          todayInvoices: response.filter(
            (invoice: iInvoice) => invoice.creation_date === new Date().toISOString().split("T")[0]
          )?.length || 0
        };
        this.dataSource = new MatTableDataSource<iInvoice>(response);
        this.tableDataLoading = false;
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
