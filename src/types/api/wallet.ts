export interface Wallet {
  balance: number;
  currency: string;

  ledger_balance?: number;
  total_payout?: number;
  total_revenue?: number;
  pending_payout?: number;
}
