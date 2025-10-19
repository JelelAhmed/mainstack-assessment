import { Box } from "@chakra-ui/react";

interface UserMenuButtonProps {
  name?: string;
  width?: number | string;
  height?: number | string;
}

export default function UserMenuButton({
  name = "Olivier Jones",
  width = 81,
  height = 40,
}: UserMenuButtonProps) {
  const initials = name
    .split(" ")
    .map((part) => part[0]?.toUpperCase())
    .slice(0, 2)
    .join("");

  return (
    <Box
      position="relative"
      w={`${width}px`}
      h={`${height}px`}
      display="flex"
      alignItems="center"
      justifyContent="center"
      cursor="pointer"
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 81 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer rounded rectangle */}
        <rect width="81" height="40" rx="20" fill="#EFF1F6" />
        {/* Black initials circle */}
        <circle cx="21" cy="20" r="16" fill="#131316" />
      </svg>

      {/* 🧍 Initials */}
      <Box
        position="absolute"
        left="21px"
        transform="translateX(-50%)"
        color="white"
        fontFamily="Degular, sans-serif"
        fontWeight="600"
        fontSize="14px"
        pointerEvents="none"
      >
        {initials}
      </Box>

      {/* ☰ Menu lines */}
      <Box
        position="absolute"
        right="16px"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        h="12px"
      >
        <Box w="16px" h="2px" bg="#56616B" borderRadius="1px" />
        <Box w="16px" h="2px" bg="#56616B" borderRadius="1px" />
        <Box w="16px" h="2px" bg="#56616B" borderRadius="1px" />
      </Box>
    </Box>
  );
}
