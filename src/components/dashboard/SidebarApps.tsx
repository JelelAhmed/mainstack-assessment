import { Box, VStack, HStack, Text, Icon, Divider } from "@chakra-ui/react";
import {
  FiLink,
  FiShoppingBag,
  FiImage,
  FiFileText,
  FiCalendar,
} from "react-icons/fi";

const APPS = [
  { label: "Link in Bio", icon: FiLink },
  { label: "Store", icon: FiShoppingBag },
  { label: "Media Kit", icon: FiImage },
  { label: "Invoicing", icon: FiFileText },
  { label: "Bookings", icon: FiCalendar },
];

export default function SidebarApps() {
  return (
    <Box
      bg="brand.white"
      p={4}
      border="1px solid"
      borderColor="brand.lightGray"
      borderRadius="12px"
      position="sticky"
      top="90px"
    >
      <VStack align="stretch" spacing={2}>
        {APPS.map((a) => (
          <HStack
            key={a.label}
            justify="space-between"
            p={3}
            borderRadius="8px"
            _hover={{ bg: "gray.50" }}
            cursor="pointer"
          >
            <HStack>
              <Icon as={a.icon} boxSize={5} />
              <Text fontWeight={600}>{a.label}</Text>
            </HStack>
          </HStack>
        ))}

        <Divider borderColor="brand.midGray" my={2} />
        <Text fontSize="12px" color="brand.textSecondary">
          Other tools
        </Text>
      </VStack>
    </Box>
  );
}
