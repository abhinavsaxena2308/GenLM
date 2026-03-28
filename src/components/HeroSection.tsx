import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-background">
      {/* Cinematic Fullscreen Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4" type="video/mp4" />
      </video>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 pt-32 pb-40 w-full max-w-7xl mx-auto h-full flex-1">
        
        {/* Cinematic Heading */}
        <h1 
          className="text-5xl sm:text-7xl md:text-[140px] leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal text-white animate-fade-rise drop-shadow-2xl"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          GenIm.AI
        </h1>

        {/* Cinematic Subtext */}
        <p className="text-muted-foreground text-base sm:text-2xl max-w-2xl mt-8 leading-relaxed animate-fade-rise-delay">
          The most powerful AI ever deployed. <br/>
          Where dreams rise through the silence.
        </p>

        {/* Liquid Glass CTA */}
        <div className="mt-12 animate-fade-rise-delay-2">
          <Link
            to="/generate"
            className="liquid-glass rounded-full px-14 py-5 text-base sm:text-lg text-foreground hover:scale-[1.03] transition-transform duration-300 inline-block pointer-events-auto"
          >
            Create Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
