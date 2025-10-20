import { VStack } from "@chakra-ui/react";
import MetricCard from "../common/MetricCard";

interface Props {
  wallet: {
    ledger_balance: number;
    total_payout: number;
    total_revenue: number;
    pending_payout: number;
  };
}

export default function MetricsContainer({ wallet }: Props) {
  return (
    <VStack align="flex-start" spacing="32px" w="271px" flexShrink={0}>
      <MetricCard label="Ledger Balance" value={wallet.ledger_balance} />
      <MetricCard label="Total Payout" value={wallet.total_payout} />
      <MetricCard label="Total Revenue" value={wallet.total_revenue} />
      <MetricCard label="Pending Payout" value={wallet.pending_payout} />
    </VStack>
  );
}
