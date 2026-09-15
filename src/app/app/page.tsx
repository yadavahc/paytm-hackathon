import type { Metadata } from "next";
import { LiveApp } from "@/components/app-shell/LiveApp";

export const metadata: Metadata = {
  title: "Maadi · Live application — Paytm Maadi",
  description: "The working Paytm Maadi merchant app (hackathon prototype, demo data).",
};

export default function AppPage() {
  return <LiveApp />;
}
