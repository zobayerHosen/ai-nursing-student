"use client";

import { useState, useRef, useEffect } from "react";
import { useAIImageGeneration } from "@/hooks/interactive-tools/ai-visualizer.hook";
import {
  Sparkles,
  Image as ImageIcon,
  FileText,
  X,
  Loader2,
  Trash2,
  Download,
  Maximize2,
  Palette,
  SlidersHorizontal,
  Wand2,
  Clock,
  CheckCircle2,
  Quote,
  Copy,
  Heart,
  Share2,
} from "lucide-react";
import Image from "next/image";

// ─── Sample prompts for suggestions
const SAMPLE_PROMPTS = [
  { label: "Anatomical heart", text: "Realistic 3D anatomical heart cross-section showing chambers, valves, and blood flow paths, medical illustration style" },
  { label: "Neuron synapse", text: "Detailed neuron synapse firing, neurotransmitter release, vibrant neon colors on dark background, scientific illustration" },
  { label: "DNA helix", text: "Double helix DNA structure with glowing base pairs, abstract scientific visualization, deep blue background" },
  { label: "Lung alveoli", text: "Microscopic view of lung alveoli with oxygen exchange visualization, medical diagram style, soft pastel colors" },
  { label: "Brain lobes", text: "Human brain lobes highlighted with different colors, labeled regions, medical education illustration, clean white background" },
  { label: "Kidney nephron", text: "Cross-section of kidney showing nephron structure, blood flow filtration, detailed medical illustration style" },
];

// ─── Style options 
const STYLE_OPTIONS = [
  { id: "realistic", label: "Realistic", icon: null },
  { id: "artistic", label: "Artistic", icon: null },
  { id: "3d", label: "3D Render", icon: null },
  { id: "sketch", label: "Sketch", icon: null },
  { id: "diagram", label: "Diagram", icon: null },
  { id: "cartoon", label: "Cartoon", icon: null },
];

// ─── Aspect ratios 
const ASPECT_RATIOS = [
  { id: "1:1", label: "Square", dim: "1024×1024" },
  { id: "16:9", label: "Landscape", dim: "1792×1024" },
  { id: "9:16", label: "Portrait", dim: "1024×1792" },
];

// ─── Demo generated images data 
const DEMO_IMAGES = [
  { id: "d1", prompt: "Realistic 3D anatomical heart cross-section showing chambers, valves, and blood flow paths", style: "3d", time: "12s" },
  { id: "d2", prompt: "Double helix DNA structure with glowing base pairs, abstract scientific visualization", style: "artistic", time: "14s" },
  { id: "d3", prompt: "Human brain lobes highlighted with different colors, labeled regions", style: "diagram", time: "10s" },
  { id: "d4", prompt: "Microscopic view of lung alveoli with oxygen exchange visualization", style: "realistic", time: "11s" },
];

// ─── Color palettes for generated images (gradient placeholders) ──
const GRADIENT_COLORS = [
  "from-accent-coral-300 via-accent-coral-500 to-primary-600",
  "from-cyan-400 via-blue-500 to-primary-700",
  "from-accent-teal-300 via-accent-teal-500 to-primary-600",
  "from-accent-amber-300 via-accent-amber-500 to-accent-coral-500",
  "from-primary-300 via-primary-500 to-accent-coral-400",
  "from-sky-400 via-primary-400 to-primary-500",
  "from-lime-400 via-green-500 to-accent-teal-600",
  "from-accent-coral-200 via-accent-coral-400 to-primary-500",
];

