import PromptBox from "@/components/PromptBox";

const AISection = () => {
  return (
    <section className="noise-overlay relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
      {/* Radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,hsl(262_83%_10%/0.8)_0%,hsl(260_87%_3%/1)_70%)] pointer-events-none" />

      {/* Subtle top-center glow orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 text-center w-full">
        {/* Badge */}
        <div className="liquid-glass rounded-full px-4 py-1.5 text-xs font-semibold text-purple-300 tracking-widest uppercase animate-fade-in-up">
          AI Studio · Powered by GenIm
        </div>

        {/* Heading */}
        <h2
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent animate-fade-in-up-delay-1"
          style={{
            backgroundImage: "linear-gradient(135deg, #E8E8E9 0%, #a78bfa 50%, #3A7BBF 100%)",
          }}
        >
          Create. Generate. Dominate.
        </h2>

        {/* Subtext */}
        <p className="text-foreground/50 text-base md:text-lg max-w-lg animate-fade-in-up-delay-2">
          Type once →&nbsp;Generate images, audio, and more
        </p>

        {/* Prompt box */}
        <div className="w-full mt-4 animate-fade-in-up-delay-2">
          <PromptBox />
        </div>
      </div>
    </section>
  );
};

export default AISection;
