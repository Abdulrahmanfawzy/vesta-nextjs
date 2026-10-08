import { Button } from "@/components/ui/button"

const ButtonsSearch = () => {
     const STATUS_FILTERS = [
    { label: "All", value: "" },
    { label: "Pending", value: "pending" },
    { label: "Rejected", value: "rejected" },
    { label: "Accepted", value: "accepted" },
  ] as const;
  const searchparam =new URLSearchParams(window.location.search);
  const activeStatus = searchparam.get("status") ?? "";
    return( 
        <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1.5">
                  {STATUS_FILTERS.map((filter) => (
                    <Button
                      key={filter.label}
                      size="sm"
                      className={` ${
                        filter.label.includes("Pending") ||
                        filter.label.includes("Rejected") ||
                        filter.label.includes("Accepted") ||
                        filter.label.includes("All")
                          ? "px-8"
                          : ""
                      }`}
                      variant={activeStatus === filter.value ? "default" : "outline"}
                      // onClick={() =>
                      //   statusColumn?.setFilterValue(filter.value || undefined)
                      // }
                    >
                      {filter.label}
                    </Button>
                  ))}
                </div>
              </div>
    )
}