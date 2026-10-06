"use client";
import CardTitle from "./overview-ui/CardTitle";
import { Card, CardContent } from "@/components/ui/card";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const returnReasons = [
  {
    name: "Product Defect",
    value: 45,
    color: "var(--color-app-primary)",
  },
  {
    name: "Wrong Size",
    value: 30,
    color: "var(--color-app-accent-peach)",
  },
  {
    name: "Wrong Product",
    value: 10,
    color: "var(--color-app-accent-orange)",
  },
  {
    name: "Customer Changed Mind",
    value: 8,
    color: "var(--color-app-neutral-light)",
  },
  {
    name: "Other",
    value: 7,
    color: "var(--color-app-neutral)",
  },
];

function ReturnReason() {
  return (
    <Card className="rounded-3xl h-full! border-0 ring-0 shadow-card-shadow">
      <CardContent>
        <CardTitle title="RETURN REASONS" />

        <div className="flex items-center gap-7">
          {/* Donut Chart */}
          <div className="h-30 w-29 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart className="*:rounded-full">
                <Pie
                  data={returnReasons}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={25}
                  outerRadius={63}
                  startAngle={90}
                  endAngle={-270}
                  paddingAngle={0}
                  stroke="none"
                >
                  {returnReasons.map((reason) => (
                    <Cell key={reason.name} fill={reason.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex flex-col gap-3">
            {returnReasons.map((reason) => (
              <div key={reason.name} className="flex items-center gap-2">
                {/* Square */}
                <span
                  className="  h-5 w-5 shrink-0"
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
      </CardContent>
    </Card>
  );
}

export default ReturnReason;
