"use client";
import Image, { StaticImageData } from "next/image";
import { Line, LineChart, ResponsiveContainer } from "recharts";

type TrendData = {
  x: number;
  value: number;
};

type ProductReturn = {
  product: string;
  image: StaticImageData;
  returns: number;
  rate: string;
  trend: TrendData[];
};

type ProductTableChartProps = {
  products: ProductReturn[];
};

function ProductTableChart({ products }: ProductTableChartProps) {
  return (
    <div className="w-full  rounded-lg">
      <table border={1} className="w-full border-separate border-spacing-0">
        <thead>
          <tr className="bg-app-neutral rounded-xl text-sm font-medium text-app-primary">
            <th className="px-2 py-2 text-center">Product</th>
            <th className="px-2 py-2 text-center leading-tight">
              Number of Returns
            </th>
            <th className="px-2 py-2 text-center leading-tight">
              Return Rate (%)
            </th>
            <th className="px-2 py-2 text-center">Trend</th>
          </tr>
        </thead>

        <tbody className="text-base text-app-primary">
          {products.map((product) => (
            <tr key={product.product} className="border-b border-app-neutral">
              <td className="px-4 py-1.5">
                <div className="flex items-center gap-3">
                  <div className="relative h-8 w-6 shrink-0">
                    <Image
                      src={product.image}
                      alt={product.product}
                      fill
                      sizes="24px"
                      className="object-contain"
                    />
                  </div>

                  <span className="text-sm text-app-neutral-dark">
                    {product.product}
                  </span>
                </div>
              </td>

              <td className="px-4  text-center py-1.5 text-sm">
                {product.returns}
              </td>

              <td className="px-4 py-1.5 text-center text-sm">
                {product.rate}
              </td>

              <td className="w-1/4  py-1.5">
                <div className="h-12 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={product.trend}>
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#171b3a"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTableChart;
