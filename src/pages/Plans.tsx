import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    price: "$99",
    period: "/month",
    description: "Perfect for small teams getting started with AI recruiting.",
    features: [
      "Up to 5 active job postings",
      "AI candidate matching",
      "Basic analytics",
      "Email support",
    ],
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$299",
    period: "/month",
    description: "For growing teams that need advanced AI capabilities.",
    features: [
      "Unlimited job postings",
      "Advanced AI matching & scoring",
      "Predictive analytics",
      "Team collaboration tools",
      "Priority support",
      "Custom integrations",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Full-scale AI recruitment for large organizations.",
    features: [
      "Everything in Professional",
      "Dedicated account manager",
      "Custom AI model training",
      "SSO & advanced security",
      "SLA guarantees",
      "On-premise deployment option",
    ],
    highlighted: false,
  },
];

const Plans = () => {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 pt-16 md:pt-24 pb-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-hero-heading tracking-tight">
            Plans & Pricing
          </h1>
          <p className="text-hero-sub text-lg md:text-xl mt-4 max-w-2xl mx-auto opacity-80">
            Choose the plan that fits your hiring needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 flex flex-col gap-6 transition-colors ${
                plan.highlighted
                  ? "bg-primary/10 border border-primary/30"
                  : "liquid-glass hover:bg-white/[0.03]"
              }`}
            >
              <div>
                <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-hero-heading">{plan.price}</span>
                  {plan.period && (
                    <span className="text-muted-foreground">{plan.period}</span>
                  )}
                </div>
                <p className="text-muted-foreground mt-3 text-sm">{plan.description}</p>
              </div>

              <ul className="flex flex-col gap-3 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-foreground/80">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link to="/">
                <Button
                  variant={plan.highlighted ? "hero" : "heroSecondary"}
                  className="w-full rounded-full py-5"
                >
                  {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Plans;
