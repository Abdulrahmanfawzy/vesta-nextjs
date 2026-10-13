const stats = [
  { label: "Total Refunds", value: "EGP 125.000" },
  { label: "Cost Of Returns", value: "EGP 45.000" },
  { label: "Net Impact", value: "-EGP 170.000" },
  { label: "Return Rate (%)", value: "8.5%" },
];

function FinancialCardList() {
  return (
    <div className=" grid grid-cols-4 justify-center items-center space-x-1.5">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-app-neutral bg-gray-50 px-1 py-2 text-center shadow-card-shadow"
        >
          <p className="text-[10px] font-medium  text-nowrap   text-app-primary">
            {stat.label}
          </p>
          <p className="text-[10px]  text-nowrap text-app-primary">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export default FinancialCardList;
