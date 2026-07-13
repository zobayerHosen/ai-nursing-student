// ============================================================
//  AI Visualizer Service
//  Generates images from text prompts using OpenAI DALL-E 3.
//  Falls back to demo/simulated responses when no API key
//  is configured or when running in demo mode.
// ============================================================

/**
 * Generate an image from a text prompt using DALL-E 3.
 *
 * @param {Object} params
 * @param {string} params.prompt - The text prompt to generate an image from
 * @param {string} [params.style] - Style hint (realistic, artistic, 3d, sketch, diagram, cartoon)
 * @param {string} [params.ratio] - Aspect ratio (1:1, 16:9, 9:16)
 * @param {File} [params.referenceFile] - Optional reference document/image to guide generation
 * @returns {Promise<{imageUrl: string, revisedPrompt: string, generatedAt: string}>}
 */
export async function generateImage({ prompt, style = "realistic", ratio = "1:1", referenceFile }) {
  const apiKey = typeof window !== "undefined"
    ? (window.__NEXT_DATA__?.env?.NEXT_PUBLIC_OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY)
    : process.env.OPENAI_API_KEY;

  // ─── Demo mode: return a simulated response ────────────────
  if (!apiKey) {
    console.info("[AI Visualizer] No API key found. Returning demo image.");
    return simulateGeneration(prompt, style, ratio);
  }

  try {
    // Build the size from aspect ratio
    const sizeMap = { "1:1": "1024x1024", "16:9": "1792x1024", "9:16": "1024x1792" };
    const size = sizeMap[ratio] || "1024x1024";

    // Enhance prompt with style guidance
    const styleGuide = {
      realistic: "Realistic, photographic quality, highly detailed, natural lighting",
      artistic: "Artistic interpretation, painterly style, expressive colors, creative composition",
      "3d": "3D rendered, volumetric lighting, ray-traced, cinematic quality, depth of field",
      sketch: "Pencil sketch style, hand-drawn look, monochrome with subtle shading, technical drawing quality",
      diagram: "Clear educational diagram style, labeled components, clean lines, white background, infographic quality",
      cartoon: "Cartoon illustration style, vibrant colors, simplified forms, friendly aesthetic, vector art style",
    };

    const enhancedPrompt = styleGuide[style]
      ? `${prompt}\n\nStyle: ${styleGuide[style]}. Educational medical illustration suitable for nursing students.`
      : `${prompt}\n\nEducational medical illustration suitable for nursing students. High quality, detailed.`;

    // ─── Call OpenAI DALL-E 3 API ────────────────────────────
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: enhancedPrompt,
        n: 1,
        size,
        quality: "hd",
        response_format: "b64_json",
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`OpenAI API error (${response.status}): ${errorBody}`);
    }

    const data = await response.json();
    const imageData = data.data?.[0];

    if (!imageData?.b64_json) {
      throw new Error("No image data returned from OpenAI");
    }

    return {
      imageUrl: `data:image/png;base64,${imageData.b64_json}`,
      revisedPrompt: imageData.revised_prompt || prompt,
      generatedAt: new Date().toISOString(),
    };
  } catch (err) {
    console.error("[AI Visualizer] Generation failed:", err);
    // Fallback to simulated generation
    return simulateGeneration(prompt, style, ratio);
  }
}

// ─── Simulated generation for demo mode ──────────────────────────
function simulateGeneration(prompt, style, ratio) {
  // Generate a gradient-based placeholder image
  const gradients = [
    { from: "#7c3aed", via: "#6d28d9", to: "#4f46e5" },
    { from: "#059669", via: "#0891b2", to: "#0284c7" },
    { from: "#d97706", via: "#dc2626", to: "#9333ea" },
    { from: "#2563eb", via: "#7c3aed", to: "#db2777" },
    { from: "#0d9488", via: "#2563eb", to: "#4f46e5" },
    { from: "#ca8a04", via: "#d97706", to: "#dc2626" },
    { from: "#0891b2", via: "#059669", to: "#65a30d" },
    { from: "#9333ea", via: "#db2777", to: "#e11d48" },
  ];

  const gradient = gradients[Math.floor(Math.random() * gradients.length)];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${gradient.from}" />
        <stop offset="50%" style="stop-color:${gradient.via}" />
        <stop offset="100%" style="stop-color:${gradient.to}" />
      </linearGradient>
      <radialGradient id="glow" cx="30%" cy="40%" r="60%">
        <stop offset="0%" style="stop-color:rgba(255,255,255,0.15)" />
        <stop offset="100%" style="stop-color:transparent" />
      </radialGradient>
      <radialGradient id="glow2" cx="70%" cy="60%" r="50%">
        <stop offset="0%" style="stop-color:rgba(255,255,255,0.1)" />
        <stop offset="100%" style="stop-color:transparent" />
      </radialGradient>
    </defs>
    <rect width="1024" height="1024" fill="url(#bg)" />
    <rect width="1024" height="1024" fill="url(#glow)" />
    <rect width="1024" height="1024" fill="url(#glow2)" />
    <g opacity="0.1">
      <circle cx="200" cy="150" r="300" fill="rgba(255,255,255,0.3)" />
      <circle cx="800" cy="800" r="200" fill="rgba(255,255,255,0.2)" />
    </g>
    <g transform="translate(512,420)" text-anchor="middle">
      <rect x="-120" y="-60" width="240" height="120" rx="24" fill="rgba(255,255,255,0.12)" />
      <text x="0" y="-8" font-family="system-ui,sans-serif" font-size="36" font-weight="bold" fill="rgba(255,255,255,0.8)" opacity="0.9">AI</text>
      <text x="0" y="24" font-family="system-ui,sans-serif" font-size="16" fill="rgba(255,255,255,0.5)">${style.toUpperCase()}</text>
    </g>
    <g transform="translate(512,560)" text-anchor="middle">
      <text x="0" y="0" font-family="system-ui,sans-serif" font-size="11" fill="rgba(255,255,255,0.3)">Generated by AI Visualizer</text>
    </g>
  </svg>`;

  const base64 = btoa(unescape(encodeURIComponent(svg)));
  return {
    imageUrl: `data:image/svg+xml;base64,${base64}`,
    revisedPrompt: prompt,
    generatedAt: new Date().toISOString(),
  };
}
