import ChartsCard from "@/components/common/charts/ChartsCard";
import ProductTableChart from "@/components/common/charts/ProductTableChart";
import { getReturnByProducts } from "../api/analysis.api";

async function ReturnsByProduct() {
  const { data } = await getReturnByProducts();

  return (
    <ChartsCard
      title="RETURNS BY PRODUCT"
      contentClassName="overflow-x-auto! w-full! min-w-lg"
    >
      <ProductTableChart products={data} />
    </ChartsCard>
  );
}

export default ReturnsByProduct;
