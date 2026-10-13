import type { Metadata } from "next";
import FaqView from "./FaqView";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions and guides about Vesta returns, refunds, reports, and integrations.",
};

export default function FaqPage() {
  return <FaqView />;
}