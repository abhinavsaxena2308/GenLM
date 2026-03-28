import { cn } from "@/lib/utils";

export type TabType = "image" | "audio" | "video";

interface TabsSwitcherProps {
  activeTab: TabType;
  onChange: (tab: TabType) => void;
}

const TABS: { id: TabType; label: string }[] = [
  { id: "image", label: "Image" },
  { id: "audio", label: "Audio" },
  { id: "video", label: "Video" },
];

export const TabsSwitcher = ({ activeTab, onChange }: TabsSwitcherProps) => {
  return (
    <div className="flex items-center justify-center p-1 liquid-glass rounded-full max-w-fit mx-auto border border-white/10">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
              isActive ? "text-white" : "text-white/50 hover:text-white/80"
            )}
          >
            {isActive && (
              <div className="absolute inset-0 bg-white/10 rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] origin-center animate-in fade-in zoom-in-95 duration-200" />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};