// ─── Main Component
export default function VisualizationShell() {
  const [prompt, setPrompt] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState("realistic");
  const [selectedRatio, setSelectedRatio] = useState("1:1");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [activeTab, setActiveTab] = useState("create");
  const fileInputRef = useRef(null);
  const galleryEndRef = useRef(null);

  // ─── Use the AI generation hook
  const { generate, isGenerating, progress: generationProgress, step: generationStep, result, reset: resetGeneration } = useAIImageGeneration();

  // When a result comes back from the hook, add it to the gallery
  useEffect(() => {
    if (result) {
      const newImage = {
        id: Date.now().toString(),
        prompt: result.revisedPrompt || prompt,
        style: selectedStyle,
        ratio: selectedRatio,
        imageUrl: result.imageUrl,
        time: "Just now",
        timestamp: new Date().toLocaleString(),
        file: selectedFile ? selectedFile.name : null,
      };
      setGeneratedImages((prev) => [newImage, ...prev]);
      setPrompt("");
      removeFile();
      resetGeneration();
    }
  }, [result]);

  // Auto-scroll to latest image
  useEffect(() => {
    galleryEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [generatedImages]);

  // ─── File Upload
  const handleFileSelect = (file) => {
    if (!file) return;
    setSelectedFile(file);
    setFileType(file.type);
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setFilePreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
    }
  };

  const handleFileChange = (e) => {
    handleFileSelect(e.target.files?.[0]);
    e.target.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleFileSelect(e.dataTransfer?.files?.[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
    setFileType(null);
  };

  // ─── Generate Image via real API
  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;
    setActiveTab("create");
    await generate({
      prompt: prompt.trim(),
      style: selectedStyle,
      ratio: selectedRatio,
      referenceFile: selectedFile || undefined,
    });
  };

  // ─── Keyboard shortcut 
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && prompt.trim() && !isGenerating) {
      e.preventDefault();
      handleGenerate();
    }
  };

  // ─── Helper to download image 
  const downloadImage = (imageUrl, filename) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = filename || "ai-generated-image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ─── Get gradient fallback for image cards (when no imageUrl) ──
  const getImageGradient = (id) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = ((hash << 5) - hash) + id.charCodeAt(i);
    }
    const idx = Math.abs(hash) % GRADIENT_COLORS.length;
    return GRADIENT_COLORS[idx];
  };

  // ─── Render a generated image card 
  const ImageCard = ({ image, isNew }) => {
    const gradient = getImageGradient(image.id);
    const [isLiked, setIsLiked] = useState(false);
    const hasRealImage = !!image.imageUrl;

    return (
      <div className={`group bg-surfar rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 ${isNew ? "ring-2 ring-primary-400/50 ring-offset-2" : ""}`}>
        {/* Image area */}
        <div className={`relative aspect-4/3 overflow-hidden ${hasRealImage ? "" : `bg-linear-to-br ${gradient}`}`}>
          {hasRealImage ? (
            <>
              <Image
                src={image.imageUrl}
                alt={image.prompt}
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                  <button
                    onClick={() => setFullscreenImage({ type: "real", url: image.imageUrl, style: image.style })}
                    className="flex-1 py-2 px-3 bg-white/20 backdrop-blur-md rounded-xl text-white text-xs font-medium hover:bg-white/30 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Maximize2 size={14} />
                    Preview
                  </button>
                  <button
                    onClick={() => downloadImage(image.imageUrl, `ai-image-${image.id}.png`)}
                    className="p-2 bg-white/20 backdrop-blur-md rounded-xl text-white hover:bg-white/30 transition-colors"
                  >
                    <Download size={14} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Decorative pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%),
                                    radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 50%),
                                    radial-gradient(circle at 50% 80%, rgba(255,255,255,0.15) 0%, transparent 50%)`
                }} />
              </div>
              <div className="relative z-10 flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <ImageIcon size={32} className="text-white" />
                </div>
                <span className="text-xs font-medium text-white/80 bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  {image.style}
                </span>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                  <button
                    onClick={() => setFullscreenImage({ type: "gradient", gradient, style: image.style })}
                    className="flex-1 py-2 px-3 bg-white/20 backdrop-blur-md rounded-xl text-white text-xs font-medium hover:bg-white/30 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Maximize2 size={14} />
                    Preview
                  </button>
                  <button className="p-2 bg-white/20 backdrop-blur-md rounded-xl text-white hover:bg-white/30 transition-colors">
                    <Download size={14} />
                  </button>
                </div>
              </div>
            </>
          )}

          {/* New badge */}
          {isNew && (
            <div className="absolute top-3 right-3 px-2.5 py-1 bg-success-500 text-white text-[10px] font-bold rounded-full flex items-center gap-1 shadow-lg">
              <Sparkles size={10} />
              New
            </div>
          )}
        </div>

        {/* Info area */}
        <div className="p-4">
          <p className="text-sm text-text-primary leading-relaxed line-clamp-2 mb-3">
            {image.prompt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-text-tertiary">
              {image.file && (
                <span className="flex items-center gap-1">
                  <FileText size={12} />
                  {image.file}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {image.time}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-1.5 rounded-lg transition-colors ${isLiked ? "text-accent-coral-500 bg-accent-coral-50" : "text-text-tertiary hover:text-accent-coral-500 hover:bg-accent-coral-50"}`}
              >
                <Heart size={14} fill={isLiked ? "currentColor" : "none"} />
              </button>
              <button className="p-1.5 rounded-lg text-text-tertiary hover:text-primary-600 hover:bg-primary-50 transition-colors">
                <Copy size={14} />
              </button>
              <button className="p-1.5 rounded-lg text-text-tertiary hover:text-primary-600 hover:bg-primary-50 transition-colors">
                <Share2 size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Fullscreen Preview Modal */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setFullscreenImage(null)}
        >
          <button
            onClick={() => setFullscreenImage(null)}
            className="absolute top-4 right-4 p-2.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white backdrop-blur-sm"
          >
            <X size={20} />
          </button>
          {fullscreenImage.type === "real" ? (
            <div
              className="max-w-5xl w-full max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={fullscreenImage.url}
                alt="Full preview"
                className="w-full h-full object-contain max-h-[90vh]"
              />
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/40 backdrop-blur-md rounded-full">
                <p className="text-white/80 text-xs">{fullscreenImage.style}</p>
              </div>
            </div>
          ) : (
            <div
              className={`max-w-3xl w-full aspect-square rounded-3xl bg-linear-to-br ${fullscreenImage.gradient} flex items-center justify-center shadow-2xl overflow-hidden`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 opacity-25" style={{
                backgroundImage: `radial-gradient(circle at 30% 40%, rgba(255,255,255,0.4) 0%, transparent 50%),
                                  radial-gradient(circle at 70% 60%, rgba(255,255,255,0.3) 0%, transparent 50%)`
              }} />
              <div className="relative z-10 text-center">
                <ImageIcon size={80} className="text-white/40 mx-auto mb-4" />
                <p className="text-white/60 text-sm">{fullscreenImage.style} • 1024×1024</p>
              </div>
            </div>
          )}
          {fullscreenImage.type === "real" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                downloadImage(fullscreenImage.url, "ai-image-full.png");
              }}
              className="absolute bottom-6 right-6 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-colors text-white"
              title="Download"
            >
              <Download size={20} />
            </button>
          )}
        </div>
      )}

      <div className="w-full min-h-screen bg-linear-to-br from-surface via-surface-card to-primary-50 flex flex-col">
        {/* Background decorations */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-500/5 rounded-full blur-3xl" />
          <div className="absolute top-1/3 left-[5%] w-48 h-48 bg-accent-amber-400/5 rounded-full blur-3xl" />
        </div>

        {/* Header  */}
        <div className="w-full relative border-b border-gray-300 bg-surface-card/50 backdrop-blur-xl">
          <div className="w-full px-4 sm:px-6">
            <div className="flex items-center justify-between py-4">
              <div>
                <h1 className="text-xl font-bold text-text-primary">AI Visualizer</h1>
                <p className="text-xs text-text-tertiary">Generate images from prompts & documents</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 rounded-full border border-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-medium text-primary-700">Image Gen</span>
                </div>
                {generatedImages.length > 0 && (
                  <button
                    onClick={() => setGeneratedImages([])}
                    className="p-2 text-text-tertiary hover:text-accent-coral-500 hover:bg-accent-coral-50 rounded-xl transition-colors"
                    title="Clear gallery"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-1 pb-3">
              {[
                { id: "create", label: "Create", icon: Wand2 },
                { id: "gallery", label: "Gallery", icon: ImageIcon, count: generatedImages.length },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${activeTab === tab.id
                      ? "bg-primary text-white shadow-md shadow-primary-500/20"
                      : "text-text-secondary hover:text-text-primary hover:bg-surface-hover"
                    }`}
                >
                  <tab.icon size={15} />
                  {tab.label}
                  {tab.count > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? "bg-white/20 text-text-primary" : "bg-border text-text-primary"
                      }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Main Content  */}
        <div className="relative flex-1 overflow-y-auto">
          <div className="w-full px-4 sm:px-6 py-6">

            {activeTab === "create" && (
              <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-6">

                {/* ─── LEFT: Input Area */}
                <div className="space-y-5">

                  {/* Prompt Input */}
                  <div className="bg-surface-card rounded-3xl border border-gray-300 shadow-sm overflow-hidden">
                    <div className="p-5">
                      <label className="flex items-center gap-2 text-sm font-semibold text-text-primary mb-3">
                        <Quote size={14} className="text-primary-500" />
                        Describe your image
                      </label>
                      <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="A detailed anatomical heart with glowing arteries, 3D render, dark background..."
                        className="w-full bg-surface border border-gray-300 rounded-2xl p-4 text-sm text-text-primary placeholder-gray-400 resize-none min-h-30 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all"
                        disabled={isGenerating}
                      />
                    </div>

                    {/* Document Upload */}
                    <div className="px-5 pb-5">
                      {selectedFile ? (
                        <div className="flex items-center gap-3 p-3 bg-primary-50/50 border border-primary-100 rounded-2xl">
                          <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center shrink-0 overflow-hidden">
                            {fileType?.startsWith("image/") && filePreview ? (
                              <Image src={filePreview} alt={selectedFile.name} className="w-full h-full object-cover" />
                            ) : (
                              <FileText size={18} className="text-primary-600" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-text-primary truncate">{selectedFile.name}</p>
                            <p className="text-xs text-text-tertiary">{(selectedFile.size / 1024).toFixed(0)} KB • Reference document</p>
                          </div>
                          <button
                            onClick={removeFile}
                            className="p-1.5 hover:bg-accent-coral-50 text-text-tertiary hover:text-accent-coral-500 rounded-lg transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <div
                          onDrop={handleDrop}
                          onDragOver={handleDragOver}
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center gap-3 p-3 border-2 border-dashed border-gray-300 hover:border-primary-300 hover:bg-primary-50/30 rounded-2xl cursor-pointer transition-all duration-200 group"
                        >
                          <div className="w-10 h-10 rounded-xl bg-surface group-hover:bg-primary-100 flex items-center justify-center shrink-0 transition-colors">
                            <FileText size={18} className="text-text-tertiary group-hover:text-primary-600 transition-colors" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-text-secondary group-hover:text-primary-700 transition-colors">
                              Drop a reference document, or <span className="font-semibold underline underline-offset-2">browse files</span>
                            </p>
                            <p className="text-xs text-text-tertiary mt-0.5">PDF • DOCX • TXT • Images</p>
                          </div>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf,.docx,.doc,.txt,image/*"
                            className="hidden"
                            onChange={handleFileChange}
                          />
                        </div>
                      )}
                    </div>

                    {/* Style & Ratio Selectors */}
                    <div className="px-5 pb-5">
                      <div className="flex items-center justify-between mb-3">
                        <label className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                          <Palette size={14} className="text-primary-500" />
                          Style
                        </label>
                        <button
                          onClick={() => setShowAdvanced(!showAdvanced)}
                          className="flex items-center gap-1 text-xs text-text-tertiary hover:text-primary-600 transition-colors"
                        >
                          <SlidersHorizontal size={12} />
                          {showAdvanced ? "Less" : "Advanced"}
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {STYLE_OPTIONS.map((style) => (
                          <button
                            key={style.id}
                            onClick={() => setSelectedStyle(style.id)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${selectedStyle === style.id
                                ? "bg-primary text-white white shadow-sm shadow-primary-500/20"
                                : "bg-surface text-text-secondary hover:bg-surface-hover border border-gray-300"
                              }`}
                          >
                            {style.label}
                          </button>
                        ))}
                      </div>

                      {showAdvanced && (
                        <div className="mt-4 pt-4 border-t border-gray-300">
                          <label className="flex items-center gap-2 text-sm font-semibold text-text-primary mb-3">
                            <Maximize2 size={14} className="text-primary-500" />
                            Aspect Ratio
                          </label>
                          <div className="flex gap-2">
                            {ASPECT_RATIOS.map((ratio) => (
                              <button
                                key={ratio.id}
                                onClick={() => setSelectedRatio(ratio.id)}
                                className={`flex-1 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 text-center ${selectedRatio === ratio.id
                                    ? "bg-primary text-white shadow-sm shadow-primary-500/20"
                                    : "bg-surface text-text-secondary hover:bg-surface-hover border border-gray-300"
                                  }`}
                              >
                                <span className="block">{ratio.label}</span>
                                <span className="block text-[10px] opacity-70 mt-0.5">{ratio.dim}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Generate Button */}
                    <div className="px-5 pb-5">
                      <button
                        onClick={handleGenerate}
                        disabled={!prompt.trim() || isGenerating}
                        className={`w-full py-3.5 px-5 rounded-2xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2.5 ${isGenerating
                            ? "bg-surface-hover text-text-tertiary cursor-not-allowed"
                            : prompt.trim()
                              ? "bg-primary text-white shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 hover:scale-[1.02] active:scale-[0.98]"
                              : "bg-primary/40 text-text-tertiary"
                          }`}
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Wand2 size={18} />
                            Generate Image
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Sample Prompts */}
                  <div className="bg-surface-card rounded-3xl border border-gray-300 shadow-sm p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles size={14} className="text-accent-amber-500" />
                      <span className="text-sm font-semibold text-text-primary">Try these prompts</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {SAMPLE_PROMPTS.map((sample, idx) => (
                        <button
                          key={idx}
                          onClick={() => setPrompt(sample.text)}
                          className="group text-left px-4 py-3 rounded-2xl bg-surface hover:bg-primary-50 border border-gray-300 hover:border-primary-200 transition-all duration-200"
                        >
                          <span className="text-xs font-semibold text-text-secondary group-hover:text-primary-700 transition-colors">
                            {sample.label}
                          </span>
                          <p className="text-[11px] text-text-tertiary mt-1 line-clamp-1 leading-relaxed">
                            {sample.text.substring(0, 80)}...
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ─── RIGHT: Generation Preview / Demo Gallery ── */}
                <div className="space-y-5">
                  {/* Generation Status */}
                  {isGenerating && (
                    <div className="bg-surface-card rounded-3xl border border-gray-300 shadow-sm p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary-500 to-primary-600 flex items-center justify-center animate-pulse">
                          <Wand2 size={18} className="text-white" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-text-primary">Generating your image</h3>
                          <p className="text-xs text-text-tertiary mt-0.5">{generationStep}</p>
                        </div>
                      </div>
                      {/* Progress bar */}
                      <div className="w-full h-2.5 bg-surface rounded-full overflow-hidden">
                        <div
                          className="h-full bg-linear-to-r from-primary-500 via-primary-500 to-primary-500 rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${generationProgress}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[10px] text-text-tertiary">Processing...</span>
                        <span className="text-[10px] font-medium text-primary-600">{generationProgress}%</span>
                      </div>
                      {/* Step indicators */}
                      <div className="mt-4 space-y-2">
                        {[
                          "Analyzing prompt", "Understanding context", "Composing visuals",
                          "Rendering details", "Applying refinements", "Finalizing",
                        ].map((step, idx) => {
                          const stepProgress = (idx + 1) * (100 / 6);
                          const isDone = generationProgress >= stepProgress;
                          const isCurrent = generationProgress >= stepProgress - 16 && generationProgress < stepProgress;
                          return (
                            <div key={idx} className="flex items-center gap-2">
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isDone ? "bg-success-100 text-success-600" :
                                  isCurrent ? "bg-primary-100 text-primary-600" :
                                    "bg-surface text-text-disabled"
                                }`}>
                                {isDone ? (
                                  <CheckCircle2 size={12} />
                                ) : (
                                  <div className={`w-1.5 h-1.5 rounded-full ${isCurrent ? "bg-primary-500 animate-pulse" : "bg-text-disabled"}`} />
                                )}
                              </div>
                              <span className={`text-xs ${isDone ? "text-text-secondary" :
                                  isCurrent ? "text-primary-700 font-medium" :
                                    "text-text-tertiary"
                                }`}>
                                {step}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Demo Gallery / Latest Generated */}
                  <div className="space-y-4">
                    {(generatedImages.length > 0 || !isGenerating) && (
                      <div className="flex items-center justify-between">
                        <h3 className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                          <ImageIcon size={14} className="text-primary-500" />
                          {generatedImages.length > 0 ? "Generated Images" : "Example Generations"}
                        </h3>
                        {generatedImages.length > 0 && (
                          <span className="text-[10px] text-text-tertiary">{generatedImages.length} image{generatedImages.length > 1 ? "s" : ""}</span>
                        )}
                      </div>
                    )}

                    {/* If user has generated images, show those; otherwise show demo */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {generatedImages.length > 0
                        ? generatedImages.map((img, idx) => (
                          <ImageCard key={img.id} image={img} isNew={idx === 0} />
                        ))
                        : !isGenerating && DEMO_IMAGES.map((img) => (
                          <ImageCard key={img.id} image={img} isNew={false} />
                        ))
                      }
                    </div>

                    {/* Empty state when nothing generated yet and no demo */}
                    {generatedImages.length === 0 && !isGenerating && (
                      <div className="text-center py-8 px-6 bg-surface-card rounded-3xl border border-gray-300 shadow-sm">
                        <div className="w-14 h-14 mx-auto rounded-2xl bg-linear-to-br from-primary-100 to-primary-100 flex items-center justify-center mb-3">
                          <Wand2 size={22} className="text-primary-600" />
                        </div>
                        <p className="text-sm font-medium text-text-primary">Ready to create</p>
                        <p className="text-xs text-text-tertiary mt-1">Write a prompt above and hit Generate to see your images here</p>
                      </div>
                    )}
                  </div>

                  <div ref={galleryEndRef} />
                </div>
              </div>
            )}

            {/* ─── GALLERY TAB ───────────────────────────────── */}
            {activeTab === "gallery" && (
              <div>
                {generatedImages.length > 0 ? (
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <h2 className="text-lg font-bold text-text-primary">Your Gallery</h2>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setGeneratedImages([])}
                          className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-accent-coral-600 hover:bg-accent-coral-50 rounded-xl transition-colors"
                        >
                          <Trash2 size={14} />
                          Clear all
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {generatedImages.map((img, idx) => (
                        <ImageCard key={img.id} image={img} isNew={idx === 0} />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-20 h-20 rounded-3xl bg-linear-to-br from-primary-100 to-primary-100 flex items-center justify-center mb-5 border border-gray-300">
                      <ImageIcon size={36} className="text-primary-600/60" />
                    </div>
                    <h2 className="text-xl font-bold text-text-primary mb-2">No images yet</h2>
                    <p className="text-sm text-text-tertiary max-w-sm mb-6">
                      Go to the Create tab, write a prompt, and generate your first AI image!
                    </p>
                    <button
                      onClick={() => setActiveTab("create")}
                      className="cursor-pointer flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-medium text-sm shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30 hover:scale-[1.02] transition-all duration-200"
                    >
                      <Wand2 size={16} />
                      Start Creating
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>

        {/* ─── Input Bar (sticky bottom) */}
        {activeTab === "create" && (
          <div className="relative border-t border-gray-300/60 bg-surface-card/80 backdrop-blur-xl">
            <div className="w-full px-4 sm:px-6 py-3">
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-surface border border-gray-300 rounded-2xl focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-500/10 transition-all duration-300 overflow-hidden flex items-center">
                  <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a prompt and press Enter to generate..."
                    className="flex-1 bg-transparent border-none outline-none text-sm text-text-primary placeholder-gray-400 px-4 py-3 focus:ring-0"
                    disabled={isGenerating}
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className={`p-2 mr-1 rounded-xl transition-colors ${selectedFile ? "text-primary bg-primary-100" : "text-text-tertiary hover:text-primary-600 hover:bg-primary-50"
                      }`}
                  >
                    <FileText size={16} />
                  </button>
                </div>
                <button
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || isGenerating}
                  className={`cursor-pointer p-3 rounded-2xl transition-all duration-200 flex items-center justify-center ${isGenerating
                      ? "bg-surface-hover text-text-tertiary cursor-not-allowed"
                      : prompt.trim()
                        ? "bg-primary text-white shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30 hover:scale-105"
                        : "bg-primary text-white"
                    }`}
                >
                  {isGenerating ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <Wand2 size={20} />
                  )}
                </button>
              </div>
              {selectedFile && (
                <div className="flex items-center gap-2 mt-2 px-3 py-1.5 bg-primary-50 rounded-xl border border-primary-100">
                  <FileText size={12} className="text-primary-500" />
                  <span className="text-xs text-primary-700 truncate flex-1">{selectedFile.name}</span>
                  <button onClick={removeFile} className="p-0.5 hover:bg-primary-200 rounded transition-colors">
                    <X size={12} className="text-primary-500" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
