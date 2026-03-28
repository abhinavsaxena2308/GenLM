const brands = ["Vortex", "Nimbus", "Prysma", "Cirrus", "Kynder", "Halcyn"];

const LogoItem = ({ name }: { name: string }) => (
  <div className="flex items-center gap-2 md:gap-3 shrink-0">
    <div className="liquid-glass w-6 h-6 rounded-lg flex items-center justify-center text-xs text-foreground font-semibold">
      {name[0]}
    </div>
    <span className="text-sm md:text-base font-semibold text-foreground">{name}</span>
  </div>
);

const SocialProofSection = () => {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative z-10 flex flex-col items-center pt-10 md:pt-16 pb-16 md:pb-24 px-4 gap-12 md:gap-20">
        <div className="max-w-5xl w-full flex flex-col md:flex-row items-center gap-6 md:gap-12">
          <p className="text-foreground/50 text-sm whitespace-nowrap shrink-0 text-center md:text-left">
            Relied on by brands
            <br />
            across the globe
          </p>

          <div className="overflow-hidden w-full flex-1">
            <div className="flex gap-8 md:gap-16 animate-marquee">
              {[...brands, ...brands].map((name, i) => (
                <LogoItem key={`${name}-${i}`} name={name} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialProofSection;
