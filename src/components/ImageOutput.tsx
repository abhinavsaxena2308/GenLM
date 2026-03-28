import { Download, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageOutputProps {
  isLoading: boolean;
  prompt: string;
}

// Mock generated images
const MOCK_IMAGES = [
  "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
];

export const ImageOutput = ({ isLoading, prompt }: ImageOutputProps) => {
  if (!isLoading && !prompt) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-fr">
        {isLoading
          ? // Skeletons
            Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-2xl bg-white/5 border border-white/10 overflow-hidden animate-pulse relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent shimmer-effect" />
              </div>
            ))
          : // Mock Images
            MOCK_IMAGES.map((src, i) => (
              <div
                key={i}
                className="group relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-black/20 animate-content-spring transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(139,92,246,0.15)] hover:border-white/20 hover:z-10"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <img
                  src={src}
                  alt={`Generated image ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                />
                
                {/* Glassmorphism Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px] flex items-center justify-center gap-4">
                  <button className="w-10 h-10 rounded-full liquid-glass flex items-center justify-center text-white hover:scale-110 transition-transform hover:bg-white/20">
                    <ZoomIn className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 rounded-full liquid-glass flex items-center justify-center text-white hover:scale-110 transition-transform hover:bg-white/20">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};
