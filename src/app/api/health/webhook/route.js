import { systemStatus, broadcast } from "@/lib/health";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const { type, online } = await request.json();

    systemStatus.setOnline(online);

    broadcast({ type, online });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
