import { Box, VStack, HStack, Text, Flex } from "@chakra-ui/react";
import { ChevronRight } from "lucide-react";
import LinkInBioIcon from "../icons/LinkInBioIcon";
import StoreIcon from "../icons/StoreIcon";
import MediaKitIcon from "../icons/MediaKitIcon";
import InvoicingIcon from "../icons/InvoicingIcon";
import BookingsIcon from "../icons/BookingsIcon";

const APPS = [
  {
    label: "Link in Bio",
    description: "Manage your Link in Bio",
    icon: LinkInBioIcon,
  },
  {
    label: "Store",
    description: "Manage your Store activities",
    icon: StoreIcon,
  },
  {
    label: "Media Kit",
    description: "Manage your Media Kit",
    icon: MediaKitIcon,
  },
  {
    label: "Invoicing",
    description: "Manage your Invoices",
    icon: InvoicingIcon,
  },
  {
    label: "Bookings",
    description: "Manage your Bookings",
    icon: BookingsIcon,
  },
];

interface SidebarAppsProps {
  onSelectApp?: (label: string) => void;
}

export default function SidebarApps({ onSelectApp }: SidebarAppsProps) {
  return (
    <Box
      bg="#FFFFFF"
      borderRadius="24px"
      p="16px"
      boxShadow="0px 2px 6px rgba(45, 59, 67, 0.06)"
      width="350px"
    >
      <VStack align="stretch" spacing="12px">
        {APPS.map((app) => {
          const IconComponent = app.icon;
          return (
            <Flex
              key={app.label}
              align="center"
              justify="space-between"
              p="8px 12px"
              borderRadius="16px"
              transition="all 0.25s ease"
              role="group"
              cursor="pointer"
              border="1px solid transparent"
              onClick={() => onSelectApp?.(app.label)}
              _hover={{
                border: "1px solid #E5E7EB",
                boxShadow: "0px 2px 10px rgba(19, 19, 22, 0.05)",
                bg: "transparent",
              }}
            >
              <HStack align="center" spacing="16px" flex="1">
                <Box
                  boxSize="48px"
                  borderRadius="16px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  bg="#FAFAFA"
                  boxShadow="0px 2px 6px rgba(19, 19, 22, 0.08)"
                  flexShrink={0}
                  transition="box-shadow 0.2s ease"
                  _groupHover={{
                    boxShadow: "0px 3px 10px rgba(19, 19, 22, 0.12)",
                  }}
                >
                  <IconComponent active={true} />
                </Box>

                <Box
                  transition="transform 0.25s ease"
                  _groupHover={{
                    transform: "translateX(-6px)",
                  }}
                >
                  <Text
                    fontFamily="Degular, sans-serif"
                    fontWeight="600"
                    fontSize="16px"
                    lineHeight="24px"
                    color="#131316"
                  >
                    {app.label}
                  </Text>
                  <Text
                    fontFamily="Degular, sans-serif"
                    fontWeight="500"
                    fontSize="14px"
                    lineHeight="16px"
                    color="#56616B"
                  >
                    {app.description}
                  </Text>
                </Box>
              </HStack>

              <Box
                opacity={0}
                transform="translateX(-4px)"
                transition="opacity 0.25s ease, transform 0.25s ease"
                _groupHover={{
                  opacity: 1,
                  transform: "translateX(2px)",
                }}
              >
                <ChevronRight size={18} color="#C8CDD2" />
              </Box>
            </Flex>
          );
        })}
      </VStack>
    </Box>
  );
}
