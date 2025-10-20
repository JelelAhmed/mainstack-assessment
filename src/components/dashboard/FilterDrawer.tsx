// import {
//   Box,
//   Flex,
//   Text,
//   Button,
//   chakra,
//   shouldForwardProp,
// } from "@chakra-ui/react";
// import { motion, isValidMotionProp } from "framer-motion";
// import { X, Check } from "lucide-react";
// import { useState, useEffect, useRef } from "react";

// interface FilterDrawerProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const MotionBox = chakra(motion.div, {
//   shouldForwardProp: (prop) =>
//     isValidMotionProp(prop) || shouldForwardProp(prop),
// });

// const DATE_FILTERS = [
//   "Today",
//   "Last 7 days",
//   "This month",
//   "Last 3 months",
//   "This year",
//   "Last year",
//   "All time",
// ];

// const TRANSACTION_TYPES = [
//   "Store Transactions",
//   "Get Tipped",
//   "Withdrawals",
//   "Chargebacks",
//   "Cashbacks",
// ];

// const TRANSACTION_STATUSES = ["Successful", "Pending", "Failed"];

// export default function FilterDrawer({ isOpen, onClose }: FilterDrawerProps) {
//   const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
//   const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
//   const [selectedDateFilter, setSelectedDateFilter] = useState(DATE_FILTERS[0]);
//   const [openTypeDropdown, setOpenTypeDropdown] = useState(false);
//   const [openStatusDropdown, setOpenStatusDropdown] = useState(false);
//   const [startDate, setStartDate] = useState("2023-07-17");
//   const [endDate, setEndDate] = useState("2023-08-17");

//   const typeRef = useRef<HTMLDivElement>(null);
//   const statusRef = useRef<HTMLDivElement>(null);

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (typeRef.current && !typeRef.current.contains(event.target as Node))
//         setOpenTypeDropdown(false);
//       if (
//         statusRef.current &&
//         !statusRef.current.contains(event.target as Node)
//       )
//         setOpenStatusDropdown(false);
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const toggleType = (type: string) => {
//     setSelectedTypes((prev) =>
//       prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
//     );
//   };

//   const renderSelectableItem = (
//     item: string,
//     selected: boolean,
//     onClick: () => void
//   ) => (
//     <Flex
//       key={item}
//       align="center"
//       px="14px"
//       py="12px"
//       gap="10px"
//       w="100%"
//       borderRadius="10px"
//       bg="#FFFFFF"
//       cursor="pointer"
//       onClick={onClick}
//       _hover={{ bg: "#F4F4F4" }}
//     >
//       <Box
//         w="20px"
//         h="20px"
//         border="1px solid #D9D9D9"
//         bg={selected ? "#1C1B1F" : "#FFFFFF"}
//         display="flex"
//         alignItems="center"
//         justifyContent="center"
//       >
//         {selected && <Check size={12} color="#FFFFFF" />}
//       </Box>
//       <Text
//         fontFamily="Degular"
//         fontWeight="600"
//         fontSize="16px"
//         lineHeight="24px"
//         color="#131316"
//       >
//         {item}
//       </Text>
//     </Flex>
//   );

//   if (!isOpen) return null;

//   return (
//     <>
//       {/* Overlay */}
//       <MotionBox
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 0.4 }}
//         exit={{ opacity: 0 }}
//         transition={{ duration: 0.25 }}
//         position="fixed"
//         top="0"
//         left="0"
//         w="100vw"
//         h="100vh"
//         bg="rgba(0,0,0,0.5)"
//         backdropFilter="blur(6px)"
//         zIndex="99"
//         onClick={onClose}
//       />

