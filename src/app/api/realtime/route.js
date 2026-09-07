import { addClient, delClient, systemStatus } from "@/lib/realtime";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request) {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      const client = {
        enqueue(data) {
          controller.enqueue(encoder.encode(data));
        },
      };

      addClient(client);

      client.enqueue(
        `data: ${JSON.stringify({
          type: "HEALTH",
          online: systemStatus.isOnline(),
        })}\n\n`,
      );

      const heartbeat = setInterval(() => {
        client.enqueue(": heartbeat\n\n");
      }, 30000);

      request.signal.addEventListener("abort", () => {
        clearInterval(heartbeat);

        delClient(client);

        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",

      "Cache-Control": "no-cache, no-transform",

      Connection: "keep-alive",
    },
  });
}
