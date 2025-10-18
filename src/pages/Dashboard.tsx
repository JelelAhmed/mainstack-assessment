import { Box, Flex, Container } from "@chakra-ui/react";
import {
  AppBar,
  BalanceDisplay,
  MetricCard,
  RevenueChart,
  TransactionsList,
  SidebarApps,
} from "../components/dashboard";
import DashboardLayout from "../components/layout/DashboardLayout";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <Container maxW="1200px" px={{ base: 4, md: 6 }}>
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={6}
          align="flex-start"
        >
          {/* Left AppBar */}
          <Box w={{ base: "100%", md: "64px" }}>
            <AppBar />
          </Box>

          {/* Center Content */}
          <Flex direction="column" flex="1" gap={6}>
            <Flex
              direction={{ base: "column", md: "row" }}
              justify="space-between"
              gap={6}
            >
              <BalanceDisplay balance={92000} />
              <Flex gap={4}>
                <MetricCard label="Ledger Balance" value={82000} />
                <MetricCard label="Total Payout" value={45000} />
              </Flex>
            </Flex>

            <RevenueChart />
            <TransactionsList />
          </Flex>

          {/* Right Sidebar */}
          <Box display={{ base: "none", lg: "block" }} w="240px">
            <SidebarApps />
          </Box>
        </Flex>
      </Container>
    </DashboardLayout>
  );
}