//       {/* Drawer */}
//       <MotionBox
//         initial={{ x: "100%" }}
//         animate={{ x: 0 }}
//         exit={{ x: "100%" }}
//         transition={{ type: "spring", damping: 22, stiffness: 140 }}
//         position="fixed"
//         right="0"
//         top="0"
//         h="100vh"
//         w="456px"
//         bg="#FFFFFF"
//         borderRadius="20px 0 0 20px"
//         boxShadow="
//           0px 16px 32px rgba(219, 222, 229, 0.1),
//           0px 12px 24px rgba(219, 222, 230, 0.1),
//           0px 8px 16px 4px rgba(188, 196, 204, 0.1)
//         "
//         overflowY="auto"
//         zIndex="100"
//       >
//         {/* Top header */}
//         <Flex
//           direction="column"
//           px="24px"
//           py="20px"
//           backdropFilter="blur(8px)"
//           bg="rgba(255,255,255,0.9)"
//           borderRadius="20px 20px 0 0"
//           position="sticky"
//           top="0"
//           zIndex="10"
//         >
//           <Flex justify="space-between" align="center" mb="10px">
//             <Text
//               fontFamily="Degular Display"
//               fontWeight="700"
//               fontSize="24px"
//               color="#131316"
//             >
//               Filter
//             </Text>
//             <Box
//               as="button"
//               onClick={onClose}
//               w="34px"
//               h="34px"
//               borderRadius="full"
//               display="flex"
//               alignItems="center"
//               justifyContent="center"
//               _hover={{ bg: "#F4F4F4" }}
//             >
//               <X size={22} color="#131316" />
//             </Box>
//           </Flex>
//           <Text
//             fontFamily="Söhne"
//             fontSize="14px"
//             lineHeight="22px"
//             color="#31373D"
//           >
//             Click the dropdown inputs to select type, status, or date range
//           </Text>
//         </Flex>

//         {/* Quick date filters */}
//         <Flex
//           px="24px"
//           py="16px"
//           gap="12px"
//           overflowX="auto"
//           css={{
//             scrollbarWidth: "none",
//             "&::-webkit-scrollbar": { display: "none" },
//           }}
//         >
//           {DATE_FILTERS.map((filter) => (
//             <Box
//               key={filter}
//               px="18px"
//               py="10px"
//               borderRadius="100px"
//               bg={selectedDateFilter === filter ? "#131316" : "#FFFFFF"}
//               border={
//                 selectedDateFilter === filter ? "none" : "1px solid #EFF1F6"
//               }
//               minW="50px"
//               display="flex"
//               alignItems="center"
//               justifyContent="center"
//               flexShrink={0}
//               cursor="pointer"
//               onClick={() => setSelectedDateFilter(filter)}
//             >
//               <Text
//                 fontFamily="Degular"
//                 fontWeight="600"
//                 fontSize="14px"
//                 lineHeight="16px"
//                 color={selectedDateFilter === filter ? "#FFFFFF" : "#131316"}
//               >
//                 {filter}
//               </Text>
//             </Box>
//           ))}
//         </Flex>

//         {/* Main content */}
//         <Flex direction="column" gap="24px" px="24px" py="10px">
//           {/* Date Range Picker */}
//           <Box>
//             <Text
//               fontFamily="Degular"
//               fontWeight="600"
//               fontSize="16px"
//               mb="8px"
//               color="#131316"
//             >
//               Date Range
//             </Text>
//             <Flex gap="12px">
//               <Box
//                 flex="1"
//                 bg="#EFF1F6"
//                 borderRadius="12px"
//                 px="16px"
//                 py="14px"
//               >
//                 <input
//                   type="date"
//                   value={startDate}
//                   onChange={(e) => setStartDate(e.target.value)}
//                   style={{
//                     width: "100%",
//                     border: "none",
//                     background: "transparent",
//                     fontFamily: "Degular",
//                     fontSize: "14px",
//                     color: "#131316",
//                   }}
//                 />
//               </Box>
//               <Box
//                 flex="1"
//                 bg="#EFF1F6"
//                 borderRadius="12px"
//                 px="16px"
//                 py="14px"
//               >
//                 <input
//                   type="date"
//                   value={endDate}
//                   onChange={(e) => setEndDate(e.target.value)}
//                   style={{
//                     width: "100%",
//                     border: "none",
//                     background: "transparent",
//                     fontFamily: "Degular",
//                     fontSize: "14px",
//                     color: "#131316",
//                   }}
//                 />
//               </Box>
//             </Flex>
//           </Box>

//           {/* Transaction Type Input */}
//           <Box ref={typeRef}>
//             <Text
//               fontFamily="Degular"
//               fontWeight="600"
//               fontSize="16px"
//               mb="8px"
//               color="#131316"
//             >
//               Transaction Type
//             </Text>
//             <Box
//               bg="#EFF1F6"
//               borderRadius="12px"
//               px="16px"
//               py="14px"
//               cursor="pointer"
//               onClick={() => setOpenTypeDropdown(!openTypeDropdown)}
//             >
//               <Text
//                 fontFamily="Degular"
//                 fontSize="14px"
//                 color={selectedTypes.length > 0 ? "#131316" : "#A1A1A1"}
//               >
//                 {selectedTypes.length > 0
//                   ? selectedTypes.join(", ")
//                   : "Select types"}
//               </Text>
//             </Box>
//             {openTypeDropdown && (
//               <MotionBox
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 mt="4px"
//                 bg="#FFFFFF"
//                 borderRadius="12px"
//                 boxShadow="0px 4px 8px rgba(92,115,131,0.08), 0px 6px 12px rgba(92,115,131,0.08)"
//                 overflow="hidden"
//               >
//                 {TRANSACTION_TYPES.map((type) =>
//                   renderSelectableItem(type, selectedTypes.includes(type), () =>
//                     toggleType(type)
//                   )
//                 )}
//               </MotionBox>
//             )}
//           </Box>

