import { VStack } from "@chakra-ui/react";
import MetricCard from "../common/MetricCard";

export default function MetricsContainer() {
  return (
    <VStack
      align="flex-start"
      spacing="32px"
      w="271px"
      // h="360px"
      flexShrink={0}
    >
      <MetricCard label="Ledger Balance" value={82000} />
      <MetricCard label="Total Payout" value={45000} />
      <MetricCard label="Total Revenue" value={120000} />
      <MetricCard label="Pending Payout" value={30000} />
    </VStack>
  );
}
