import { NextResponse } from "next/server";
import { llmStatus } from "@/lib/ai/llm";
import { sarvamAvailable } from "@/lib/voice/sarvam";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Reports which capabilities are configured — never the keys themselves.
export function GET() {
  return NextResponse.json({ ...llmStatus(), voice: sarvamAvailable() });
}
