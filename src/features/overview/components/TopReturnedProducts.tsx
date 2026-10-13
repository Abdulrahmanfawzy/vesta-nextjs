import ChartsCard from "@/components/common/charts/ChartsCard";
import ProductTableChart from "@/components/common/charts/ProductTableChart";
import { ProductTable } from "@/types/global.type";

function TopReturnedProducts({
  topReturnedProducts,
}: {
  topReturnedProducts: ProductTable[];
}) {
  return (
    <ChartsCard
      title="TOP RETURNED PRODUCTS"
      contentClassName="overflow-x-auto! w-full! min-w-xl"
    >
      <ProductTableChart products={topReturnedProducts} />
    </ChartsCard>
  );
}

export default TopReturnedProducts;
