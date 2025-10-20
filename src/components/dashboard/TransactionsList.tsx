// "use client";

// import {
//   Box,
//   Flex,
//   Heading,
//   Text,
//   Button,
//   VStack,
//   useDisclosure,
// } from "@chakra-ui/react";
// import { Download, ChevronDown } from "lucide-react";
// import TransactionRow from "./TransactionRow";
// import FilterDrawer from "./FilterDrawer";
// import { type Transaction } from "../../types";

// const DUMMY_TXS: Transaction[] = [
//   {
//     id: "1",
//     amount: 600,
//     type: "deposit",
//     date: "2022-04-03",
//     metadata: { product_name: "Psychology of Money", name: "Roy Cash" },
//   },
//   {
//     id: "2",
//     amount: 100,
//     type: "deposit",
//     date: "2022-04-02",
//     metadata: { product_name: "Buy me a coffee", name: "Jonathan Smart" },
//   },
//   {
//     id: "3",
//     amount: 100,
//     type: "deposit",
//     date: "2022-04-02",
//     metadata: {
//       product_name: "How to build an online brand",
//       name: "Dalven U.",
//     },
//   },
//   {
//     id: "4",
//     amount: 50,
//     type: "withdrawal",
//     date: "2022-04-01",
//     metadata: { product_name: "Refund", name: "Customer" },
//   },
// ];

// export default function TransactionsList() {
//   // ✅ use Chakra's disclosure to control drawer state
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   return (
//     <Box bg="white" borderRadius="12px" p="0" w="100%" overflow="hidden">
//       {/* Header */}
//       <Flex
//         justify="space-between"
//         align="center"
//         px="24px"
//         py="0"
//         h="72px"
//         borderBottom="1px solid #EFF1F6"
//       >
//         {/* Left side: title + subtitle */}
//         <Box>
//           <Heading
//             fontFamily="Degular"
//             fontWeight="700"
//             fontSize="24px"
//             lineHeight="32px"
//             letterSpacing="-0.6px"
//             color="#131316"
//             mb="4px"
//           >
//             24 Transactions
//           </Heading>
//           <Text
//             fontFamily="Degular"
//             fontWeight="500"
//             fontSize="14px"
//             lineHeight="16px"
//             letterSpacing="-0.2px"
//             color="#56616B"
//           >
//             Your transactions for the last 7 days
//           </Text>
//         </Box>

//         {/* Right side: action buttons */}
//         <Flex gap="12px">
//           {/* ✅ Filter Button — triggers drawer */}
//           <Button
//             variant="unstyled"
//             bg="#EFF1F6"
//             borderRadius="100px"
//             px="20px"
//             py="12px"
//             display="flex"
//             alignItems="center"
//             gap="8px"
//             _hover={{ bg: "#E7E9EF" }}
//             onClick={onOpen} // 👈 opens the drawer
//           >
//             <Text
//               fontFamily="Degular"
//               fontWeight="600"
//               fontSize="16px"
//               lineHeight="24px"
//               letterSpacing="-0.4px"
//               color="#131316"
//             >
//               Filter
//             </Text>
//             <ChevronDown size={16} />
//           </Button>

//           {/* Export Button */}
//           <Button
//             variant="unstyled"
//             bg="#EFF1F6"
//             borderRadius="100px"
//             px="20px"
//             py="12px"
//             display="flex"
//             alignItems="center"
//             gap="8px"
//             _hover={{ bg: "#E7E9EF" }}
//           >
//             <Text
//               fontFamily="Degular"
//               fontWeight="600"
//               fontSize="16px"
//               lineHeight="24px"
//               letterSpacing="-0.4px"
//               color="#131316"
//             >
//               Export list
//             </Text>
//             <Download size={16} color="#131316" />
//           </Button>
//         </Flex>
//       </Flex>

//       {/* Transactions list */}
//       <VStack pt="24px" pb="24px" px="24px" spacing="24px" align="stretch">
//         {DUMMY_TXS.map((tx) => (
//           <TransactionRow tx={tx} key={tx.id} />
//         ))}
//       </VStack>

//       {/* ✅ Drawer Component */}
//       <FilterDrawer isOpen={isOpen} onClose={onClose} />
//     </Box>
//   );
// }

import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { Download, ChevronDown } from "lucide-react";
import TransactionRow from "./TransactionRow";
import FilterDrawer from "./FilterDrawer";
import { type Transaction } from "../../types";
import { useState } from "react";

interface Props {
  transactions: Transaction[];
  currency: string;
}

export default function TransactionsList({ transactions, currency }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filters, setFilters] = useState<any>(null);

  const handleApplyFilters = (newFilters: any) => {
    setFilters(newFilters);
    onClose();
  };

  // Filter transactions locally (for demo)
  const filteredTxs = transactions.filter((tx) => {
    if (filters?.status && tx.status !== filters.status) return false;
    if (filters?.types?.length && !filters.types.includes(tx.type))
      return false;
    return true;
  });

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
            {filteredTxs.length} Transactions
          </Heading>
          <Text
            fontFamily="Degular"
            fontWeight="500"
            fontSize="14px"
            lineHeight="16px"
            letterSpacing="-0.2px"
            color="#56616B"
          >
            {filters
              ? "Showing filtered transactions"
              : "Your transactions for the last 7 days"}
          </Text>
        </Box>

        {/* Buttons */}
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
            onClick={onOpen}
          >
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
            <ChevronDown size={16} />
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
            <Download size={16} color="#131316" />
          </Button>
        </Flex>
      </Flex>

      {/* Transactions list */}
      <VStack pt="24px" pb="24px" px="24px" spacing="24px" align="stretch">
        {filteredTxs.map((tx, i) => (
          <TransactionRow
            tx={tx}
            key={tx.payment_reference || i}
            currency={currency}
          />
        ))}
      </VStack>

      {/* Filter Drawer */}
      <FilterDrawer
        isOpen={isOpen}
        onClose={onClose}
        onApply={handleApplyFilters}
      />
    </Box>
  );
}
