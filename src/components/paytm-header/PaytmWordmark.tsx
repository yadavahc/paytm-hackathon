import { cn } from "@/components/ui/primitives";

/**
 * The official Paytm logo, served from /public (path set by NEXT_PUBLIC_PAYTM_LOGO_PATH).
 * On dark backgrounds the navy "pay" would disappear, so the logo sits on a small white chip.
 * Without a configured asset, a plain text name is shown — the logo is never recreated.
 */
export function PaytmWordmark({ height = 18, onDark = false, className }: { height?: number; onDark?: boolean; className?: string }) {
  const logo = process.env.NEXT_PUBLIC_PAYTM_LOGO_PATH;
  if (!logo) {
    return (
      <span className={cn("font-extrabold tracking-tight", onDark ? "text-white" : "text-navy", className)} style={{ fontSize: Math.round(height * 1.05) }}>
        Paytm
      </span>
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  const img = <img src={logo} alt="Paytm" width={Math.round(height * 3.18)} height={height} style={{ height, width: "auto" }} className="block select-none" draggable={false} />;
  return onDark ? <span className={cn("inline-flex items-center rounded-md bg-white px-1.5 py-1", className)}>{img}</span> : <span className={cn("inline-flex items-center", className)}>{img}</span>;
}
