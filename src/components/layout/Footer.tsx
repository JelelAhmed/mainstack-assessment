import { Box } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box
      as="footer"
      py={4}
      textAlign="center"
      borderTop="1px solid"
      borderColor="brand.lightGray"
      color="brand.textSecondary"
      fontSize="12px"
    >
      © {new Date().getFullYear()} Mainstack. All rights reserved.
    </Box>
  );
}
