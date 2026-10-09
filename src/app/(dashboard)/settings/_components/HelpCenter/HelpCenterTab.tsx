import Link from "next/link"

const helpCenterLinkClass =
  "border-b-2 border-app-neutral-light pb-4 last:border-b-0";

const helpCenterTextClass =
  "text-[22px] font-medium text-app-primary hover:text-app-primary/80 transition-all duration-300";

const HelpCenterTab = () => {
  return (
    <div className="flex flex-col gap-6 mt-8">
      <Link href="/settings/faq" className={helpCenterLinkClass}>
        <h4 className={helpCenterTextClass}>
          FAQ
        </h4>
      </Link>
      <Link href="/settings/contact-support" className={helpCenterLinkClass}>
        <h4 className={helpCenterTextClass}>
          Contact Support
        </h4>
      </Link>
      <Link href="/settings/support-tickets" className={helpCenterLinkClass}>
        <h4 className={helpCenterTextClass}>
          My Support Tickets
        </h4>
      </Link>
      


    </div>
  )
}

export default HelpCenterTab