import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Building2, Rocket, Globe, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

const solutions = [
  {
    icon: Building2,
    title: "Enterprise",
    description: "Scale your hiring across departments and geographies with enterprise-grade AI tools, custom integrations, and dedicated support.",
    cta: "Learn More",
  },
  {
    icon: Rocket,
    title: "Startups",
    description: "Move fast without compromising quality. Our AI helps lean teams hire top talent efficiently and competitively.",
    cta: "Learn More",
  },
  {
    icon: Globe,
    title: "Staffing Agencies",
    description: "Serve more clients with fewer resources. Automate candidate matching and placement at scale.",
    cta: "Learn More",
  },
  {
    icon: Briefcase,
    title: "RPO Providers",
    description: "Deliver exceptional results for your clients with AI-augmented recruitment process outsourcing.",
    cta: "Learn More",
  },
];

const Solutions = () => {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 pt-16 md:pt-24 pb-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-hero-heading tracking-tight">
            Solutions
          </h1>
          <p className="text-hero-sub text-lg md:text-xl mt-4 max-w-2xl mx-auto opacity-80">
            Tailored AI solutions for every type of organization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {solutions.map((solution) => (
            <div
              key={solution.title}
              className="liquid-glass rounded-2xl p-8 md:p-10 flex flex-col gap-5 hover:bg-white/[0.03] transition-colors"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <solution.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground">{solution.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-base">{solution.description}</p>
              <Link to="/">
                <Button variant="heroSecondary" size="sm" className="rounded-full mt-2 w-fit">
                  {solution.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Solutions;
