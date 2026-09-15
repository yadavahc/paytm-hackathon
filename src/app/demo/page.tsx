import type { Metadata } from "next";
import { LiveApp } from "@/components/app-shell/LiveApp";

export const metadata: Metadata = {
  title: "Maadi · 90-second demo — Paytm Maadi",
  description: "Sales decline → root cause → what-if → approval → campaign → outcome → learning, running in the real app.",
};

export default function DemoPage() {
  return <LiveApp autoplay />;
}
