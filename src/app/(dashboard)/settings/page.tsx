import CustomTabs from "@/components/common/CustomTabs"

interface IProps {



}
const tabs = [
    {
        value: 'setting', label: 'Setting', content: <div>Setting Content</div>
    },
    {
        value: 'Help center', label: 'Help Center', content: <div>Help Center Content</div>
    }
]
const page = ({ }: IProps) => {
    return (
        <div className="flex flex-col gap-6 ml-34.5 mt-26">


            <CustomTabs tabs={tabs} />
        </div>
    )
}

export default page