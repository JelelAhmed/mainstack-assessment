// import { Box, Flex, Container } from "@chakra-ui/react";
// import {
//   AppBar,
//   BalanceDisplay,
//   RevenueChart,
//   TransactionsList,
// } from "../components/dashboard";
// import MetricsContainer from "../components/dashboard/MetricsContainer";
// import DashboardLayout from "../components/layout/DashboardLayout";

// export default function DashboardPage() {
//   return (
//     <DashboardLayout>
//       <Flex direction={{ base: "column", md: "row" }} align="flex-start">
//         {/* Fixed AppBar (does not affect layout width) */}
//         <Box position="relative" w={{ base: "0", md: "64px" }}>
//           <AppBar />
//         </Box>

//         {/* Main Content Area — perfectly centered */}
//         <Flex direction="column" flex="1" align="center" w="100%">
//           {/* Center container */}
//           <Container maxW="1160px" w="100%" px="0" mx="auto">
//             {/* Balance + Metrics side by side */}
//             <Flex
//               direction={{ base: "column", md: "row" }}
//               justify="space-between"
//               align="flex-start"
//               gap="124px"
//             >
//               <Box flex="1" maxW="765px">
//                 <BalanceDisplay balance={120500} />
//                 <RevenueChart />
//               </Box>
//               <MetricsContainer />
//             </Flex>

//             {/* Transactions below */}
//             <Box mt="64px">
//               <TransactionsList />
//             </Box>
//           </Container>
//         </Flex>
//       </Flex>
//     </DashboardLayout>
//   );
// }

// import { Box, Flex, Container, Spinner, Text } from "@chakra-ui/react";
// import {
//   AppBar,
//   BalanceDisplay,
//   RevenueChart,
//   TransactionsList,
// } from "../components/dashboard";
// import MetricsContainer from "../components/dashboard/MetricsContainer";
// import DashboardLayout from "../components/layout/DashboardLayout";
// import { useUser } from "../hooks/useUser";
// import { useTransactions } from "../hooks/useTransactions";
// import { useWallet } from "../hooks/useWallet";

// export default function DashboardPage() {
//   const { data: user, loading: userLoading, error: userError } = useUser();
//   const {
//     data: wallet,
//     loading: walletLoading,
//     error: walletError,
//   } = useWallet();
//   const {
//     data: transactions,
//     loading: txLoading,
//     error: txError,
//   } = useTransactions();

//   const loading = userLoading || walletLoading || txLoading;
//   const error = userError || walletError || txError;

//   if (loading) {
//     return (
//       <Flex justify="center" align="center" h="100vh">
//         <Spinner size="xl" thickness="4px" color="gray.800" />
//       </Flex>
//     );
//   }

//   if (error) {
//     return (
//       <Flex justify="center" align="center" h="100vh">
//         <Text color="red.500" fontWeight="500">
//           Failed to load dashboard data: {error}
//         </Text>
//       </Flex>
//     );
//   }

//   if (!user || !wallet || !transactions) {
//     return (
//       <Flex justify="center" align="center" h="100vh">
//         <Text color="gray.600" fontWeight="500">
//           No data available.
//         </Text>
//       </Flex>
//     );
//   }

//   return (
//     <DashboardLayout user={user}>
//       <Flex direction={{ base: "column", md: "row" }} align="flex-start">
//         {/* Fixed AppBar */}
//         <Box position="relative" w={{ base: "0", md: "64px" }}>
//           <AppBar />
//         </Box>

//         {/* Main Content Area */}
//         <Flex direction="column" flex="1" align="center" w="100%">
//           <Container maxW="1160px" w="100%" px="0" mx="auto">
//             {/* Balance + Metrics */}
//             <Flex
//               direction={{ base: "column", md: "row" }}
//               justify="space-between"
//               align="flex-start"
//               gap="124px"
//             >
//               <Box flex="1" maxW="765px">
//                 <BalanceDisplay
//                   balance={wallet.balance}
//                   currency={wallet.currency}
//                 />
//                 <RevenueChart transactions={transactions} />
//               </Box>

//               <MetricsContainer wallet={wallet} />
//             </Flex>

//             {/* Transactions */}
//             <Box mt="64px">
//               <TransactionsList transactions={transactions} />
//             </Box>
//           </Container>
//         </Flex>
//       </Flex>
//     </DashboardLayout>
//   );
// }

import { Box, Flex, Container, Spinner, Text } from "@chakra-ui/react";
import {
  AppBar,
  BalanceDisplay,
  RevenueChart,
  TransactionsList,
} from "../components/dashboard";
import MetricsContainer from "../components/dashboard/MetricsContainer";
import DashboardLayout from "../components/layout/DashboardLayout";
import { useUser, useWallet, useTransactions } from "../hooks";

export default function DashboardPage() {
  const { data: user, loading: userLoading, error: userError } = useUser();
  const {
    data: wallet,
    loading: walletLoading,
    error: walletError,
  } = useWallet();
  const {
    data: transactions,
    loading: txLoading,
    error: txError,
  } = useTransactions();

  const loading = userLoading || walletLoading || txLoading;
  const error = userError || walletError || txError;

  if (loading)
    return (
      <Flex justify="center" align="center" h="100vh">
        <Spinner size="xl" color="gray.800" />
      </Flex>
    );

  if (error)
    return (
      <Flex justify="center" align="center" h="100vh">
        <Text color="red.500" fontWeight="500">
          Failed to load dashboard data
        </Text>
      </Flex>
    );

  if (!user || !wallet || !transactions)
    return (
      <Flex justify="center" align="center" h="100vh">
        <Text color="gray.600" fontWeight="500">
          No data available.
        </Text>
      </Flex>
    );

  return (
    <DashboardLayout user={user}>
      <Flex direction={{ base: "column", md: "row" }} align="flex-start">
        <Box position="relative" w={{ base: "0", md: "64px" }}>
          <AppBar />
        </Box>

        <Flex direction="column" flex="1" align="center" w="100%">
          <Container maxW="1160px" w="100%" px="0" mx="auto">
            <Flex
              direction={{ base: "column", md: "row" }}
              justify="space-between"
              align="flex-start"
              gap="124px"
            >
              <Box flex="1" maxW="765px">
                <BalanceDisplay
                  balance={wallet.balance}
                  currency={wallet.currency || "USD"}
                />
                <RevenueChart transactions={transactions} />
              </Box>

              <MetricsContainer wallet={wallet} />
            </Flex>

            <Box mt="64px">
              <TransactionsList
                transactions={transactions}
                currency={wallet.currency || "USD"}
              />
            </Box>
          </Container>
        </Flex>
      </Flex>
    </DashboardLayout>
  );
}
