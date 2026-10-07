import Link from "next/link"

interface IProps {



}

const HelpCenterTab = ({ }: IProps) => {
  return (
    <div>
      <Link href="/settings/faq">
        <h3>FAQ</h3>
      </Link>
      <Link href="/settings/contact-support">
        <h3>Contact Support</h3>
      </Link>
      <Link href="/settings/support-tickets">
        <h3>My Support Tickets</h3>
      </Link>
      


    </div>
  )
}

export default HelpCenterTab