"use client";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

type Reason = {
  name: string;
  value: number;
  color: string;
};
type ReasonChartProps = {
  ReturnData: Reason[];
};

function ReasonChart({ ReturnData }: ReasonChartProps) {
  return (
    <div className="flex items-center gap-7">
      {/* Donut Chart */}
      <div className="h-30 w-29 shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart className="*:rounded-full">
            <Tooltip
              itemStyle={{ color: "black" }}
              labelStyle={{ color: "black" }}
            />
            <Pie
              data={ReturnData}
              dataKey="value"
              nameKey="name"
              innerRadius={25}
              outerRadius={63}
              startAngle={90}
              endAngle={-270}
              paddingAngle={0}
              stroke="none"
            >
              {ReturnData.map((reason: Reason) => (
                <Cell key={reason.name} fill={reason.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-3">
        {ReturnData.map((reason: Reason) => (
          <div key={reason.name} className="flex items-center gap-2">
            {/* Square */}
            <span
              className="h-5 w-5 shrink-0"
              style={{ backgroundColor: reason.color }}
            />

            {/* Dot + Label */}
            <div className="flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: reason.color }}
              />

              <span className="text-base leading-7 text-[#666666]">
                {reason.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReasonChart;
