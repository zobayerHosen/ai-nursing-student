"use client";

import { useState, useCallback } from "react";
import { generateImage } from "@/services/interactive-tool/ai-visualizer.service";

/**
 * Hook for AI image generation.
 * Provides state management for the generation process including
 * loading states, progress, errors, and the generated result.
 *
 * @returns {Object} { generate, isGenerating, progress, step, result, error, reset }
 */
export function useAIImageGeneration() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const generate = useCallback(async ({ prompt, style, ratio, referenceFile }) => {
    setIsGenerating(true);
    setError(null);
    setProgress(0);
    setResult(null);

    // Simulated generation steps for UI feedback
    const steps = [
      { progress: 15, step: "Analyzing your prompt..." },
      { progress: 30, step: "Understanding context and style preferences..." },
      { progress: 50, step: "Composing visual elements..." },
      { progress: 65, step: "Rendering with AI model..." },
      { progress: 80, step: "Applying artistic refinements..." },
      { progress: 95, step: "Finalizing output..." },
    ];

    // Start the progress animation
    for (const s of steps) {
      setStep(s.step);
      setProgress(s.progress);
      await new Promise((r) => setTimeout(r, 500 + Math.random() * 300));
    }

    try {
      // Call the actual generation service (real API or demo fallback)
      const imageResult = await generateImage({
        prompt,
        style,
        ratio,
        referenceFile,
      });

      setResult(imageResult);
      setProgress(100);
      setStep("Complete!");
      await new Promise((r) => setTimeout(r, 300));
    } catch (err) {
      setError(err.message || "Image generation failed");
      setStep("Failed");
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const reset = useCallback(() => {
    setIsGenerating(false);
    setProgress(0);
    setStep("");
    setResult(null);
    setError(null);
  }, []);

  return {
    generate,
    isGenerating,
    progress,
    step,
    result,
    error,
    reset,
  };
}
