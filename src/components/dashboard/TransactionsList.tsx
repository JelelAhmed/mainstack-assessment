import { Box, Flex, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { Download, Filter } from "lucide-react";
import TransactionRow from "./TransactionRow";
import { type Transaction } from "../../types";

const DUMMY_TXS: Transaction[] = [
  {
    id: "1",
    amount: 600,
    type: "deposit",
    date: "2022-04-03",
    metadata: { product_name: "Psychology of Money", name: "Roy Cash" },
  },
  {
    id: "2",
    amount: 100,
    type: "deposit",
    date: "2022-04-02",
    metadata: { product_name: "Buy me a coffee", name: "Jonathan Smart" },
  },
  {
    id: "3",
    amount: 100,
    type: "deposit",
    date: "2022-04-02",
    metadata: {
      product_name: "How to build an online brand",
      name: "Dalven U.",
    },
  },
  {
    id: "4",
    amount: 50,
    type: "withdrawal",
    date: "2022-04-01",
    metadata: { product_name: "Refund", name: "Customer" },
  },
];

export default function TransactionsList() {
  return (
    <Box bg="white" borderRadius="12px" p="0" w="100%" overflow="hidden">
      {/* Header */}
      <Flex
        justify="space-between"
        align="center"
        px="24px"
        py="0"
        h="72px"
        borderBottom="1px solid #EFF1F6"
      >
        {/* Left side: title + subtitle */}
        <Box>
          <Heading
            fontFamily="Degular"
            fontWeight="700"
            fontSize="24px"
            lineHeight="32px"
            letterSpacing="-0.6px"
            color="#131316"
            mb="4px"
          >
            24 Transactions
          </Heading>
          <Text
            fontFamily="Degular"
            fontWeight="500"
            fontSize="14px"
            lineHeight="16px"
            letterSpacing="-0.2px"
            color="#56616B"
          >
            Your transactions for the last 7 days
          </Text>
        </Box>

        {/* Right side: action buttons */}
        <Flex gap="12px">
          <Button
            variant="unstyled"
            bg="#EFF1F6"
            borderRadius="100px"
            px="20px"
            py="12px"
            display="flex"
            alignItems="center"
            gap="8px"
            _hover={{ bg: "#E7E9EF" }}
          >
            <Filter size={16} color="#131316" />
            <Text
              fontFamily="Degular"
              fontWeight="600"
              fontSize="16px"
              lineHeight="24px"
              letterSpacing="-0.4px"
              color="#131316"
            >
              Filter
            </Text>
          </Button>

          <Button
            variant="unstyled"
            bg="#EFF1F6"
            borderRadius="100px"
            px="20px"
            py="12px"
            display="flex"
            alignItems="center"
            gap="8px"
            _hover={{ bg: "#E7E9EF" }}
          >
            <Download size={16} color="#131316" />
            <Text
              fontFamily="Degular"
              fontWeight="600"
              fontSize="16px"
              lineHeight="24px"
              letterSpacing="-0.4px"
              color="#131316"
            >
              Export list
            </Text>
          </Button>
        </Flex>
      </Flex>

      {/* Transactions (spaced vertically by 24px) */}
      <VStack pt="24px" pb="24px" px="24px" spacing="24px" align="stretch">
        {DUMMY_TXS.map((tx) => (
          <TransactionRow tx={tx} key={tx.id} />
        ))}
      </VStack>
    </Box>
  );
}
