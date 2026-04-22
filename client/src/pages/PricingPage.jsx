import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Info, ArrowRight, Star, Zap } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function PricingPage() {
  const [selectedRole, setSelectedRole] = useState("creator");
  const [isAnnual, setIsAnnual] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const creatorPlans = [
    {
      name: "Starter",
      price: { monthly: 0, annual: 0 },
      description: "Perfect for beginners exploring the creative landscape",
      features: [
        "Basic portfolio showcase",
        "Up to 5 project uploads",
        "Community access",
        "Basic messaging",
        "Portfolio analytics",
        "Social media linking"
      ],
      cta: "Get Started",
      highlighted: false,
      trial: "Always free"
    },
    {
      name: "Pro",
      price: { monthly: 9.99, annual: 7.99 },
      description: "For active creators looking to scale their reach",
      features: [
        "Everything in Starter",
        "Unlimited project uploads",
        "Advanced analytics",
        "Priority messaging",
        "Featured profile option",
        "Verified badge",
        "Collaboration tools",
        "Brand matching algorithm"
      ],
      cta: "Start Free Trial",
      highlighted: true,
      trial: "14-day free trial"
    },
    {
      name: "Elite",
      price: { monthly: 29.99, annual: 23.99 },
      description: "For professional creators building a business",
      features: [
        "Everything in Pro",
        "Dedicated account manager",
        "Advanced brand matching",
        "Custom profile branding",
        "Export analytics reports",
        "Priority support",
        "Exclusive opportunities",
        "Revenue optimization tools"
      ],
      cta: "Contact Sales",
      highlighted: false,
      trial: "Book a demo"
    }
  ];

  const brandPlans = [
    {
      name: "Startup",
      price: { monthly: 0, annual: 0 },
      description: "For new brands starting their creator discovery",
      features: [
        "Creator search & discovery",
        "Up to 5 searches/month",
        "Basic messaging",
        "Campaign tracking",
        "Portfolio browsing",
        "Community access"
      ],
      cta: "Get Started",
      highlighted: false,
      trial: "Always free"
    },
    {
      name: "Growth",
      price: { monthly: 49.99, annual: 39.99 },
      description: "For scaling brands looking for consistent matches",
      features: [
        "Everything in Startup",
        "Unlimited creator searches",
        "Advanced filtering & matching",
        "Campaign management tools",
        "Collaboration workspace",
        "Analytics dashboard",
        "Priority support",
        "Team accounts (up to 3)"
      ],
      cta: "Start Free Trial",
      highlighted: true,
      trial: "14-day free trial"
    },
    {
      name: "Enterprise",
      price: { monthly: "Custom", annual: "Custom" },
      description: "Tailored solutions for large-scale operations",
      features: [
        "Everything in Growth",
        "Dedicated account manager",
        "Custom integrations",
        "API access",
        "Unlimited team members",
        "Advanced reporting",
        "SLA guarantee",
        "Custom features"
      ],
      cta: "Contact Sales",
      highlighted: false,
      trial: "Talk to expert"
    }
  ];

  const plans = selectedRole === "creator" ? creatorPlans : brandPlans;

  const faqs = [
    {
      q: "Can I change my plan anytime?",
      a: "Yes! Upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle."
    },
    {
      q: "Do you offer refunds?",
      a: "We offer a 30-day money-back guarantee if you're not satisfied with your plan."
    },
    {
      q: "Is there a free trial?",
      a: "Yes, Pro and Growth plans come with a 14-day free trial before charging begins."
    },
    {
      q: "Do you offer discounts for annual billing?",
      a: "Yes! Save 20% when you choose annual billing instead of monthly."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Pricing | DripLens - Plans for Creators & Brands</title>
        <meta name="description" content="Choose the perfect DripLens plan for your creative career or brand growth. Flexible pricing for everyone." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-gray-50 to-transparent -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-black mb-6 tracking-tight">
              Scale your <span className="text-gray-400">vision.</span>
            </h1>
            <p className="text-xl text-brand-body max-w-2xl mx-auto mb-10">
              Transparent pricing designed for creators and brands of all sizes. 
              Find the plan that matches your ambition.
            </p>
          </motion.div>

          {/* Role Toggle */}
          <div className="flex flex-col items-center gap-8 mb-12">
            <div className="flex p-1 bg-gray-100 rounded-none w-fit">
              <button
                onClick={() => setSelectedRole("creator")}
                className={`px-8 py-2.5 rounded-none text-sm font-bold transition-all duration-300 ${
                  selectedRole === "creator"
                    ? "bg-black text-white shadow-lg"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                For Creators
              </button>
              <button
                onClick={() => setSelectedRole("brand")}
                className={`px-8 py-2.5 rounded-none text-sm font-bold transition-all duration-300 ${
                  selectedRole === "brand"
                    ? "bg-black text-white shadow-lg"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                For Brands
              </button>
            </div>

            {/* Annual Toggle */}
            <div className="flex items-center gap-4">
              <span className={`text-sm font-medium ${!isAnnual ? "text-black" : "text-gray-400"}`}>Monthly</span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className="relative w-14 h-7 bg-gray-200 rounded-none p-1 transition-colors duration-300 hover:bg-gray-300"
              >
                <motion.div
                  animate={{ x: isAnnual ? 28 : 0 }}
                  className="w-5 h-5 bg-black rounded-none"
                />
              </button>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-medium ${isAnnual ? "text-black" : "text-gray-400"}`}>Annual</span>
                <span className="bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded-none uppercase tracking-wider">
                  Save 20%
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {plans.map((plan, index) => (
                <motion.div
                  key={`${selectedRole}-${plan.name}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`relative flex flex-col p-8 rounded-none border transition-all duration-500 ${
                    plan.highlighted
                      ? "border-black bg-white text-black shadow-[0_32px_64px_-15px_rgba(0,0,0,0.1)] md:scale-105 z-10"
                      : "border-gray-200 bg-white hover:border-black hover:shadow-xl"
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black border border-white/20 text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl">
                      <Star className="w-3 h-3 fill-white" />
                      Most Popular
                    </div>
                  )}

                  <div className="mb-8">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className={`text-sm ${plan.highlighted ? "text-gray-400" : "text-gray-500"}`}>
                      {plan.description}
                    </p>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-bold">
                        {typeof plan.price[isAnnual ? "annual" : "monthly"] === "number" ? "$" : ""}
                        {plan.price[isAnnual ? "annual" : "monthly"]}
                      </span>
                      {typeof plan.price[isAnnual ? "annual" : "monthly"] === "number" && (
                        <span className={`text-sm ${plan.highlighted ? "text-gray-400" : "text-gray-500"}`}>
                          /mo
                        </span>
                      )}
                    </div>
                    <div className="mt-2 h-5">
                      <p className={`text-[11px] font-medium ${plan.highlighted ? "text-black/60" : "text-black"}`}>
                        {plan.trial}
                      </p>
                    </div>
                  </div>

                  <Link
                    to="/auth"
                    className={`group flex items-center justify-center gap-2 w-full py-4 rounded-none font-bold text-sm transition-all duration-300 mb-10 ${
                      plan.highlighted
                        ? "bg-black text-white hover:bg-black/90"
                        : "bg-black text-white hover:opacity-90"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <div className="flex-grow">
                    <p className={`text-xs font-bold uppercase tracking-widest mb-6 ${plan.highlighted ? "text-black/40" : "text-gray-400"}`}>
                      Includes:
                    </p>
                    <ul className="space-y-4">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <div className={`mt-0.5 p-0.5 rounded-full ${plan.highlighted ? "bg-black/10" : "bg-black/5"}`}>
                            <Check className={`w-3.5 h-3.5 ${plan.highlighted ? "text-black" : "text-black"}`} />
                          </div>
                          <span className={`text-sm ${plan.highlighted ? "text-black/70" : "text-gray-600"}`}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-12 p-8 rounded-none bg-gray-50 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-none shadow-sm">
                <Zap className="w-6 h-6 text-black" />
              </div>
              <div>
                <h4 className="font-bold text-black">Need a custom enterprise solution?</h4>
                <p className="text-sm text-gray-500">Contact our sales team for personalized integration and volume discounts.</p>
              </div>
            </div>
            <Link to="/contact" className="px-8 py-3 bg-white border border-black text-black font-bold rounded-none hover:bg-black hover:text-white transition-all whitespace-nowrap">
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Comparison Link / CTA */}
      <section className="py-16 bg-white text-black text-center border-y border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to evolve?</h2>
          <p className="text-gray-500 text-lg mb-12">
            Join 10,000+ creators and brands who are already scaling their reach on DripLens.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/auth" className="w-full sm:w-auto px-10 py-5 bg-black text-white font-bold rounded-none hover:scale-105 transition-transform">
              Get Started for Free
            </Link>
            <Link to="/features" className="w-full sm:w-auto flex items-center justify-center gap-2 font-bold text-black hover:text-gray-600 transition-colors">
              Explore All Features <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-500">Everything you need to know about our plans and billing.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="space-y-3"
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-none bg-gray-100 flex items-center justify-center mt-1">
                    <Info className="w-4 h-4 text-black" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-black">{faq.q}</h3>
                    <p className="text-gray-600 mt-2 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Support */}
      <div className="bg-gray-50 py-12 border-t border-gray-100 text-center">
        <p className="text-sm text-gray-500">
          Have more questions? <Link to="/support" className="text-black font-bold underline underline-offset-4">Visit our help center</Link> or <Link to="/contact" className="text-black font-bold underline underline-offset-4">contact support</Link>.
        </p>
      </div>
    </div>
  );
}
