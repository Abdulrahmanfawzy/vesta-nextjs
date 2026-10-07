"use client";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import CardTitle from "./overview-ui/CardTitle";
import image1 from "@/assets/images/Long_Sleeve.png";
import image2 from "@/assets/images/Tween_Girl.png";
import image3 from "@/assets/images/WomenClothing.png";
import { Line, LineChart } from "recharts";

const products = [
  {
    product: "T-Shirt",
    image: image1,
    returns: 150,
    rate: "12%",
    trend: "up",
  },
  {
    product: "Jeans",
    image: image2,
    returns: 120,
    rate: "9%",
    trend: "middle",
  },
  {
    product: "Hoodie",
    image: image3,
    returns: 90,
    rate: "7%",
    trend: "down",
  },
];

function TrendLine({ type }: { type: string }) {
  const paths = {
    up: "M2 20 L7 16 L12 19 L17 13 L22 15 L27 8 L32 12 L37 5 L42 8 L47 2",
    middle: "M2 18 L7 20 L12 12 L17 14 L22 10 L27 12 L32 4 L37 5 L42 2 L47 8",
    down: "M2 3 L7 8 L12 20 L17 15 L22 18 L27 11 L32 20 L37 14 L42 9 L47 16",
  };

  return (
    <svg
      width="48"
      height="24"
      viewBox="0 0 50 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={paths[type as keyof typeof paths]}
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
const data1 = [
  { x: 0, value: 35 },
  { x: 1, value: 48 },
  { x: 2, value: 40 },
  { x: 3, value: 25 },
  { x: 4, value: 20 },
  { x: 5, value: 25 },
  { x: 6, value: 38 },
  { x: 7, value: 28 },
  { x: 8, value: 18 },
  { x: 9, value: 30 },
  { x: 10, value: 20 },
  { x: 11, value: 35 },
];
function TopReturnedProducts() {
  return (
    <Card className="rounded-3xl h-full overflow-x-scroll! md:overflow-x-hidden! w-full border-0 ring-0 shadow-card-shadow">
      <CardContent>
        <CardTitle title="TOP RETURNED PRODUCTS" />

        <div className="w-full  rounded-lg">
          <table border={1} className="w-full border-separate border-spacing-0">
            <thead>
              <tr className="bg-app-neutral rounded-xl text-sm font-medium text-app-primary">
                <th className="px-4 py-2 text-left">Product</th>
                <th className="px-4 py-2 text-center leading-tight">
                  Number of Returns
                </th>
                <th className="px-4 py-2 text-center leading-tight">
                  Return Rate (%)
                </th>
                <th className="px-4 py-2 text-center">Trend</th>
              </tr>
            </thead>

            <tbody className="text-base text-app-primary">
              {products.map((product) => (
                <tr
                  key={product.product}
                  className="border-b border-app-neutral"
                >
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

                  <td className="px-4 py-1.5 text-center text-sm">
                    {product.returns}
                  </td>

                  <td className="px-4 py-1.5   text-center text-sm">
                    {product.rate}
                  </td>

                  <td className="px-4   h-auto  ">
                    <div className={`flex justify-center`}>
                      {/* <TrendLine type={product.trend} /> */}
                      <LineChart width={"25%"} height={"30%"} data={data1}>
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#171b3a"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

export default TopReturnedProducts;
