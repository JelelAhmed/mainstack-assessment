import { Box, Text, Button, Flex } from "@chakra-ui/react";
import { formatCurrency } from "../../utils/formatCurrency";

interface Props {
  balance: number;
  currency: string;
}

export default function BalanceDisplay({ balance, currency }: Props) {
  return (
    <Flex
      direction="row"
      align="center"
      gap="64px"
      width="462px"
      height="72px"
      position="relative"
    >
      {/* Left Section */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        gap="8px"
        width="231px"
        height="72px"
      >
        <Text
          fontFamily="Degular, sans-serif"
          fontWeight="500"
          fontSize="14px"
          lineHeight="16px"
          letterSpacing="-0.2px"
          color="#56616B"
        >
          Available Balance
        </Text>

        <Text
          fontFamily="Degular, sans-serif"
          fontWeight="700"
          fontSize="36px"
          lineHeight="48px"
          letterSpacing="-1.5px"
          color="#131316"
        >
          {formatCurrency(balance, currency)}
        </Text>
      </Box>

      {/* Right Section - Withdraw Button */}
      <Button
        width="167px"
        height="52px"
        bg="#131316"
        borderRadius="100px"
        color="#FFFFFF"
        fontFamily="Degular, sans-serif"
        fontWeight="600"
        fontSize="16px"
        lineHeight="24px"
        letterSpacing="-0.4px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        px="28px"
        py="14px"
        _hover={{ opacity: 0.9, bg: "#131316" }}
        _active={{ opacity: 0.95, transform: "none" }}
      >
        Withdraw
      </Button>
    </Flex>
  );
}
