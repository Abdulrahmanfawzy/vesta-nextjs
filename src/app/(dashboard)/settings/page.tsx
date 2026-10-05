'use client'
import CustomSelect from "@/components/common/CustomSelector";
import CustomTabs from "@/components/common/CustomTabs";
import { useState } from "react";

const tabs = [
    {
        value: 'setting', label: 'Setting', content: <div>Setting Content</div>
    },
    {
        value: 'Help center', label: 'Help Center', content: <div>Help Center Content</div>
    }
]
const status = [
  {
    id: "1",
    name: "completed",
  },
  {
    id: "2",
    name: "pending",
  },
   {
    id: "3",
    name: "rejected",
  },
];

const Page = () => {
    const [selectedStatus, setSelectedStatus] = useState("");

    return (
        <div className="flex flex-col gap-6 ml-34.5 mt-26">
            <CustomTabs tabs={tabs} />
            <CustomSelect
                options={status}
                value={selectedStatus}
                onChange={setSelectedStatus}
                getOptionLabel={(status) => status.name} 
                getOptionValue={(status) => status.id}
                placeholder="All status"
                className="w-45"  // style it as you like
            />
        </div>
    )
}

export default Page;