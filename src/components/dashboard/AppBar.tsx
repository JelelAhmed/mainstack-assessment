import { VStack, IconButton, Tooltip, Box } from "@chakra-ui/react";
import { FiLayers, FiFolder, FiPackage } from "react-icons/fi";

export default function AppBar() {
  return (
    <VStack
      spacing={4}
      align="center"
      p={2}
      bg="brand.white"
      border="1px solid"
      borderColor="brand.lightGray"
      borderRadius="12px"
      minH="240px"
    >
      <Tooltip label="Overview" placement="right">
        <IconButton aria-label="overview" icon={<FiLayers />} variant="ghost" />
      </Tooltip>
      <Tooltip label="Products" placement="right">
        <IconButton aria-label="products" icon={<FiFolder />} variant="ghost" />
      </Tooltip>
      <Tooltip label="Orders" placement="right">
        <IconButton aria-label="orders" icon={<FiPackage />} variant="ghost" />
      </Tooltip>
      <Box flex="1" />
    </VStack>
  );
}
