export function getEnv(key: string): string | undefined {
  if (typeof window !== "undefined" && window.__ENV__?.[key]) {
    return window.__ENV__[key];
  }
  return (import.meta.env as Record<string, unknown>)[key] as
    | string
    | undefined;
}
