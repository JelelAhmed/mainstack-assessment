import { Text, Button, VStack } from "@chakra-ui/react";
import { formatCurrencyUSD } from "../../utils/formatCurrency";

interface Props {
  balance: number;
}

export default function BalanceDisplay({ balance }: Props) {
  return (
    <VStack align="flex-start" spacing={3} minW={{ base: "100%", md: "360px" }}>
      <Text fontSize="12px" color="brand.textSecondary">
        Available Balance
      </Text>
      <Text fontSize={{ base: "24px", md: "28px" }} fontWeight={800}>
        {formatCurrencyUSD(balance)}
      </Text>

      <Button
        bg="brand.textPrimary"
        color="white"
        _hover={{ opacity: 0.92 }}
        borderRadius="100px"
        px={6}
      >
        Withdraw
      </Button>
    </VStack>
  );
}
