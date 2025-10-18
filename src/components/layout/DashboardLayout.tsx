// NEW: Wraps dashboard page with Header and optional Footer
import React from "react";
import { Box } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  return (
    <Box minH="100vh" bg="brand.bg" display="flex" flexDirection="column">
      <Header />
      <Box flex="1" as="main" py={6}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
}
