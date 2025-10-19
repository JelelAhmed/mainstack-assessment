import { VStack, HStack, Text } from "@chakra-ui/react";
import { Info } from "lucide-react";
import { formatCurrencyUSD } from "../../utils/formatCurrency";

interface Props {
  label: string;
  value: number;
  showInfo?: boolean;
}

export default function MetricCard({ label, value, showInfo = true }: Props) {
  return (
    <VStack
      align="flex-start"
      spacing="6px"
      p="0"
      w="271px"
      h="auto"
      flex="none"
      order={2}
      flexGrow={0}
    >
      {/* Label + Info aligned horizontally */}
      <HStack w="full" spacing="6px" align="center" justify="space-between">
        <Text
          fontFamily="Degular"
          fontStyle="normal"
          fontWeight="500"
          fontSize="14px"
          lineHeight="16px"
          letterSpacing="-0.2px"
          color="#56616B"
          flex="1"
          whiteSpace="nowrap"
        >
          {label}
        </Text>

        {showInfo && (
          <Info
            size={16}
            color="#888F95"
            strokeWidth={2}
            style={{ cursor: "pointer", marginTop: "1px" }}
          />
        )}
      </HStack>

      {/* Value text (e.g., USD 12,300.00) */}
      <Text
        fontFamily="Degular"
        fontStyle="normal"
        fontWeight="700"
        fontSize="28px"
        lineHeight="38px"
        letterSpacing="-0.6px"
        color="#131316"
      >
        USD {formatCurrencyUSD(value)}
      </Text>
    </VStack>
  );
}
