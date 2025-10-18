import React from "react";
import { Box } from "@chakra-ui/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const sampleData = [
  { date: "Apr 1", value: 0 },
  { date: "Apr 8", value: 40000 },
  { date: "Apr 15", value: 120000 },
  { date: "Apr 22", value: 80000 },
  { date: "Apr 30", value: 0 },
];

export default function RevenueChart() {
  return (
    <Box w="100%" h={{ base: 220, md: 280 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={sampleData}
          margin={{ top: 16, right: 24, left: 8, bottom: 8 }}
        >
          <XAxis dataKey="date" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#FF5403"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}
