// ==========================================
// System Status
// ==========================================

class SystemStatus {
  #online = true;

  isOnline() {
    return this.#online;
  }

  setOnline(value) {
    this.#online = value;
  }
}

export const systemStatus = new SystemStatus();

// ==========================================
// Broadcast
// ==========================================

const clients = new Set();

export function addClient(client) {
  clients.add(client);
}
export function delClient(client) {
  clients.delete(client);
}

export const broadcast = (payload) => {
  const message = `data: ${JSON.stringify(payload)}\n\n`;
  for (const client of clients) {
    try {
      client.enqueue(message);
    } catch {
      clients.delete(client);
    }
  }
};

// ==========================================
// System Monitor
// ==========================================

let started = false;

export function startSystemMonitor() {
  if (started) return;
  setInterval(async () => {
    let online = false;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/health`, {
        signal: AbortSignal.timeout(3000),
      });
      online = res.ok;
    } catch (error) {
      online = false;
    }

    const prev = systemStatus.isOnline();

    if (prev === online) return;

    systemStatus.setOnline(online);

    fetchWebhook({ type: "HEALTH", online });
  }, 1000);
  started = true;
}

export async function fetchWebhook(payload) {
  try {
    await fetch(
      `http://localhost:${process.env.PORT || 4000}/api/realtime/webhook`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        cache: "no-store",
      },
    );
  } catch (error) {
    //
  }
}
