import {
  Box,
  VStack,
  HStack,
  Text,
  Divider,
  Icon,
  PopoverContent,
  PopoverBody,
} from "@chakra-ui/react";
import {
  Settings,
  Receipt,
  Gift,
  Grid,
  Bug,
  LogOut,
  UserCog,
} from "lucide-react";

export default function ProfileMenu() {
  const MENU_ITEMS = [
    { label: "Settings", icon: Settings },
    { label: "Purchase History", icon: Receipt },
    { label: "Refer and Earn", icon: Gift },
    { label: "Integrations", icon: Grid },
    { label: "Report Bug", icon: Bug },
    { label: "Switch Account", icon: UserCog },
    { label: "Sign Out", icon: LogOut },
  ];

  return (
    <PopoverContent
      w="260px"
      borderRadius="16px"
      border="none"
      outline="none"
      // 💪 Enhanced layered shadow for premium depth
      boxShadow="0px 8px 40px rgba(0, 0, 0, 0.24), 0px 4px 16px rgba(0, 0, 0, 0.12)"
      p="0"
      bg="#FFFFFF"
      _focusVisible={{ boxShadow: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <PopoverBody p="0">
        <VStack align="stretch" spacing="0">
          {/* User Info */}
          <HStack spacing="12px" p="16px" align="center">
            <Box
              w="40px"
              h="40px"
              borderRadius="full"
              bg="linear-gradient(135deg, #5C6670, #131316)"
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="white"
              fontWeight="600"
              fontFamily="Degular"
              fontSize="14px"
            >
              OJ
            </Box>
            <Box>
              <Text
                fontFamily="Degular"
                fontWeight="600"
                fontSize="16px"
                lineHeight="24px"
                color="#131316"
              >
                Olivier Jones
              </Text>
              <Text
                fontFamily="Degular"
                fontWeight="500"
                fontSize="14px"
                color="#56616B"
              >
                olivierjones@gmail.com
              </Text>
            </Box>
          </HStack>

          <Divider borderColor="#F1F3F5" />

          {/* Menu Items */}
          <VStack align="stretch" spacing="0" py="4px">
            {MENU_ITEMS.map((item, i) => (
              <HStack
                key={i}
                spacing="12px"
                px="16px"
                py="10px"
                cursor="pointer"
                transition="all 0.2s ease"
                _hover={{
                  bg: "#F9FAFB",
                }}
              >
                <Icon as={item.icon} size="18px" color="#131316" />
                <Text
                  fontFamily="Degular"
                  fontWeight="500"
                  fontSize="14px"
                  color="#131316"
                >
                  {item.label}
                </Text>
              </HStack>
            ))}
          </VStack>
        </VStack>
      </PopoverBody>
    </PopoverContent>
  );
}
