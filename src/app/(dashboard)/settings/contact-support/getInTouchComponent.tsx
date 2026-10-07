import { Clock, Mail, MessagesSquare, Phone } from "lucide-react"
import Link from "next/link"

const supportItems = [
    {
        icon: Mail,
        title: "Email Support",
        description: "support@vesta.com",
    },
    {
        icon: MessagesSquare,
        title: "Live Chat",
        description: "Available 9 AM - 6 PM (Mon-Fri)",
        action: {
            label: "Live Chat",
            href: "/live-chat",
        },
    },
    {
        icon: Phone,
        title: "Phone Support",
        description: "+1 (555) 123-4567",
    },
];

const GetInTouchComponent = () => {
    return (
        <div className="flex w-[34%] flex-col gap-6 border border-app-neutral-light shadow-xs rounded-xl p-6">
            <h3 className="text-2xl font-normal text-app-primary leading-[150%] tracking-[-2.2%]">Get in Touch</h3>
            <p className="text-sm text-[#5E6061]">Our support teams is here to help you with any questions or iseues</p>

            <div className="flex flex-col gap-12 mt-8">
                {supportItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <div key={index} className="flex items-center gap-4" >
                            <span className="bg-[#5E60611A] shadow-[0px_4px_4px_0px_#00000040] p-2 rounded-lg"><Icon className="text-app-accent-peach" /> </span>
                            <div className="flex flex-col">
                                <p className="text-base text-app-primary font-bold">{item.title}</p>
                                <p className="text-sm text-[#5E6061] font-medium">{item.description}</p>
                            </div>
                            {item.action && (
                                <Link
                                    href={item.action.href}
                                    className="text-sm font-bold text-app-primary"
                                >
                                    {item.action.label}
                                </Link>
                            )}
                        </div>
                    );
                })}
                <div className="flex items-center gap-4">

                    <span className="w-fit bg-[#5E60611A] shadow-[0px_4px_4px_0px_#00000040] p-2 rounded-lg "><Clock className="text-app-accent-peach" /> </span>
                    <span className="text-sm text-[#5E6061] font-medium">We typically respond within 24 hours</span>
                </div>
            </div>
        </div>
    )
}

export default GetInTouchComponent