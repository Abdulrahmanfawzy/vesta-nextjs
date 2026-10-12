import ChartsCard from "@/components/common/charts/ChartsCard";
import ProductTableChart from "@/components/common/charts/ProductTableChart";
import { OverviewResponse } from "../types/overview.type";

function TopReturnedProducts({
  topReturnedProducts,
}: {
  topReturnedProducts: OverviewResponse["data"]["top_products"];
}) {
  return (
    <ChartsCard title="TOP RETURNED PRODUCTS">
      <ProductTableChart products={topReturnedProducts} />
    </ChartsCard>
  );
}

export default TopReturnedProducts;
