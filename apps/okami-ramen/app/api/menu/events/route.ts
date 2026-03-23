import { menuEmitter } from "@/lib/menu-events";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const encoder = new TextEncoder();
  let keepaliveInterval: ReturnType<typeof setInterval> | undefined;
  let onMenuUpdated: (() => void) | undefined;

  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(": connected\n\n"));

      onMenuUpdated = () => {
        controller.enqueue(encoder.encode("data: menu-updated\n\n"));
      };

      menuEmitter.on("menu-updated", onMenuUpdated);

      keepaliveInterval = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(": keepalive\n\n"));
        } catch {
          if (keepaliveInterval) clearInterval(keepaliveInterval);
          if (onMenuUpdated) menuEmitter.off("menu-updated", onMenuUpdated);
        }
      }, 30_000);
    },
    cancel() {
      if (keepaliveInterval) clearInterval(keepaliveInterval);
      if (onMenuUpdated) menuEmitter.off("menu-updated", onMenuUpdated);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
