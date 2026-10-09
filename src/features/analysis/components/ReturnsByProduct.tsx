import image1 from "@/assets/images/Long_Sleeve.png";
import image2 from "@/assets/images/Tween_Girl.png";
import image3 from "@/assets/images/WomenClothing.png";
import ChartsCard from "@/components/common/charts/ChartsCard";
import ProductTableChart from "@/components/common/charts/ProductTableChart";

const data1 = [
  { x: 0, value: 20 },
  { x: 1, value: 16 },
  { x: 2, value: 23 },
  { x: 3, value: 17 },
  { x: 4, value: 31 },
  { x: 5, value: 25 },
  { x: 6, value: 38 },
  { x: 7, value: 32 },
  { x: 8, value: 45 },
  { x: 9, value: 40 },
  { x: 10, value: 55 },
  { x: 11, value: 48 },
  { x: 12, value: 68 },
];
const data2 = [
  { x: 0, value: 20 },
  { x: 1, value: 23 },
  { x: 2, value: 35 },
  { x: 3, value: 52 },
  { x: 4, value: 55 },
  { x: 5, value: 48 },
  { x: 6, value: 35 },
  { x: 7, value: 30 },
  { x: 8, value: 38 },
  { x: 9, value: 52 },
  { x: 10, value: 68 },
];
const data3 = [
  { x: 0, value: 55 },
  { x: 1, value: 62 },
  { x: 2, value: 58 },
  { x: 3, value: 38 },
  { x: 4, value: 18 },
  { x: 5, value: 12 },
  { x: 6, value: 25 },
  { x: 7, value: 18 },
  { x: 8, value: 12 },
  { x: 9, value: 22 },
  { x: 10, value: 35 },
];

const products = [
  {
    product: "T-Shirt",
    image: image1,
    returns: 150,
    rate: "12%",
    trend: data1,
  },
  {
    product: "Jeans",
    image: image2,
    returns: 120,
    rate: "9%",
    trend: data2,
  },
  {
    product: "Hoodie",
    image: image3,
    returns: 90,
    rate: "7%",
    trend: data3,
  },
];
function ReturnsByProduct() {
  return (
    <ChartsCard title="RETURNS BY PRODUCT">
      <ProductTableChart products={products} />
    </ChartsCard>
  );
}

export default ReturnsByProduct;
