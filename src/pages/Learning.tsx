import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { BookOpen, Video, FileText, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const resources = [
  {
    icon: BookOpen,
    category: "Guide",
    title: "Getting Started with AI Recruiting",
    description: "A comprehensive guide to leveraging AI in your talent acquisition strategy.",
    readTime: "8 min read",
  },
  {
    icon: Video,
    category: "Webinar",
    title: "The Future of Talent Acquisition",
    description: "Watch our latest webinar on how AI is reshaping the recruitment landscape.",
    readTime: "45 min watch",
  },
  {
    icon: FileText,
    category: "Case Study",
    title: "How Acme Corp Reduced Time-to-Hire by 60%",
    description: "Learn how a Fortune 500 company transformed their hiring pipeline with Grow.",
    readTime: "5 min read",
  },
  {
    icon: MessageCircle,
    category: "Blog",
    title: "5 AI Recruiting Trends for 2026",
    description: "Stay ahead of the curve with the latest trends in AI-powered recruitment.",
    readTime: "6 min read",
  },
  {
    icon: FileText,
    category: "Whitepaper",
    title: "Eliminating Bias in AI Hiring",
    description: "Our research on building fair, equitable, and transparent AI hiring systems.",
    readTime: "12 min read",
  },
  {
    icon: Video,
    category: "Tutorial",
    title: "Setting Up Your First AI Pipeline",
    description: "A step-by-step video tutorial on configuring automated candidate pipelines.",
    readTime: "20 min watch",
  },
];

const Learning = () => {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 pt-16 md:pt-24 pb-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-hero-heading tracking-tight">
            Learning Center
          </h1>
          <p className="text-hero-sub text-lg md:text-xl mt-4 max-w-2xl mx-auto opacity-80">
            Resources, guides, and insights to help you master AI-powered recruiting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, i) => (
            <div
              key={i}
              className="liquid-glass rounded-2xl p-6 md:p-8 flex flex-col gap-4 hover:bg-white/[0.03] transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-primary uppercase tracking-wider">
                  {resource.category}
                </span>
                <span className="text-xs text-muted-foreground">{resource.readTime}</span>
              </div>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <resource.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {resource.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{resource.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link to="/">
            <Button variant="heroSecondary" className="px-8 py-6">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Learning;
