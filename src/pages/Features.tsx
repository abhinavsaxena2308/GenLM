import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Brain, Target, Zap, BarChart3, Users, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Matching",
    description: "Our deep learning algorithms analyze thousands of data points to match candidates with roles they'll thrive in.",
  },
  {
    icon: Target,
    title: "Precision Sourcing",
    description: "Automatically identify and engage top talent from across the web with pinpoint accuracy.",
  },
  {
    icon: Zap,
    title: "Instant Screening",
    description: "Reduce time-to-hire by 80% with automated candidate screening and qualification workflows.",
  },
  {
    icon: BarChart3,
    title: "Predictive Analytics",
    description: "Forecast hiring needs and candidate success rates with data-driven insights.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Seamless collaboration tools for hiring managers, recruiters, and interviewers.",
  },
  {
    icon: Shield,
    title: "Bias Reduction",
    description: "Built-in bias detection and mitigation to ensure fair and equitable hiring practices.",
  },
];

const Features = () => {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 pt-16 md:pt-24 pb-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-hero-heading tracking-tight">
            Powerful Features
          </h1>
          <p className="text-hero-sub text-lg md:text-xl mt-4 max-w-2xl mx-auto opacity-80">
            Everything you need to transform your talent acquisition pipeline with the power of AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="liquid-glass rounded-2xl p-6 md:p-8 flex flex-col gap-4 hover:bg-white/[0.03] transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link to="/">
            <Button variant="heroSecondary" className="px-8 py-6">
              Get Started Today
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Features;
