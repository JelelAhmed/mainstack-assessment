import { Box, Flex, Heading, Button } from "@chakra-ui/react";
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
    <Box
      bg="brand.white"
      borderRadius="12px"
      border="1px solid"
      borderColor="brand.lightGray"
      p={6}
    >
      <Flex justify="space-between" align="center" mb={4}>
        <Box>
          <Heading size="sm" mb={1}>
            24 Transactions
          </Heading>
          <Box fontSize="12px" color="brand.textSecondary">
            Your transactions for the last 7 days
          </Box>
        </Box>

        <Flex gap={3}>
          <Button variant="outline" borderRadius="100px">
            Filter
          </Button>
          <Button variant="outline" borderRadius="100px">
            Export list
          </Button>
        </Flex>
      </Flex>

      <Box>
        {DUMMY_TXS.map((tx) => (
          <TransactionRow tx={tx} key={tx.id} />
        ))}
      </Box>
    </Box>
  );
}
