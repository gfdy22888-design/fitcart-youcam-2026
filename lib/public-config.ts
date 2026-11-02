export const API_BASE = import.meta.env.VITE_API_BASE || "";
export const GITHUB_PAGES_ORIGIN = "https://gfdy22888-design.github.io";
export function assetUrl(name: string) {
  return `${import.meta.env.BASE_URL || "/"}assets/${name}`;
}
