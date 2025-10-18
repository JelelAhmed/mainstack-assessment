// NEW: Header layout wrapper for Navbar consistency
import { Box } from "@chakra-ui/react";
import Navbar from "../dashboard/Navbar";

export default function Header() {
  return (
    <Box as="header" w="100%" bg="brand.white" boxShadow="sm" zIndex="10">
      <Navbar />
    </Box>
  );
}
