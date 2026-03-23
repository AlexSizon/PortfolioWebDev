import { EventEmitter } from "events";

// Singleton in-memory event emitter for SSE broadcasts.
// For multi-instance deployments, replace with Redis pub/sub.
class MenuEventEmitter extends EventEmitter {}

const globalForEmitter = globalThis as unknown as {
  menuEmitter: MenuEventEmitter | undefined;
};

export const menuEmitter =
  globalForEmitter.menuEmitter ??
  new MenuEventEmitter();

// Prevent memory leak warnings for many SSE connections
menuEmitter.setMaxListeners(100);

if (process.env.NODE_ENV !== "production") {
  globalForEmitter.menuEmitter = menuEmitter;
}

export function emitMenuUpdated() {
  menuEmitter.emit("menu-updated");
}
