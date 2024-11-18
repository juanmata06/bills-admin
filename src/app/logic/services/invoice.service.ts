import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, of, throwError } from "rxjs";
import { v4 as uuidv4 } from 'uuid'
import { iInvoice } from "../interfaces/invoice.interface";

@Injectable({
  providedIn: "root"
})
export class InvoiceService {

  constructor(private _http: HttpClient) { }

  getInvoiceList(): Observable<iInvoice[]> {
    const currentInvoices = localStorage.getItem('currentInvoices');
    return currentInvoices ? of(JSON.parse(currentInvoices)) : this._http.get<iInvoice>('assets/data/invoice-list.json');
  }

  getInvoiceById(id: string): Observable<iInvoice> {
    const currentInvoices = this.getInvoiceList();
    return currentInvoices.pipe(map((invoices: iInvoice[]) => {
      const invoice = invoices.find((item: iInvoice) => item.id === id);
      if (!invoice) {
        throw new Error(`Invoice with id ${id} not found`);
      }      
      return invoice;
    }));
  }

  postInvoice(data: iInvoice): Observable<iInvoice> {
    data['id'] = uuidv4()
    return this.getInvoiceList().pipe(
      map((invoices: iInvoice[]) => {
        invoices.push(data);
        localStorage.setItem('currentInvoices', JSON.stringify(invoices));
        return data;
      }),
      catchError((error) => {
        return throwError(() => new Error('Error saving new invoice'));
      })
    );
  }

  updateInvoice(data: iInvoice): Observable<iInvoice> {
    return this.getInvoiceList().pipe(
      map((invoices: iInvoice[]) => {
        const index = invoices.findIndex((item: iInvoice) => item.id === data.id);        
        if (index >= 0) {
          invoices[index] = data;
          localStorage.setItem('currentInvoices', JSON.stringify(invoices));
          return data;
        } else {
          throw new Error();
        }
      }),
      catchError((error) => {
        return throwError(() => new Error('Error updating invoice'));
      })
    );
  }
}
