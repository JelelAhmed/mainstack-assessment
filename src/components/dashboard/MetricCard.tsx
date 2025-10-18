import { VStack, Text } from "@chakra-ui/react";
import { formatCurrencyUSD } from "../../utils/formatCurrency";

interface Props {
  label: string;
  value: number;
}

export default function MetricCard({ label, value }: Props) {
  return (
    <VStack
      align="flex-start"
      p={4}
      bg="brand.white"
      borderRadius="12px"
      border="1px solid"
      borderColor="brand.lightGray"
      minW="160px"
    >
      <Text fontSize="12px" color="brand.textSecondary">
        {label}
      </Text>
      <Text fontWeight={700} fontSize="16px">
        {formatCurrencyUSD(value)}
      </Text>
    </VStack>
  );
}
