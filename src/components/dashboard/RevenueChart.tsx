// import { Box, Text, Flex } from "@chakra-ui/react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// const sampleData = [
//   { date: "Apr 1", value: 0 },
//   { date: "Apr 8", value: 40000 },
//   { date: "Apr 15", value: 120000 },
//   { date: "Apr 22", value: 80000 },
//   { date: "Apr 30", value: 0 },
// ];

// export default function RevenueChart() {
//   return (
//     <Box w="765px" position="relative">
//       <ResponsiveContainer width="100%" height={257}>
//         <LineChart
//           data={sampleData}
//           margin={{ top: 16, right: 24, left: 8, bottom: 8 }}
//         >
//           <XAxis
//             dataKey="date"
//             axisLine={false}
//             tickLine={false}
//             tick={{ fill: "#56616B", fontSize: 12 }}
//           />
//           <YAxis
//             axisLine={false}
//             tickLine={false}
//             tick={{ fill: "#56616B", fontSize: 12 }}
//           />
//           <Tooltip />
//           <Line
//             type="monotone"
//             dataKey="value"
//             stroke="#FF5403"
//             strokeWidth={3}
//             dot={false}
//             strokeLinecap="round"
//           />
//         </LineChart>
//       </ResponsiveContainer>

//       {/* Bottom rounded divider and date labels */}
//       <Box position="relative" mt="12px">
//         <Box w="100%" h="1px" bg="#DBDEE6" borderRadius="full" />
//         <Flex justify="space-between" align="center" mt="10px">
//           <Text
//             color="#56616B"
//             fontSize="14px"
//             fontWeight="500"
//             letterSpacing="-0.2px"
//           >
//             Apr 1, 2022
//           </Text>
//           <Text
//             color="#56616B"
//             fontSize="16px"
//             fontWeight="500"
//             letterSpacing="-0.2px"
//           >
//             Apr 30, 2022
//           </Text>
//         </Flex>
//       </Box>
//     </Box>
//   );
// }

import { Box, Text, Flex } from "@chakra-ui/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, parseISO } from "date-fns";
import { formatCurrencyUSD } from "../../utils/formatCurrency";
import { type Transaction } from "../../types";

interface Props {
  transactions: Transaction[];
}

export default function RevenueChart({ transactions }: Props) {
  // ✅ Group deposits by date
  const revenueDataMap: Record<string, number> = {};

  transactions.forEach((tx) => {
    if (tx.type === "deposit" && tx.status === "successful") {
      const date = format(parseISO(tx.date), "MMM d"); // e.g., "Mar 3"
      revenueDataMap[date] = (revenueDataMap[date] || 0) + tx.amount;
    }
  });

  // ✅ Convert map to chart-friendly array
  const chartData = Object.entries(revenueDataMap)
    .map(([date, value]) => ({ date, value }))
    .sort(
      (a, b) =>
        new Date(a.date + " 2022").getTime() -
        new Date(b.date + " 2022").getTime()
    );

  // ✅ Determine start/end labels for chart footer
  const allDates = transactions.map((tx) => new Date(tx.date));
  const startDate = allDates.length
    ? format(Math.min(...allDates.map((d) => d.getTime())), "MMM d, yyyy")
    : "";
  const endDate = allDates.length
    ? format(Math.max(...allDates.map((d) => d.getTime())), "MMM d, yyyy")
    : "";

  // ✅ Tooltip formatter
  const tooltipFormatter = (value: number) => `USD ${formatCurrencyUSD(value)}`;

  return (
    <Box w="765px" position="relative">
      <ResponsiveContainer width="100%" height={257}>
        <LineChart
          data={chartData}
          margin={{ top: 16, right: 24, left: 8, bottom: 8 }}
        >
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#56616B", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#56616B", fontSize: 12 }}
            tickFormatter={(val) => `${val >= 1000 ? val / 1000 + "k" : val}`}
          />
          <Tooltip formatter={tooltipFormatter} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#FF5403"
            strokeWidth={3}
            dot={false}
            strokeLinecap="round"
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Bottom rounded divider and date labels */}
      <Box position="relative" mt="12px">
        <Box w="100%" h="1px" bg="#DBDEE6" borderRadius="full" />
        <Flex justify="space-between" align="center" mt="10px">
          <Text
            color="#56616B"
            fontSize="14px"
            fontWeight="500"
            letterSpacing="-0.2px"
          >
            {startDate}
          </Text>
          <Text
            color="#56616B"
            fontSize="16px"
            fontWeight="500"
            letterSpacing="-0.2px"
          >
            {endDate}
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}
