"use client";

import { OverviewResponse } from "@/features/overview/types/overview.type";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type PerformanceChartProps = {
  data: OverviewResponse["data"]["performance"]["chart_data"];
  dataKey: keyof OverviewResponse["data"]["performance"]["chart_data"][number];
  selectedIndex?: number;
  gradientId?: string;
  strokeColor?: string;
  fillColor?: string;
};

export default function PerformanceChart({
  data,
  dataKey,
  selectedIndex = 0,
  gradientId = "performanceChartFill",
  strokeColor = "#161C36",
  fillColor = "#D9D9D9",
}: PerformanceChartProps) {
  const selectedPoint = data[selectedIndex];

  return (
    <>
      {/* Chart */}
      <div className=" min-h-37.5 h-full w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 5,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid
              horizontal
              vertical={false}
              stroke={strokeColor}
              strokeDasharray="3"
            />

            <XAxis dataKey="date" hide />

            <YAxis hide domain={["dataMin - 30", "dataMax + 30"]} />

            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                fontSize: "12px",
              }}
            />

            <defs>
              <linearGradient id={gradientId} x1="2" y1="0" x2="2" y2="2">
                <stop offset="14%" stopColor={strokeColor} />
                <stop offset="80%" stopColor={fillColor} stopOpacity={0} />
              </linearGradient>
            </defs>

            {/* Selected vertical line */}
            {selectedPoint && (
              <ReferenceLine
                x={selectedPoint.total}
                stroke={strokeColor}
                strokeWidth={2}
              />
            )}

            {/* Main Area */}
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={strokeColor}
              strokeWidth={2.5}
              fill={`url(#${gradientId})`}
              dot={false}
              activeDot={{
                r: 2,
                fill: strokeColor,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
