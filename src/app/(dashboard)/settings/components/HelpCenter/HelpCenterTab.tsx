import Link from "next/link"

const helpCenterLinkClass =
  "border-b-2 border-[#D8D8D8] pb-4 last:border-b-0";

const helpCenterTextClass =
  "text-[22px] font-medium text-app-primary hover:text-app-primary/80 transition-all duration-300";

const HelpCenterTab = () => {
  return (
    <div className="flex flex-col gap-6 mt-8">
      <Link href="/settings/faq" className={helpCenterLinkClass}>
        <h3 className={helpCenterTextClass}>
          FAQ
        </h3>
      </Link>
      <Link href="/settings/contact-support" className={helpCenterLinkClass}>
        <h3 className={helpCenterTextClass}>
          Contact Support
        </h3>
      </Link>
      <Link href="/settings/support-tickets" className={helpCenterLinkClass}>
        <h3 className={helpCenterTextClass}>
          My Support Tickets
        </h3>
      </Link>
      


    </div>
  )
}

export default HelpCenterTab