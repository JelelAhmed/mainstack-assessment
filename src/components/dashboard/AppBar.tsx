import { Box, VStack, Tooltip } from "@chakra-ui/react";
import { useState } from "react";
import LinkInBioIcon from "../icons/LinkInBioIcon";
import StoreIcon from "../icons/StoreIcon";
import MediaKitIcon from "../icons/MediaKitIcon";
import InvoicingIcon from "../icons/InvoicingIcon";

export default function AppBar() {
  const [hovered, setHovered] = useState<number | null>(null);

  const items = [
    { label: "Link in Bio", Icon: LinkInBioIcon },
    { label: "Store", Icon: StoreIcon },
    { label: "Media Kit", Icon: MediaKitIcon },
    { label: "Invoicing", Icon: InvoicingIcon },
  ];

  return (
    <Box
      position="fixed"
      left="calc((100vw - 1440px) / 2 + 16px)"
      top="310px"
      width="48px"
      height="192px"
      display="flex"
      flexDirection="row"
      alignItems="flex-start"
      padding="4px"
      gap="4px"
      bg="#FFFFFF"
      borderRadius="100px"
      boxShadow="0px 4px 8px rgba(92, 115, 131, 0.08), 0px 6px 12px rgba(92, 115, 131, 0.08)"
      zIndex="10"
    >
      <VStack width="40px" height="184px" spacing="8px" align="center">
        {items.map(({ label, Icon }, index) => (
          <Tooltip
            key={label}
            label={label}
            placement="right"
            hasArrow
            openDelay={100}
          >
            <Box
              as="button"
              bg="transparent"
              borderRadius="full"
              p="8px"
              transition="all 0.2s ease"
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            >
              <Icon active={hovered === index} />
            </Box>
          </Tooltip>
        ))}
      </VStack>
    </Box>
  );
}
