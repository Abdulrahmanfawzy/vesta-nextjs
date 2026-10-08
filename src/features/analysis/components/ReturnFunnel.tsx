"use client";
import ChartsCard from "@/components/common/charts/ChartsCard";

import {
  Cell,
  Funnel,
  FunnelChart,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  Trapezoid,
} from "recharts";

const funnelData = [
  {
    name: "Requested",
    value: 1000,
    percentage: 100,
    color: "var(--color-app-primary)",
  },
  {
    name: "Approved",
    value: 800,
    percentage: 80,
    color: "var(--color-app-accent-peach)",
  },
  {
    name: "Shipped Back",
    value: 500,
    percentage: 50,
    color: "var(--color-app-accent-orange)",
  },
  {
    name: "Refunded",
    value: 300,
    percentage: 30,
    color: "var(--color-app-neutral)",
  },
];

// Custom Shape for Funnel card
type FunnelShapeProps = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  upperWidth?: number;
  lowerWidth?: number;
  fill?: string;
};

const CustomShape = (props: FunnelShapeProps) => {
  const { x, y, width, height, upperWidth, lowerWidth, fill } = props;

  return (
    <Trapezoid
      x={x}
      y={y}
      width={width}
      height={height ? height - 4 : 0}
      upperWidth={upperWidth}
      lowerWidth={lowerWidth}
      fill={fill}
      stroke="none"
    />
  );
};

function ReturnFunnel() {
  return (
    <ChartsCard title="RETURN FUNNEL">
      <div className="flex items-center justify-center gap-4">
        {/* Funnel */}
        <div className="h-55 w-70">
          <ResponsiveContainer width="100%" height="100%">
            <FunnelChart>
              <Tooltip />

              <Funnel
                dataKey="value"
                data={funnelData}
                isAnimationActive={false}
                shape={<CustomShape />}
                lastShapeType="rectangle"
              >
                {/* Colors */}
                {funnelData.map((item) => (
                  <Cell key={item.name} fill={item.color} />
                ))}

                {/* Values */}
                <LabelList
                  position="center"
                  fill="#fff"
                  stroke="none"
                  dataKey="value"
                  fontSize={16}
                  fontWeight={600}
                />
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </div>

        {/* Details */}
        <div className="flex flex-col gap-4">
          {funnelData.map((item) => (
            <div key={item.name} className="leading-tight">
              <p className="text-xs font-semibold text-[#17203B]">
                {item.name}
              </p>

              <p className="mt-0.5 text-xs text-[#17203B]">
                {item.value.toLocaleString()} ({item.percentage}%)
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-1 text-base text-[#111111]">
        <p>• Return Process Funnel</p>
        <p>• Conversion Rate Between Stages</p>
      </div>
    </ChartsCard>
  );
}

export default ReturnFunnel;
