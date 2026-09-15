"use client";

import { ChartColumn, House, QrCode, Store } from "lucide-react";
import { MaadiMark } from "@/components/ui/ai-bits";
import { cn } from "@/components/ui/primitives";
import { useMaadi } from "@/lib/store/provider";
import type { ScreenName } from "@/lib/store/types";

type Tab = "home" | "business" | "qr" | "insights" | "maadi";

const TAB_OF: Record<ScreenName, Tab | null> = {
  home: "home",
  business: "business",
  sales: "business",
  customers: "business",
  customer: "business",
  inventory: "business",
  cashflow: "business",
  campaigns: "business",
  campaign: "business",
  whatif: "business",
  credit: "business",
  documents: "business",
  catalog: "business",
  qr: "qr",
  beneficiary: "qr",
  insights: "insights",
  history: "insights",
  maadi: "maadi",
  settings: null,
};

export function BottomNav() {
  const { state, navigate } = useMaadi();
  const active = TAB_OF[state.route.name];
  const attention = state.stage === "WAITING_FOR_APPROVAL" || state.stage === "LEARNING";

  const item = (tab: Tab, label: string, icon: React.ReactNode, screen: ScreenName) => (
    <li key={tab} className="flex justify-center">
      <button
        type="button"
        onClick={() => navigate(screen)}
        aria-current={active === tab ? "page" : undefined}
        className={cn("flex min-h-14 w-full flex-col items-center justify-end gap-1 pb-2 text-[11px] font-semibold transition-colors", active === tab ? "text-navy" : "text-faint hover:text-muted")}
      >
        {icon}
        {label}
      </button>
    </li>
  );

  return (
    <nav aria-label="Main" className="relative z-20 shrink-0 border-t border-line bg-white" style={{ paddingBottom: "var(--safe-bottom, 0px)" }}>
      <ul className="grid h-16 grid-cols-5 items-end">
        {item("home", "Home", <House className="size-[22px]" aria-hidden />, "home")}
        {item("business", "Business", <Store className="size-[22px]" aria-hidden />, "business")}
        <li className="flex justify-center">
          <button type="button" onClick={() => navigate("qr")} aria-current={active === "qr" ? "page" : undefined} className="flex flex-col items-center gap-1 pb-2 text-[11px] font-semibold text-navy">
            <span className={cn("-mt-5 grid size-[52px] place-items-center rounded-full text-white shadow-float ring-4 ring-white transition-colors", active === "qr" ? "bg-sky-600" : "bg-navy")}>
              <QrCode className="size-6" aria-hidden />
            </span>
            QR
          </button>
        </li>
        {item("insights", "Insights", <ChartColumn className="size-[22px]" aria-hidden />, "insights")}
        <li className="flex justify-center">
          <button type="button" onClick={() => navigate("maadi")} aria-current={active === "maadi" ? "page" : undefined} aria-label={attention ? "Maadi — needs your attention" : "Maadi"} className="flex min-h-14 w-full flex-col items-center justify-end gap-1 pb-2 text-[11px] font-extrabold text-navy">
            <span className={cn("relative rounded-[30%] transition-shadow", active === "maadi" ? "ring-2 ring-sky ring-offset-2" : "")}>
              <MaadiMark size={26} animated={state.stage !== "IDLE" && state.stage !== "WAITING_FOR_APPROVAL"} />
              {attention && <span className="absolute -right-1 -top-1 size-2.5 rounded-full bg-bad ring-2 ring-white" />}
            </span>
            Maadi
          </button>
        </li>
      </ul>
    </nav>
  );
}
