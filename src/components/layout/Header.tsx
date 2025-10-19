import { Box, Container } from "@chakra-ui/react";
import Navbar from "../dashboard/Navbar";
import MainstackLogo from "../common/MainstackLogo";
import RightMenu from "../dashboard/RightMenu";

export default function Header() {
  return (
    <Box
      as="header"
      w="100%"
      bg="transparent"
      position="sticky"
      top="0"
      zIndex="10"
      display="flex"
      justifyContent="center"
      pt={{ base: 2, md: 4 }}
    >
      <Container
        maxW="1408px"
        px={{ base: 4, md: 6 }}
        mx="auto"
        bg="#FFFFFF"
        border="2px solid #FFFFFF"
        borderRadius="100px"
        boxShadow="0px 2px 6px rgba(45, 59, 67, 0.06), 0px 2px 4px rgba(45, 59, 67, 0.05)"
        h="64px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
      >
        {/* Left: Logo */}
        <Box
          position="absolute"
          left="24px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <MainstackLogo boxSize="36px" />
        </Box>

        {/* Center: Navbar */}
        <Box
          flex="1"
          display={{ base: "none", md: "flex" }}
          justifyContent="center"
          alignItems="center"
        >
          <Navbar />
        </Box>

        {/* Right: Notification + Avatar */}
        <RightMenu />
      </Container>
    </Box>
  );
}
