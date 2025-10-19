import { Box } from "@chakra-ui/react";
import Header from "./Header";

export default function HeaderWithTopBar() {
  return (
    <Box position="sticky" top="0" zIndex="20">
      {/* Background Top Bar — purely structural */}
      <Box
        position="absolute"
        top="0"
        left="0"
        w="100%"
        h="60px"
        bg="#FFFFFF"
        zIndex="0"
      />

      {/* Rounded Header (visible floating layer) */}
      <Box position="relative" zIndex="1">
        <Header />
      </Box>
    </Box>
  );
}