//           {/* Transaction Status Input */}
//           <Box ref={statusRef}>
//             <Text
//               fontFamily="Degular"
//               fontWeight="600"
//               fontSize="16px"
//               mb="8px"
//               color="#131316"
//             >
//               Transaction Status
//             </Text>
//             <Box
//               bg="#EFF1F6"
//               borderRadius="12px"
//               px="16px"
//               py="14px"
//               cursor="pointer"
//               onClick={() => setOpenStatusDropdown(!openStatusDropdown)}
//             >
//               <Text
//                 fontFamily="Degular"
//                 fontSize="14px"
//                 color={selectedStatus ? "#131316" : "#A1A1A1"}
//               >
//                 {selectedStatus || "Select status"}
//               </Text>
//             </Box>
//             {openStatusDropdown && (
//               <MotionBox
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 mt="4px"
//                 bg="#FFFFFF"
//                 borderRadius="12px"
//                 boxShadow="0px 4px 8px rgba(92,115,131,0.08), 0px 6px 12px rgba(92,115,131,0.08)"
//                 overflow="hidden"
//               >
//                 {TRANSACTION_STATUSES.map((status) =>
//                   renderSelectableItem(status, selectedStatus === status, () =>
//                     setSelectedStatus(status)
//                   )
//                 )}
//               </MotionBox>
//             )}
//           </Box>
//         </Flex>

//         {/* Footer */}
//         <Flex
//           position="sticky"
//           bottom="0"
//           left="0"
//           w="full"
//           px="24px"
//           py="20px"
//           gap="12px"
//           bg="rgba(255,255,255,0.9)"
//           backdropFilter="blur(16px)"
//           borderRadius="0 0 20px 20px"
//         >
//           <Button
//             flex="1"
//             h="48px"
//             borderRadius="100px"
//             bg="#FFFFFF"
//             border="1px solid #EFF1F6"
//             fontFamily="Degular"
//             fontWeight="600"
//             fontSize="16px"
//             color="#131316"
//             _hover={{ bg: "#F8F9FA" }}
//             onClick={() => {
//               setSelectedTypes([]);
//               setSelectedStatus(null);
//               setSelectedDateFilter(DATE_FILTERS[0]);
//               setStartDate("2023-07-17");
//               setEndDate("2023-08-17");
//             }}
//           >
//             Clear
//           </Button>
//           <Button
//             flex="1"
//             h="48px"
//             borderRadius="100px"
//             bg="#131316"
//             color="#FFFFFF"
//             fontFamily="Degular"
//             fontWeight="600"
//             fontSize="16px"
//             _hover={{ bg: "#000000" }}
//           >
//             Apply
//           </Button>
//         </Flex>
//       </MotionBox>
//     </>
//   );
// }

import {
  Box,
  Flex,
  Text,
  Button,
  chakra,
  shouldForwardProp,
} from "@chakra-ui/react";
import { motion, isValidMotionProp } from "framer-motion";
import { X, Check } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: {
    types: string[];
    status: string | null;
    dateFilter: string;
    startDate: string;
    endDate: string;
  }) => void;
}

const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

const DATE_FILTERS = [
  "Today",
  "Last 7 days",
  "This month",
  "Last 3 months",
  "This year",
  "Last year",
  "All time",
];

const TRANSACTION_TYPES = [
  "Store Transactions",
  "Get Tipped",
  "Withdrawals",
  "Chargebacks",
  "Cashbacks",
];

const TRANSACTION_STATUSES = ["Successful", "Pending", "Failed"];

