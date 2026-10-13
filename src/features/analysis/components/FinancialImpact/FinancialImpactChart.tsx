"use client";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { FinancialImpact } from "../../types/analysis.types";

type props = {
  chart_data: FinancialImpact["timeline"];
};

function FinancialImpactChart({ chart_data }: props) {
  // X Access
  const x_axis = chart_data.map((item) => item.date);

  // Y Access
  const amounts = chart_data.map((item) => item.amount);
  const maxAmount = Math.max(...amounts) + 10000;
  const yAxisMax = Math.ceil(maxAmount / 5000) * 5000;
  const yAxisTicks = Array.from(
    { length: yAxisMax / 5000 + 1 },
    (_, index) => index * 5000,
  );

  return (
    <div className="h-64 w-full mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chart_data}
          margin={{ top: 5, right: 10, bottom: 0, left: 0 }}
        >
          <XAxis
            dataKey="date"
            ticks={x_axis}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            ticks={yAxisTicks}
            domain={[0, maxAmount]}
            tickFormatter={(value: number) => `${value / 1000}k`}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
            width={40}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#111936"
            strokeWidth={4}
            strokeLinecap="round"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default FinancialImpactChart;
