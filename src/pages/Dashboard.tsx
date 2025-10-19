// import { Box, Flex } from "@chakra-ui/react";
// import {
//   AppBar,
//   BalanceDisplay,
//   RevenueChart,
//   TransactionsList,
//   // SidebarApps,
// } from "../components/dashboard";
// import MetricsContainer from "../components/dashboard/MetricsContainer";
// import DashboardLayout from "../components/layout/DashboardLayout";

// export default function DashboardPage() {
//   return (
//     <DashboardLayout>
//       <Flex
//         direction={{ base: "column", md: "row" }}
//         gap={6}
//         align="flex-start"
//       >
//         {/* Left AppBar */}
//         <Box w={{ base: "100%", md: "64px" }}>
//           <AppBar />
//         </Box>

//         {/* Center Content */}
//         <Flex direction="column" flex="1" gap={6}>
//           <Flex
//             direction={{ base: "column", md: "row" }}
//             justify="space-between"
//             gap={6}
//           >
//             <BalanceDisplay balance={92000} />
//             <MetricsContainer />
//           </Flex>

//           <RevenueChart />
//           <TransactionsList />
//         </Flex>

//         {/* Right Sidebar */}
//         <Box display={{ base: "none", lg: "block" }} w="240px">
//           {/* <SidebarApps /> */}
//         </Box>
//       </Flex>
//     </DashboardLayout>
//   );
// }

import { Box, Flex, Container } from "@chakra-ui/react";
import {
  AppBar,
  BalanceDisplay,
  RevenueChart,
  TransactionsList,
} from "../components/dashboard";
import MetricsContainer from "../components/dashboard/MetricsContainer";
import DashboardLayout from "../components/layout/DashboardLayout";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <Flex direction={{ base: "column", md: "row" }} align="flex-start">
        {/* Fixed AppBar (does not affect layout width) */}
        <Box position="relative" w={{ base: "0", md: "64px" }}>
          <AppBar />
        </Box>

        {/* Main Content Area — perfectly centered */}
        <Flex direction="column" flex="1" align="center" w="100%">
          {/* Center container */}
          <Container maxW="1160px" w="100%" px="0" mx="auto">
            {/* Balance + Metrics side by side */}
            <Flex
              direction={{ base: "column", md: "row" }}
              justify="space-between"
              align="flex-start"
              gap="124px"
            >
              <Box flex="1" maxW="765px">
                <BalanceDisplay balance={120500} />
                <RevenueChart />
              </Box>
              <MetricsContainer />
            </Flex>

            {/* Transactions below */}
            <Box mt="64px">
              <TransactionsList />
            </Box>
          </Container>
        </Flex>
      </Flex>
    </DashboardLayout>
  );
}
