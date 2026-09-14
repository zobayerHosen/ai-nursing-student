/**
 * Ensures a given URL uses HTTPS protocol to avoid Mixed Content security errors when deployed on HTTPS (e.g., Vercel).
 * @param {string} url - The target URL from API or source
 * @returns {string} - The HTTPS formatted URL
 */
export function getSecureUrl(url) {
  if (!url) return "";
  const trimmed = String(url).trim();
  if (trimmed.startsWith("http://")) {
    return trimmed.replace(/^http:\/\//i, "https://");
  }
  if (!trimmed.startsWith("https://")) {
    return `https://${trimmed}`;
  }
  return trimmed;
}
