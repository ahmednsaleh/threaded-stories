export function trackEvent(event: string, properties?: Record<string, unknown>) {
  if (import.meta.env.DEV) {
    console.log(`[track] ${event}`, properties);
  }
}
