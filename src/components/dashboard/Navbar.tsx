"use client";

import {
  Flex,
  Icon,
  Text,
  useBreakpointValue,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import {
  FiHome,
  FiBarChart2,
  FiCreditCard,
  FiUsers,
  FiGrid,
  FiChevronDown,
} from "react-icons/fi";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // ✅ React Router
import SidebarApps from "./SidebarApps";

const menuItems = [
  { label: "Home", icon: FiHome, path: "/" },
  { label: "Analytics", icon: FiBarChart2, path: "/analytics" },
  { label: "Revenue", icon: FiCreditCard, path: "/revenue" },
  { label: "CRM", icon: FiUsers, path: "/crm" },
];

export default function Navbar() {
  const menuGap = useBreakpointValue({ base: 3, md: 5, lg: 6 });
  const { isOpen, onToggle, onClose } = useDisclosure();
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const location = useLocation(); // ✅ get current route

  const handleAppSelect = (appLabel: string) => {
    setSelectedApp(appLabel);
    onClose(); // close popover after selection
  };

  return (
    <Flex
      as="nav"
      justify="center"
      align="center"
      gap={menuGap}
      w="fit-content"
      flexWrap={{ base: "wrap", md: "nowrap" }}
    >
      {/* Regular nav items with routing */}
      {menuItems.map((item, idx) => {
        const isActive = location.pathname === item.path; // ✅ highlight current page

        return (
          <Link to={item.path} key={idx}>
            <Flex
              align="center"
              justify="center"
              px="14px"
              py="8px"
              gap="4px"
              borderRadius="100px"
              transition="all 0.25s ease"
              cursor="pointer"
              bg={isActive ? "#131316" : "transparent"}
              _hover={{
                bg: isActive ? "#131316" : "rgba(19,19,22,0.08)",
              }}
            >
              <Icon
                as={item.icon}
                boxSize="20px"
                color={isActive ? "#FFFFFF" : "#56616B"}
              />
              <Text
                fontFamily="Degular, sans-serif"
                fontWeight="600"
                fontSize="16px"
                lineHeight="24px"
                letterSpacing="-0.4px"
                color={isActive ? "#FFFFFF" : "#56616B"}
                whiteSpace="nowrap"
              >
                {item.label}
              </Text>
            </Flex>
          </Link>
        );
      })}

      {/* Apps dropdown */}
      <Popover isOpen={isOpen} onClose={onClose} placement="bottom-start">
        <PopoverTrigger>
          <Flex
            align="center"
            justify="center"
            px="14px"
            py="8px"
            gap="6px"
            borderRadius="100px"
            transition="all 0.25s ease"
            cursor="pointer"
            bg={isOpen ? "#131316" : "transparent"}
            _hover={{
              bg: isOpen ? "#131316" : "rgba(19,19,22,0.08)",
            }}
            onClick={onToggle}
          >
            <Icon
              as={FiGrid}
              boxSize="20px"
              color={isOpen ? "#FFFFFF" : "#56616B"}
            />

            {/* Text section */}
            <Text
              fontFamily="Degular, sans-serif"
              fontWeight="600"
              fontSize="16px"
              lineHeight="24px"
              letterSpacing="-0.4px"
              color={isOpen ? "#FFFFFF" : "#56616B"}
              whiteSpace="nowrap"
              display="flex"
              alignItems="center"
              gap="8px"
            >
              <span>Apps</span>
              {selectedApp && (
                <>
                  <span
                    style={{
                      color: isOpen ? "#FFFFFF" : "#9CA3AF",
                    }}
                  >
                    ›
                  </span>
                  <span>{selectedApp}</span>
                </>
              )}
            </Text>

            <Icon
              as={FiChevronDown}
              boxSize="16px"
              color={isOpen ? "#FFFFFF" : "#56616B"}
              style={{
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease",
              }}
            />
          </Flex>
        </PopoverTrigger>

        {/* Apps Dropdown */}
        <PopoverContent
          mt="10px"
          border="none"
          outline="none"
          boxShadow="0px 8px 36px rgba(19, 19, 22, 0.18)"
          borderRadius="24px"
          width="360px"
          p="0"
          bg="#FFFFFF"
          _focusVisible={{ boxShadow: "none" }}
          _focus={{ boxShadow: "none" }}
          zIndex={50}
        >
          <Box p="8px">
            <SidebarApps onSelectApp={handleAppSelect} />
          </Box>
        </PopoverContent>
      </Popover>
    </Flex>
  );
}
