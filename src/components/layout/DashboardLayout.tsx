import React from "react";
import { Box, Container } from "@chakra-ui/react";
import HeaderWithTopBar from "./HeaderWithTopBar";
import Footer from "./Footer";

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  return (
    <Box minH="100vh" bg="brand.bg" display="flex" flexDirection="column">
      <Box maxW="1440px" mx="auto" w="100%" position="relative">
        <HeaderWithTopBar />

        <Box as="main" mt="64px">
          <Container maxW="100%" px={{ base: 4, md: 6 }}>
            {children}
          </Container>
        </Box>

        <Footer />
      </Box>
    </Box>
  );
}
