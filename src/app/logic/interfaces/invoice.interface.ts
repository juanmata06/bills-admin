export interface iInvoice {
  id?: string;
  name?: string;
  creation_date_time?: string;
  amount?: number;
  supply_address?: string;
  file?: File;
}