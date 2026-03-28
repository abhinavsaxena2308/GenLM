import { useState, useRef, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { TabsSwitcher, TabType } from "@/components/TabsSwitcher";
import { ImageOutput } from "@/components/ImageOutput";
import { AudioOutput } from "@/components/AudioOutput";
import { VideoOutput } from "@/components/VideoOutput";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";

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
    <div className="min-h-screen bg-background flex flex-col noise-overlay relative overflow-hidden">
      {/* Focus Mode Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/80 backdrop-blur-md z-30 transition-all duration-700 pointer-events-none",
          isGenerating ? "opacity-100" : "opacity-0"
        )} 
      />

      <div className="relative z-40">
        <Navbar />
      </div>

      {/* Top sticky prompt area */}
      <div className={cn(
        "sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-white/5 pt-28 pb-8 px-4 transition-all duration-500",
        isGenerating && "bg-transparent border-transparent pt-[15vh]" // Moves down slightly in focus mode
      )}>
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          
          {/* Prompt Input */}
          <div ref={wrapperRef} className="relative w-full">
            <div className={cn(
              "liquid-glass rounded-2xl sm:rounded-[2rem] p-2 flex flex-col sm:flex-row gap-3 transition-all duration-500",
              isGenerating ? "shadow-[0_0_80px_rgba(139,92,246,0.3)] scale-[1.02] border-primary/50" : "shadow-xl shadow-black/20"
            )}>
              <textarea
                ref={textareaRef}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onFocus={() => prompt.length >= 2 && setShowSuggestions(true)}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder="What will you create today?"
                className="input-glow w-full bg-transparent resize-none rounded-xl sm:rounded-3xl px-6 py-4 text-lg text-foreground placeholder:text-foreground/40 focus:outline-none min-h-[64px]"
              />
              <button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="btn-gradient-glow shrink-0 w-full sm:w-auto rounded-xl sm:rounded-full px-8 py-4 sm:py-0 font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.02] sm:hover:scale-105 active:scale-95"
              >
                {isGenerating ? (
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce [animation-delay:-.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce [animation-delay:-.3s]" />
                  </span>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate
                  </>
                )}
              </button>
            </div>

            {/* Floating Suggestion Chips (Intelligent UI) */}
            {showSuggestions && prompt.length >= 2 && (
              <div className="absolute left-0 right-0 top-full mt-4 flex flex-wrap gap-2 z-20 animate-fade-in-up">
                {SUGGESTIONS.filter(s => s.toLowerCase().includes(prompt.toLowerCase().slice(-5))).slice(0, 3).map((s, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setPrompt(s);
                      setShowSuggestions(false);
                      textareaRef.current?.focus();
                    }}
                    className="flex-1 min-w-[200px] text-left px-5 py-3 text-sm text-foreground/80 liquid-glass hover:text-white hover:border-primary/50 transition-all duration-300 rounded-xl shadow-xl hover:-translate-y-1 hover:shadow-primary/20 backdrop-blur-3xl"
                  >
                    <span className="line-clamp-2">{s}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Segmented Controls (Tabs) */}
          <div className={cn("transition-all duration-500", isGenerating ? "opacity-0 translate-y-4 pointer-events-none" : "opacity-100")}>
            <TabsSwitcher activeTab={activeTab} onChange={setActiveTab} />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className={cn(
        "flex-1 w-full relative z-20 flex flex-col transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top",
        isGenerating ? "scale-[0.97] opacity-40 blur-[2px] pointer-events-none" : "scale-100 opacity-100 blur-0"
      )}>
        {!submittedPrompt ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 opacity-60 animate-fade-in-up">
            <Sparkles className="w-12 h-12 text-white/20 mb-4" />
            <h2 className="text-xl font-medium text-white/50">Start by entering a prompt above</h2>
            <p className="text-sm text-white/30 mt-2 max-w-sm">
              Your imaginative concepts will be generated here in high fidelity.
            </p>
          </div>
        ) : (
          <div className="w-full flex-1 animate-fade-in-up">
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
