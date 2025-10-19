import { Flex, Text, Center } from "@chakra-ui/react";
import { format } from "date-fns";
import { type Transaction } from "../../types";
import { formatCurrencyUSD } from "../../utils/formatCurrency";
import { FiArrowDownLeft, FiArrowUpRight } from "react-icons/fi";

interface Props {
  tx: Transaction;
}

export default function TransactionRow({ tx }: Props) {
  const isDeposit = tx.type === "deposit";
  const title = tx.metadata?.product_name ?? "Transaction";
  const subtitle = tx.metadata?.name ?? "";

  return (
    <Flex
      align="center"
      justify="space-between"
      w="full"
      h="49px"
      py="12px"
      px="0"
      bg="transparent"
    >
      {/* Left side */}
      <Flex align="center" gap="16px">
        {/* Circular icon container */}
        <Center
          w="40px"
          h="40px"
          borderRadius="full"
          bg={isDeposit ? "#E3FCF2" : "#FDECEC"}
        >
          {isDeposit ? (
            <FiArrowDownLeft size={18} color="#075132" />
          ) : (
            <FiArrowUpRight size={18} color="#961100" />
          )}
        </Center>

        {/* Text block */}
        <Flex direction="column" justify="center" gap="4px">
          <Text
            fontFamily="Degular"
            fontWeight="500"
            fontSize="16px"
            lineHeight="24px"
            letterSpacing="-0.2px"
            color="#131316"
          >
            {title}
          </Text>

          <Text
            fontFamily="Degular"
            fontWeight="500"
            fontSize="14px"
            lineHeight="16px"
            letterSpacing="-0.2px"
            color="#56616B"
          >
            {subtitle}
          </Text>
        </Flex>
      </Flex>

      {/* Right side */}
      <Flex direction="column" align="flex-end" gap="4px" minW="72px">
        <Text
          fontFamily="Degular"
          fontWeight="700"
          fontSize="16px"
          lineHeight="24px"
          letterSpacing="-0.4px"
          color="#131316"
        >
          USD {formatCurrencyUSD(tx.amount)}
        </Text>

        <Text
          fontFamily="Degular"
          fontWeight="500"
          fontSize="14px"
          lineHeight="16px"
          letterSpacing="-0.2px"
          color="#56616B"
        >
          {format(new Date(tx.date), "MMM dd, yyyy")}
        </Text>
      </Flex>
    </Flex>
  );
}
