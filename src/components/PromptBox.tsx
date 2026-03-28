import { useState, useRef, useEffect } from "react";
import { Sparkles, ImageIcon, Music, ChevronRight } from "lucide-react";

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
            className="input-glow w-full bg-transparent resize-none rounded-xl px-5 py-4 text-base text-foreground placeholder:text-foreground/30 focus:outline-none"
          />
        </div>

        {/* Suggestions dropdown */}
        {showSuggestions && filtered.length > 0 && (
          <div className="absolute left-0 right-0 top-full mt-2 liquid-glass rounded-xl overflow-hidden z-20 animate-fade-in-up">
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

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button className="btn-gradient-glow flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-foreground/90 hover:text-foreground transition-all duration-250 hover:scale-105 active:scale-95">
          <Sparkles className="w-4 h-4 text-purple-400" />
          Enhance Prompt
        </button>
        <button className="btn-gradient-glow flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-foreground/90 hover:text-foreground transition-all duration-250 hover:scale-105 active:scale-95">
          <ImageIcon className="w-4 h-4 text-blue-400" />
          Generate Image
        </button>
        <button className="btn-gradient-glow flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-foreground/90 hover:text-foreground transition-all duration-250 hover:scale-105 active:scale-95">
          <Music className="w-4 h-4 text-pink-400" />
          Generate Audio
        </button>
      </div>
    </div>
  );
};

export default PromptBox;
