import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { iInvoice } from '../../../logic/interfaces/invoice.interface';

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
  jotason: any = [
    {
      "id": "f3e61497-2a23-4b64-b6b5-795b2a3151e4",
      "name": "Factura de Energía",
      "creation_date_time": "2024-11-17T10:30:00Z",
      "amount": 150.75,
      "supply_address": "Calle Falsa 123, Ciudad Ejemplo",
      "file": null
    },
    {
      "id": "24b36d97-dfae-47bc-a978-3f647b5bb1d4",
      "name": "Factura de Agua",
      "creation_date_time": "2024-11-15T09:15:00Z",
      "amount": 75.50,
      "supply_address": "Avenida Verdadera 456, Ciudad Ejemplo",
      "file": null
    },
    {
      "id": "a8f774e5-8c3f-49f1-b2c8-3e4a5a7d2fa6",
      "name": "Factura de Internet",
      "creation_date_time": "2024-11-10T14:45:00Z",
      "amount": 50.00,
      "supply_address": "Boulevard Ancho 789, Ciudad Ejemplo",
      "file": null
    }
  ];
  tableDataLoading: boolean = false;
  displayedColumns: string[] = [
    'name',
    'creation_date_time',
    'amount',
    'supply_address',
    'file',
    'actions'
  ];
  dataSource = new MatTableDataSource<iInvoice>(this.jotason);
  appliedFilter = '';

  /**
   * -----------------------------------------------------------------------------------------------------------------------------
   * LYFECYCLE METHODS
   * -----------------------------------------------------------------------------------------------------------------------------
   */
  constructor() {
    this.loading = true;
  }

  ngOnInit(): void { }

  /**
  * ------------------------------------------------------------------------------------------------------------------------------
  * PRIVATE METHODS
  * ------------------------------------------------------------------------------------------------------------------------------
  */

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
