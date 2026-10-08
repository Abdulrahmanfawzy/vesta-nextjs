"use client";
import ChartsCard from "@/components/common/charts/ChartsCard";
import FinancialCardList from "./FinancialCardList";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const chartData = [
  { date: "May 1", value: 10000 },
  { date: "May 2", value: 90000 },
  { date: "May 3", value: 125000 },
  { date: "May 4", value: 120000 },
  { date: "May 5", value: 85000 },
  { date: "May 6", value: 72000 },
  { date: "May 7", value: 80000 },
  { date: "May 8", value: 70000 },
  { date: "May 9", value: 45000 },
  { date: "May 10", value: 25000 },
  { date: "May 11", value: 40000 },
  { date: "May 12", value: 80000 },
  { date: "May 13", value: 90000 },
  { date: "May 14", value: 90000 },
  { date: "May 15", value: 105000 },
  { date: "May 16", value: 112000 },
  { date: "May 17", value: 100000 },
  { date: "May 18", value: 65000 },
  { date: "May 19", value: 60000 },
  { date: "May 20", value: 58000 },
  { date: "May 21", value: 40000 },
  { date: "May 22", value: 20000 },
  { date: "May 23", value: 12000 },
];

const X_TICKS = ["May 1", "May 8", "May 15", "May 22"];
const Y_TICKS = [0, 50000, 100000, 130000];

const formatK = (value: number) => (value === 0 ? "0" : `${value / 1000}K`);

function FinancialImpactChart() {
  return (
    <ChartsCard title="FINANCIAL IMPACT">
      <FinancialCardList />
      <div className="mt-2 h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 10, bottom: 0, left: 0 }}
          >
            <XAxis
              dataKey="date"
              ticks={X_TICKS}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              ticks={Y_TICKS}
              domain={[0, 150000]}
              tickFormatter={formatK}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              width={40}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#111936"
              strokeWidth={4}
              strokeLinecap="round"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartsCard>
  );
}

export default FinancialImpactChart;
