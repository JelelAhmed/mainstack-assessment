export type TransactionType = "deposit" | "withdrawal";

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  date: string;
  metadata?: {
    product_name?: string;
    name?: string;
  };
}
