import React from "react";
import { Flex, Box, Text, Avatar, HStack } from "@chakra-ui/react";
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
      py={4}
      borderBottom="1px solid"
      borderColor="brand.lightGray"
    >
      <HStack spacing={4} align="center">
        <Avatar
          name={title}
          size="sm"
          bg={isDeposit ? "green.50" : "red.50"}
          color={isDeposit ? "green.700" : "red.700"}
        />
        <Box>
          <Text fontWeight={600}>{title}</Text>
          <Text fontSize="12px" color="brand.textSecondary">
            {subtitle}
          </Text>
        </Box>
      </HStack>

      <Flex align="center" gap={3} justify="flex-end">
        {isDeposit ? (
          <FiArrowDownLeft color="#0EA163" />
        ) : (
          <FiArrowUpRight color="#961100" />
        )}
        <Box textAlign="right">
          <Text fontWeight={700}>{formatCurrencyUSD(tx.amount)}</Text>
          <Text fontSize="12px" color="brand.textSecondary">
            {format(new Date(tx.date), "MMM dd, yyyy")}
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
}
