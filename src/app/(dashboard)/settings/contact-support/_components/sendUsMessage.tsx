'use client'
import CustomSelect from "@/components/common/CustomSelector"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useSendContactMessage } from "@/hooks/useSendContactMessage"
import { useState } from "react"
import { useForm } from "react-hook-form"


const categoryOptions = [
    { value: "Returns", label: "Returns" },
    { value: "Refunds", label: "Refunds" },
    { value: "Reports", label: "Reports" },
    { value: "Accounts", label: "Accounts" },
    { value: "Integrations", label: "Integrations" },
    { value: "Billing", label: "Billing" }
]



const SendUsMessage = () => {

    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

    const {
        register,
        handleSubmit,
        reset,
    } = useForm<{subject: string;message: string;}>();

    const { mutate, isPending } = useSendContactMessage();

    const onSubmit = (values: {subject: string;  message: string;}) => {
        if (!selectedCategory) return;

        mutate(
            {
                category: selectedCategory,
                subject: values.subject,
                message: values.message,
            },
            {
                onSuccess: () => {
                    reset();
                    setSelectedCategory(undefined);
                },
            }
        );
    };

    return (
        <div className="flex w-[64%] flex-col gap-6 border border-app-neutral-light shadow-xs rounded-xl p-6">
            <h3 className="text-2xl font-normal text-app-primary leading-[150%] tracking-[-2.2%]">Sent Us a Message</h3>
            <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="subject"
                        className="text-sm font-medium text-app-primary">Subject</label>
                    <Input
                        type="text"
                        id="subject"

                        placeholder="How can we help you?"
                        {...register("subject", {
                            required: "Subject is required",
                        })}
                        className="bg-white border border-app-neutral-light placeholder:text-gray-400" />
                </div>
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="email"
                        className="text-sm font-medium text-app-primary ">Category</label>
                    <CustomSelect
                        options={categoryOptions}
                        value={selectedCategory}
                        onChange={setSelectedCategory}
                        placeholder="Select a category"
                        getOptionLabel={(option) => option.label}
                        getOptionValue={(option) => option.value} />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-sm font-medium text-app-primary">Message</label>
                    <Textarea id="message"

                        rows={6}
                        placeholder="Describe your issue here..."
                        {...register("message", {
                            required: "Message is required",
                        })}
                        className="border border-gray-200 rounded-lg p-2
                        
                        focus-visible:border-gray-200! focus-visible:ring-2! focus-visible:ring-primary/20!
                        placeholder:text-gray-400">

                    </Textarea>
                </div>
                <button
                    type="submit"
                    disabled={isPending || !selectedCategory}
                    className="bg-app-primary  mx-auto text-white font-semibold py-3 px-12 rounded-lg hover:bg-app-primary/80 transition-all duration-300">
                    {isPending ? "Sending..." : "Send Message"}
                </button>
            </form>

        </div>
    )
}

export default SendUsMessage