import ReturnByCustomer from "../components/ReturnByCustomer";
import ReturnByReason from "../components/ReturnByReason";
import ReturnFunnel from "../components/ReturnFunnel";
import ReturnsByProduct from "../components/ReturnsByProduct";
import ReturnsOverTime from "../components/ReturnsOverTime";

function Analysis() {
  return (
    <div className="grid mt-4 grid-cols-12 w-full gap-6">
      <div className="col-span-12   md:col-span-6  lg:col-span-4">
        <ReturnsOverTime />
      </div>
      <div className="col-span-12   md:col-span-6  lg:col-span-4">
        <ReturnByReason />
      </div>
      <div className="col-span-12   md:col-span-6  lg:col-span-4">
        <ReturnByCustomer />
      </div>
      <div className="col-span-12   md:col-span-6  lg:col-span-4">
        <ReturnsByProduct />
      </div>
      <div className="col-span-12   md:col-span-6  lg:col-span-4">
        <ReturnFunnel />
      </div>
    </div>
  );
}

export default Analysis;