export default function FilterDrawer({
  isOpen,
  onClose,
  onApply,
}: FilterDrawerProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedDateFilter, setSelectedDateFilter] = useState(DATE_FILTERS[0]);
  const [openTypeDropdown, setOpenTypeDropdown] = useState(false);
  const [openStatusDropdown, setOpenStatusDropdown] = useState(false);
  const [startDate, setStartDate] = useState("2023-07-17");
  const [endDate, setEndDate] = useState("2023-08-17");

  const typeRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (typeRef.current && !typeRef.current.contains(event.target as Node))
        setOpenTypeDropdown(false);
      if (
        statusRef.current &&
        !statusRef.current.contains(event.target as Node)
      )
        setOpenStatusDropdown(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const renderSelectableItem = (
    item: string,
    selected: boolean,
    onClick: () => void
  ) => (
    <Flex
      key={item}
      align="center"
      px="14px"
      py="12px"
      gap="10px"
      w="100%"
      borderRadius="10px"
      bg="#FFFFFF"
      cursor="pointer"
      onClick={onClick}
      _hover={{ bg: "#F4F4F4" }}
    >
      <Box
        w="20px"
        h="20px"
        border="1px solid #D9D9D9"
        bg={selected ? "#1C1B1F" : "#FFFFFF"}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {selected && <Check size={12} color="#FFFFFF" />}
      </Box>
      <Text
        fontFamily="Degular"
        fontWeight="600"
        fontSize="16px"
        lineHeight="24px"
        color="#131316"
      >
        {item}
      </Text>
    </Flex>
  );

  const handleApply = () => {
    onApply({
      types: selectedTypes,
      status: selectedStatus,
      dateFilter: selectedDateFilter,
      startDate,
      endDate,
    });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 } as any}
        position="fixed"
        top="0"
        left="0"
        w="100vw"
        h="100vh"
        bg="rgba(0,0,0,0.5)"
        backdropFilter="blur(6px)"
        zIndex="99"
        onClick={onClose}
      />

      {/* Drawer */}
      <MotionBox
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 22, stiffness: 140 } as any}
        position="fixed"
        right="0"
        top="0"
        h="100vh"
        w="456px"
        bg="#FFFFFF"
        borderRadius="20px 0 0 20px"
        boxShadow="
          0px 16px 32px rgba(219, 222, 229, 0.1),
          0px 12px 24px rgba(219, 222, 230, 0.1),
          0px 8px 16px 4px rgba(188, 196, 204, 0.1)
        "
        overflowY="auto"
        zIndex="100"
      >
        {/* Header */}
        <Flex
          direction="column"
          px="24px"
          py="20px"
          bg="rgba(255,255,255,0.9)"
          borderRadius="20px 20px 0 0"
          position="sticky"
          top="0"
          zIndex="10"
        >
          <Flex justify="space-between" align="center" mb="10px">
            <Text
              fontFamily="Degular Display"
              fontWeight="700"
              fontSize="24px"
              color="#131316"
            >
              Filter
            </Text>
            <Box
              as="button"
              onClick={onClose}
              w="34px"
              h="34px"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              _hover={{ bg: "#F4F4F4" }}
            >
              <X size={22} color="#131316" />
            </Box>
          </Flex>
          <Text
            fontFamily="Söhne"
            fontSize="14px"
            lineHeight="22px"
            color="#31373D"
          >
            Click the dropdown inputs to select type, status, or date range
          </Text>
        </Flex>

        {/* Quick Date Filters */}
        <Flex
          px="24px"
          py="16px"
          gap="12px"
          overflowX="auto"
          css={{
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {DATE_FILTERS.map((filter) => (
            <Box
              key={filter}
              px="18px"
              py="10px"
              borderRadius="100px"
              bg={selectedDateFilter === filter ? "#131316" : "#FFFFFF"}
              border={
                selectedDateFilter === filter ? "none" : "1px solid #EFF1F6"
              }
              minW="50px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexShrink={0}
              cursor="pointer"
              onClick={() => setSelectedDateFilter(filter)}
            >
              <Text
                fontFamily="Degular"
                fontWeight="600"
                fontSize="14px"
                color={selectedDateFilter === filter ? "#FFFFFF" : "#131316"}
              >
                {filter}
              </Text>
            </Box>
          ))}
        </Flex>

        {/* Main Content */}
        <Flex direction="column" gap="24px" px="24px" py="10px">
          {/* Date Range Picker */}
          <Box>
            <Text
              fontFamily="Degular"
              fontWeight="600"
              fontSize="16px"
              mb="8px"
              color="#131316"
            >
              Date Range
            </Text>
            <Flex gap="12px">
              <Box
                flex="1"
                bg="#EFF1F6"
                borderRadius="12px"
                px="16px"
                py="14px"
              >
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  style={{
                    width: "100%",
                    border: "none",
                    background: "transparent",
                    fontFamily: "Degular",
                    fontSize: "14px",
                    color: "#131316",
                  }}
                />
              </Box>
              <Box
                flex="1"
                bg="#EFF1F6"
                borderRadius="12px"
                px="16px"
                py="14px"
              >
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  style={{
                    width: "100%",
                    border: "none",
                    background: "transparent",
                    fontFamily: "Degular",
                    fontSize: "14px",
                    color: "#131316",
                  }}
                />
              </Box>
            </Flex>
          </Box>

          {/* Transaction Type */}
          <Box ref={typeRef}>
            <Text
              fontFamily="Degular"
              fontWeight="600"
              fontSize="16px"
              mb="8px"
              color="#131316"
            >
              Transaction Type
            </Text>
            <Box
              bg="#EFF1F6"
              borderRadius="12px"
              px="16px"
              py="14px"
              cursor="pointer"
              onClick={() => setOpenTypeDropdown(!openTypeDropdown)}
            >
              <Text
                fontFamily="Degular"
                fontSize="14px"
                color={selectedTypes.length > 0 ? "#131316" : "#A1A1A1"}
              >
                {selectedTypes.length > 0
                  ? selectedTypes.join(", ")
                  : "Select types"}
              </Text>
            </Box>
            {openTypeDropdown && (
              <MotionBox
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                mt="4px"
                bg="#FFFFFF"
                borderRadius="12px"
                boxShadow="0px 4px 8px rgba(92,115,131,0.08), 0px 6px 12px rgba(92,115,131,0.08)"
              >
                {TRANSACTION_TYPES.map((type) =>
                  renderSelectableItem(type, selectedTypes.includes(type), () =>
                    toggleType(type)
                  )
                )}
              </MotionBox>
            )}
          </Box>

          {/* Transaction Status */}
          <Box ref={statusRef}>
            <Text
              fontFamily="Degular"
              fontWeight="600"
              fontSize="16px"
              mb="8px"
              color="#131316"
            >
              Transaction Status
            </Text>
            <Box
              bg="#EFF1F6"
              borderRadius="12px"
              px="16px"
              py="14px"
              cursor="pointer"
              onClick={() => setOpenStatusDropdown(!openStatusDropdown)}
            >
              <Text
                fontFamily="Degular"
                fontSize="14px"
                color={selectedStatus ? "#131316" : "#A1A1A1"}
              >
                {selectedStatus || "Select status"}
              </Text>
            </Box>
            {openStatusDropdown && (
              <MotionBox
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                mt="4px"
                bg="#FFFFFF"
                borderRadius="12px"
                boxShadow="0px 4px 8px rgba(92,115,131,0.08), 0px 6px 12px rgba(92,115,131,0.08)"
              >
                {TRANSACTION_STATUSES.map((status) =>
                  renderSelectableItem(status, selectedStatus === status, () =>
                    setSelectedStatus(status)
                  )
                )}
              </MotionBox>
            )}
          </Box>
        </Flex>

        {/* Footer */}
        <Flex
          position="sticky"
          bottom="0"
          left="0"
          w="full"
          px="24px"
          py="20px"
          gap="12px"
          bg="rgba(255,255,255,0.9)"
          backdropFilter="blur(16px)"
          borderRadius="0 0 20px 20px"
        >
          <Button
            flex="1"
            h="48px"
            borderRadius="100px"
            bg="#FFFFFF"
            border="1px solid #EFF1F6"
            fontFamily="Degular"
            fontWeight="600"
            fontSize="16px"
            color="#131316"
            _hover={{ bg: "#F8F9FA" }}
            onClick={() => {
              setSelectedTypes([]);
              setSelectedStatus(null);
              setSelectedDateFilter(DATE_FILTERS[0]);
              setStartDate("2023-07-17");
              setEndDate("2023-08-17");
            }}
          >
            Clear
          </Button>
          <Button
            flex="1"
            h="48px"
            borderRadius="100px"
            bg="#131316"
            color="#FFFFFF"
            fontFamily="Degular"
            fontWeight="600"
            fontSize="16px"
            _hover={{ bg: "#000000" }}
            onClick={handleApply}
          >
            Apply
          </Button>
        </Flex>
      </MotionBox>
    </>
  );
}
