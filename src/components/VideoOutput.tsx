import { Download, Play } from "lucide-react";

interface VideoOutputProps {
  isLoading: boolean;
  prompt: string;
}

const MOCK_VIDEOS = [
  { title: "Sci-Fi Metropolis Aerial", url: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260308_114720_3dabeb9e-2c39-4907-b747-bc3544e2d5b7.mp4" },
  { title: "Abstract Liquid Gold", url: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260308_114720_3dabeb9e-2c39-4907-b747-bc3544e2d5b7.mp4" },
];

export const VideoOutput = ({ isLoading, prompt }: VideoOutputProps) => {
  if (!isLoading && !prompt) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {isLoading
          ? // Skeleton
            Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="aspect-video rounded-3xl bg-white/5 border border-white/10 overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent shimmer-effect" />
              </div>
            ))
          : // Mock Video Cards
            MOCK_VIDEOS.map((video, i) => (
              <div
                key={i}
                className="group relative aspect-video rounded-3xl overflow-hidden border border-white/10 bg-black/40 animate-content-spring transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(139,92,246,0.15)] hover:border-white/30 hover:z-10 flex flex-col justify-end"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <video
                  src={video.url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                {/* Central Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm bg-black/20 pointer-events-none">
                  <div className="w-16 h-16 rounded-full liquid-glass flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform duration-300">
                    <Play className="w-6 h-6 ml-1" />
                  </div>
                </div>

                {/* Bottom Bar Info */}
                <div className="relative z-10 p-5 flex items-end justify-between w-full">
                  <div>
                    <h3 className="text-white font-medium text-lg drop-shadow-md">
                      {video.title}
                    </h3>
                  </div>
                  <button className="h-10 w-10 shrink-0 liquid-glass rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-20 tooltip" title="Download HD">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};
