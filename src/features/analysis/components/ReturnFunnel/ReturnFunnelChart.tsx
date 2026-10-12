"use client";

import {
  Cell,
  Funnel,
  FunnelChart,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  Trapezoid,
} from "recharts";
import { ReturnsFunnel } from "../../types/analysis.types";

type Props = {
  data: ReturnsFunnel;
};

type FunnelShapeProps = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  upperWidth?: number;
  lowerWidth?: number;
  fill?: string;
};

const colors = [
  "var(--color-app-primary)",
  "var(--color-app-accent-peach)",
  "var(--color-app-accent-orange)",
  "var(--color-app-neutral)",
];

function CustomShape(props: FunnelShapeProps) {
  const { height, ...prop } = props;

  return <Trapezoid {...prop} height={height ? height - 4 : 0} stroke="none" />;
}

export default function ReturnFunnelChart({ data }: Props) {
  const funnelData = data.stages.map((stage, index) => ({
    name: stage.stage,
    value: stage.count,
    percentage: stage.conversion_rate,
    color: colors[index % colors.length],
  }));

  return (
    <div className="h-55 w-60">
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
            {funnelData.map((item) => (
              <Cell key={item.name} fill={item.color} />
            ))}

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
  );
}
