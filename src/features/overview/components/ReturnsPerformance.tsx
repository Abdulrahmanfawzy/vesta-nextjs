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
import CardTitle from "./overview-ui/CardTitle";

const data = [
  { date: "May 1", returns: 120 },
  { date: "May 5", returns: 115 },
  { date: "May 10", returns: 160 },
  { date: "May 15", returns: 210 },
  { date: "May 20", returns: 220 },
  { date: "May 25", returns: 215 },
  { date: "May 30", returns: 280 },
  { date: "Jun 1", returns: 330 },
];

export default function ReturnsPerformance() {
  const selectedIndex = 6;
  const selectedPoint = data[selectedIndex];

  return (
    <Card className="rounded-3xl ring-0 h-full! border-0 shadow-card-shadow">
      <CardContent>
        {/* Title */}
        <CardTitle title="RETURNS PERFORMANCE" />

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
                stroke="#161C36"
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
                <linearGradient
                  id="returnsPerformanceFill"
                  x1="2"
                  y1="0"
                  x2="2"
                  y2="2"
                >
                  <stop offset="14%" stopColor="#161C36" />
                  <stop offset="80%" stopColor="#D9D9D9" stopOpacity={0} />
                </linearGradient>
              </defs>

              {/* Selected vertical line */}
              <ReferenceLine
                x={selectedPoint.date}
                stroke="#161C36"
                strokeWidth={2}
              />

              {/* Main Area */}
              <Area
                type="monotone"
                dataKey="returns"
                stroke="#161C36"
                strokeWidth={2.5}
                fill="url(#returnsPerformanceFill)"
                dot={false}
                activeDot={{
                  r: 2,
                  fill: "#161C36",
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Description */}
        <div className="mt-2 space-y-1 *:flex *:items-center *:gap-1 text-lg text-app-neutral-dark">
          <p>
            <span className=" h-1.5 w-1.5 bg-black block rounded-full" />
            Returns Over Time(Line Chart)
          </p>
          <p>
            <span className="h-1.5 w-1.5 bg-black block rounded-full" />
            Comparison with Previous Period
          </p>
          <p>
            <span className=" h-1.5 w-1.5 bg-black block rounded-full" />
            Filters (Date Range)
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
