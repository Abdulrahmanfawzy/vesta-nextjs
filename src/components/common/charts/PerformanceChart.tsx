"use client";

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

import { Card, CardContent } from "@/components/ui/card";

type ChartData = {
  date: string;
  [key: string]: string | number;
};

type PerformanceChartProps = {
  data: ChartData[];
  dataKey: string;
  selectedIndex?: number;
  description?: string[];
  gradientId?: string;
  strokeColor?: string;
  fillColor?: string;
};

export default function PerformanceChart({
  data,
  dataKey,
  selectedIndex = 0,
  description = [],
  gradientId = "performanceChartFill",
  strokeColor = "#161C36",
  fillColor = "#D9D9D9",
}: PerformanceChartProps) {
  const selectedPoint = data[selectedIndex];

  return (
    <>
      {/* Chart */}
      <div className="h-22 w-full">
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
                x={selectedPoint.date}
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

      {/* Description */}
      {description.length > 0 && (
        <div className="mt-2 space-y-1 *:flex *:items-center *:gap-1 text-lg text-app-neutral-dark">
          {description.map((item) => (
            <p key={item}>
              <span className="h-1.5 w-1.5 bg-black block rounded-full" />
              {item}
            </p>
          ))}
        </div>
      )}
    </>
  );
}
