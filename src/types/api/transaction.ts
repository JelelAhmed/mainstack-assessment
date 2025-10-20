export interface Transaction {
  id: string;
  type: string;
  amount: number;
  date: string;

  status?: string;
  metadata?: {
    product_name?: string;
    name?: string;
  };
  payment_reference?: string;
}
