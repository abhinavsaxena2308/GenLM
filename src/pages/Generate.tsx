import { useState, useRef, useEffect } from "react";
import { ChevronRight, Sparkles } from "lucide-react";
import { TabsSwitcher, TabType } from "@/components/TabsSwitcher";
import { ImageOutput } from "@/components/ImageOutput";
import { AudioOutput } from "@/components/AudioOutput";
import { VideoOutput } from "@/components/VideoOutput";
import Navbar from "@/components/Navbar";

const SUGGESTIONS = [
  "A futuristic cityscape at dusk with neon lights...",
  "An Indian bride in golden silk saree, sunset backdrop...",
  "A cinematic portrait of a warrior in a misty forest...",
  "A product shot of a perfume bottle on marble...",
];

const Generate = () => {
  const [activeTab, setActiveTab] = useState<TabType>("image");
  const [prompt, setPrompt] = useState("");
  const [submittedPrompt, setSubmittedPrompt] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

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

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setSubmittedPrompt(prompt);
    setShowSuggestions(false);
    setIsGenerating(true);
    
    // Mock API generation delay
    setTimeout(() => {
      setIsGenerating(false);
    }, 2500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col noise-overlay relative">
      <Navbar />

      {/* Top sticky prompt area */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-white/5 pt-28 pb-6 px-4">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          
          {/* Prompt Input */}
          <div ref={wrapperRef} className="relative w-full">
            <div className="liquid-glass rounded-2xl p-1.5 flex flex-col sm:flex-row gap-2 transition-all">
              <textarea
                ref={textareaRef}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onFocus={() => prompt.length >= 2 && setShowSuggestions(true)}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder="What will you create today?"
                className="input-glow w-full bg-transparent resize-none rounded-xl px-5 py-4 text-base text-foreground placeholder:text-foreground/40 focus:outline-none min-h-[60px]"
              />
              <button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="btn-gradient-glow shrink-0 rounded-xl px-8 py-4 font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce [animation-delay:-.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce [animation-delay:-.3s]" />
                  </span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate
                  </>
                )}
              </button>
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && prompt.length >= 2 && (
              <div className="absolute left-0 right-0 top-full mt-2 liquid-glass rounded-xl overflow-hidden z-20 animate-fade-in-up">
                {SUGGESTIONS.filter(s => s.toLowerCase().includes(prompt.toLowerCase().slice(-5))).slice(0, 3).map((s, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setPrompt(s);
                      setShowSuggestions(false);
                      textareaRef.current?.focus();
                    }}
                    className="w-full text-left px-5 py-3 text-sm text-foreground/70 hover:text-foreground hover:bg-white/5 transition-colors flex items-center gap-3 border-b border-white/5 last:border-0"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-primary/60 shrink-0" />
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Segmented Controls (Tabs) */}
          <TabsSwitcher activeTab={activeTab} onChange={setActiveTab} />
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 w-full relative z-10 flex flex-col">
        {!submittedPrompt ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 opacity-60">
            <Sparkles className="w-12 h-12 text-white/20 mb-4" />
            <h2 className="text-xl font-medium text-white/50">Start by entering a prompt above</h2>
            <p className="text-sm text-white/30 mt-2 max-w-sm">
              Your imaginative concepts will be generated here in high fidelity.
            </p>
          </div>
        ) : (
          <div className="w-full flex-1">
            {activeTab === "image" && (
              <ImageOutput isLoading={isGenerating} prompt={submittedPrompt} />
            )}
            {activeTab === "audio" && (
              <AudioOutput isLoading={isGenerating} prompt={submittedPrompt} />
            )}
            {activeTab === "video" && (
              <VideoOutput isLoading={isGenerating} prompt={submittedPrompt} />
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Generate;
