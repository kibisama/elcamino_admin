import { systemStatus, broadcast } from "@/lib/realtime";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const payload = await request.json();
    if (payload.type === "HEALTH") systemStatus.setOnline(online);

    broadcast(payload);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
