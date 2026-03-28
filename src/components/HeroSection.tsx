import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let raf: number;

    const tick = () => {
      if (!video.duration) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const t = video.currentTime;
      const d = video.duration;
      const fadeTime = 0.5;

      if (t < fadeTime) {
        video.style.opacity = String(t / fadeTime);
      } else if (t > d - fadeTime) {
        video.style.opacity = String((d - t) / fadeTime);
      } else {
        video.style.opacity = "1";
      }

      raf = requestAnimationFrame(tick);
    };

    const onEnded = () => {
      video.style.opacity = "0";
      setTimeout(() => {
        video.currentTime = 0;
        video.play();
      }, 100);
    };

    video.addEventListener("ended", onEnded);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      video.removeEventListener("ended", onEnded);
    };
  }, []);

  return (
    <section className="bg-background relative overflow-hidden min-h-screen">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover md:mt-48"
        style={{ opacity: 0 }}
      >
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260308_114720_3dabeb9e-2c39-4907-b747-bc3544e2d5b7.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background/70 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex flex-col items-center pt-28 md:pt-36 px-4">
          <h1
            className="text-[80px] sm:text-[140px] md:text-[180px] lg:text-[230px] font-normal leading-[1.02] tracking-[-0.024em] bg-clip-text text-transparent animate-fade-in-up"
            style={{
              fontFamily: "'General Sans', sans-serif",
              backgroundImage: "linear-gradient(223deg, #E8E8E9 0%, #3A7BBF 104.15%)",
            }}
          >
            GenIm.AI
          </h1>
          <p className="text-hero-sub text-center text-base md:text-lg leading-7 md:leading-8 max-w-md mt-4 opacity-80 px-4 animate-fade-in-up-delay-1">
            The most powerful AI ever deployed
            <br />
            for your imagination
          </p>
          <div className="mt-6 md:mt-8 mb-10 md:mb-[66px] animate-fade-in-up-delay-2 glow-hover rounded-full">
            <Button variant="heroSecondary" className="px-6 py-5 md:px-[29px] md:py-[24px]">
              Create Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
