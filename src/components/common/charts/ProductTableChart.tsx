"use client";
import { OverviewResponse } from "@/features/overview/types/overview.type";
import Image, { StaticImageData } from "next/image";
import { Line, LineChart, ResponsiveContainer } from "recharts";

type ProductTableChartProps = {
  products: OverviewResponse["data"]["top_products"];
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
            <tr
              key={product.product_id}
              className="border-b border-app-neutral"
            >
              <td className="px-4 py-1.5">
                <div className="flex items-center gap-3">
                  <div className="relative h-8 w-8 shrink-0">
                    <Image
                      src={product.product_image_url}
                      alt={product.product_name}
                      fill
                      sizes="24px"
                      className="object-cover rounded"
                    />
                  </div>

                  <span className="text-sm text-app-neutral-dark">
                    {product.product_name}
                  </span>
                </div>
              </td>

              <td className="px-4  text-center py-1.5 text-sm">
                {product.number_of_returns}
              </td>

              <td className="px-4 py-1.5 text-center text-sm">
                {product.return_rate}
              </td>

              <td className="w-1/4  py-1.5">
                <div className="h-12 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={product.trend}>
                      <Line
                        type="monotone"
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
