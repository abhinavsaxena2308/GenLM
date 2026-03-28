import { Download, PlayCircle } from "lucide-react";

interface AudioOutputProps {
  isLoading: boolean;
  prompt: string;
}

const MOCK_AUDIOS = [
  { title: "Cinematic Hans Zimmer Style", duration: "0:45" },
  { title: "Lo-Fi Hip Hop Chill Beats", duration: "1:20" },
  { title: "Epic Sci-Fi Trailer Music", duration: "2:05" },
];

export const AudioOutput = ({ isLoading, prompt }: AudioOutputProps) => {
  if (!isLoading && !prompt) return null;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col gap-4">
        {isLoading
          ? // Skeleton
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="w-full h-24 rounded-2xl bg-white/5 border border-white/10 overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent shimmer-effect" />
              </div>
            ))
          : // Mock Audio Cards
            MOCK_AUDIOS.map((track, i) => (
              <div
                key={i}
                className="group w-full liquid-glass rounded-2xl p-4 flex items-center justify-between gap-4 animate-fade-in-up border border-white/10 hover:bg-white/10 transition-colors"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex items-center gap-4 flex-1">
                  <button className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors shrink-0">
                    <PlayCircle className="w-6 h-6" />
                  </button>
                  <div className="flex flex-col gap-1 w-full relative">
                    <span className="text-sm font-semibold text-white/90">
                      {track.title}
                    </span>
                    <span className="text-xs text-white/50">{track.duration}</span>
                    
                    {/* Fake waveform */}
                    <div className="hidden sm:flex items-center gap-[2px] h-6 mt-1 absolute inset-y-0 right-4 top-2 opacity-50">
                      {Array.from({ length: 30 }).map((_, w) => (
                        <div
                          key={w}
                          className="w-1 bg-primary rounded-full"
                          style={{
                            height: `${Math.max(10, Math.random() * 100)}%`,
                            opacity: Math.random() * 0.5 + 0.2,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <button className="p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};
