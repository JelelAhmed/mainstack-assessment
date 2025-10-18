import { Box, Flex, Text, IconButton, Avatar, HStack } from "@chakra-ui/react";
import { FiBell } from "react-icons/fi";

export default function Navbar() {
  return (
    <Box
      borderBottom="1px solid"
      borderColor="brand.lightGray"
      px={{ base: 4, md: 6 }}
      py={3}
    >
      <Flex maxW="1200px" mx="auto" align="center" justify="space-between">
        <HStack spacing={4}>
          <Box w="36px" h="36px" bg="brand.textPrimary" borderRadius="8px" />
          <Text fontWeight={700} fontSize="16px">
            Revenue
          </Text>
        </HStack>

        <HStack spacing={3}>
          <IconButton
            aria-label="notifications"
            icon={<FiBell />}
            variant="ghost"
          />
          <Avatar name="OJ" size="sm" />
        </HStack>
      </Flex>
    </Box>
  );
}
