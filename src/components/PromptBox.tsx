import { useState, useRef, useEffect } from "react";
import { Sparkles, ImageIcon, Music, ChevronRight, Loader2, Download, PlayCircle } from "lucide-react";

const STYLE_PRESETS = [
  { label: "✨ Indian Wedding", value: "Indian wedding, vibrant colors, marigold flowers, traditional" },
  { label: "🎬 Cinematic", value: "cinematic, anamorphic lens, film grain, dramatic lighting, 4K" },
  { label: "📦 Product Shoot", value: "product photography, studio lighting, clean white background, commercial" },
  { label: "🌸 Anime", value: "anime style, Studio Ghibli, soft colors, detailed illustration" },
];

const SUGGESTIONS = [
  "A futuristic cityscape at dusk with neon lights...",
  "An Indian bride in golden silk saree, sunset backdrop...",
  "A cinematic portrait of a warrior in a misty forest...",
  "A product shot of a perfume bottle on marble...",
  "An anime girl under cherry blossoms in spring...",
  "Hyperrealistic street food market in Mumbai at night...",
];

const PromptBox = () => {
  const [prompt, setPrompt] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filtered, setFiltered] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Pollinations API States
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (prompt.trim().length >= 2) {
      setFiltered(
        SUGGESTIONS.filter((s) =>
          s.toLowerCase().includes(prompt.toLowerCase().slice(-10))
        ).slice(0, 4)
      );
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [prompt]);

  // Close suggestions on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const appendPreset = (value: string) => {
    setPrompt((prev) => (prev ? `${prev.trimEnd()}, ${value}` : value));
    textareaRef.current?.focus();
  };

  const selectSuggestion = (s: string) => {
    setPrompt(s);
    setShowSuggestions(false);
    textareaRef.current?.focus();
  };

  // API Functions
  const handleEnhance = async () => {
    if (!prompt.trim()) return;
    setIsEnhancing(true);
    setError("");
    try {
      const res = await fetch(`https://text.pollinations.ai/${encodeURIComponent(prompt)}?model=openai`);
      if (!res.ok) throw new Error("Failed to enhance prompt");
      const enhanced = await res.text();
      setPrompt(enhanced);
    } catch (err: any) {
      setError("Error enhancing prompt. Please try again.");
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleGenerateImage = () => {
    if (!prompt.trim()) return;
    setIsGeneratingImage(true);
    setError("");
    setImageUrl("");

    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?model=flux&width=1024&height=1024&nologo=true`;
    
    // Preload image to handle loading state accurately
    const img = new Image();
    img.src = url;
    img.onload = () => {
      setImageUrl(url);
      setIsGeneratingImage(false);
    };
    img.onerror = () => {
      setError("Failed to generate image.");
      setIsGeneratingImage(false);
    };
  };

  const handleGenerateAudio = () => {
    if (!prompt.trim()) return;
    setIsGeneratingAudio(true);
    setError("");
    setAudioUrl("");

    // Pollinations audio URL
    const url = `https://gen.pollinations.ai/audio/${encodeURIComponent(prompt)}?voice=nova`;
    
    // The `<audio>` tag will handle the loading via onLoadedData
    setAudioUrl(url);
    setIsGeneratingAudio(false); 
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-4">
      {/* Style presets */}
      <div className="flex flex-wrap gap-2 justify-center">
        {STYLE_PRESETS.map((preset) => (
          <button
            key={preset.label}
            onClick={() => appendPreset(preset.value)}
            className="px-4 py-1.5 rounded-full text-xs font-medium text-foreground/80 liquid-glass hover:text-foreground transition-all duration-200 hover:scale-105 active:scale-95"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Input box with suggestions */}
      <div ref={wrapperRef} className="relative">
        <div className="liquid-glass rounded-2xl p-1">
          <textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onFocus={() => prompt.length >= 2 && setShowSuggestions(true)}
            rows={4}
            placeholder="Describe anything… cinematic, realistic, Indian, futuristic…"
            className="input-glow w-full bg-transparent resize-none rounded-xl px-5 py-4 text-base text-foreground placeholder:text-foreground/30 focus:outline-none leading-relaxed"
          />
        </div>

        {/* Suggestions dropdown */}
        {showSuggestions && filtered.length > 0 && (
          <div className="absolute left-0 right-0 top-full mt-2 liquid-glass rounded-xl overflow-hidden z-20 animate-fade-in-up shadow-2xl">
            {filtered.map((s, i) => (
              <button
                key={i}
                onClick={() => selectSuggestion(s)}
                className="w-full text-left px-5 py-3 text-sm text-foreground/70 hover:text-foreground hover:bg-white/5 transition-colors flex items-center gap-3 border-b border-white/5 last:border-0"
              >
                <ChevronRight className="w-3.5 h-3.5 text-primary/60 shrink-0" />
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-red-400 text-sm text-center font-medium animate-fade-in-up">
          {error}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center mt-2">
        <button 
          onClick={handleEnhance}
          disabled={!prompt.trim() || isEnhancing}
          className="btn-gradient-glow flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-foreground/90 hover:text-foreground transition-all duration-250 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
        >
          {isEnhancing ? <Loader2 className="w-4 h-4 animate-spin text-purple-400" /> : <Sparkles className="w-4 h-4 text-purple-400" />}
          {isEnhancing ? "Enhancing..." : "Enhance Prompt"}
        </button>
        <button 
          onClick={handleGenerateImage}
          disabled={!prompt.trim() || isGeneratingImage}
          className="btn-gradient-glow flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-foreground/90 hover:text-foreground transition-all duration-250 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
        >
          {isGeneratingImage ? <Loader2 className="w-4 h-4 animate-spin text-blue-400" /> : <ImageIcon className="w-4 h-4 text-blue-400" />}
          {isGeneratingImage ? "Generating..." : "Generate Image"}
        </button>
        <button 
          onClick={handleGenerateAudio}
          disabled={!prompt.trim() || isGeneratingAudio}
          className="btn-gradient-glow flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-foreground/90 hover:text-foreground transition-all duration-250 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
        >
          {isGeneratingAudio ? <Loader2 className="w-4 h-4 animate-spin text-pink-400" /> : <Music className="w-4 h-4 text-pink-400" />}
          Generate Audio
        </button>
      </div>

      {/* Output Render Area */}
      {(imageUrl || audioUrl) && (
        <div className="mt-8 flex flex-col gap-6 items-center w-full animate-fade-in-up">
          {imageUrl && (
            <div className="relative group rounded-2xl overflow-hidden border border-white/10 shadow-2xl max-w-lg w-full bg-black/40">
              <img src={imageUrl} alt={prompt} className="w-full h-auto object-cover max-h-[600px] transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px] flex items-center justify-center gap-4">
                <a href={imageUrl} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full liquid-glass flex items-center justify-center text-white hover:scale-110 transition-transform hover:bg-white/20">
                  <Download className="w-5 h-5" />
                </a>
              </div>
            </div>
          )}

          {audioUrl && (
            <div className="w-full max-w-md liquid-glass rounded-2xl p-4 flex items-center border border-white/10">
              <audio 
                controls 
                autoPlay 
                src={audioUrl} 
                className="w-full h-12 filter invert-[0.8] hue-rotate-180 opacity-90"
                style={{ borderRadius: '8px' }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PromptBox;

