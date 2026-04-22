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
      <section className="relative pt-20 pb-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-gray-50 to-transparent -z-10" />
        <div className="max-w-6xl mx-auto px-6 text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl md:text-7xl font-bold text-black mb-6 tracking-tighter uppercase">
              Pricing Model
            </h1>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-400 mb-12">
              Corporate Minimalist / Professional SaaS
            </p>
          </motion.div>

          {/* Role Toggle */}
          <div className="flex flex-col items-start gap-8 mb-4">
            <div className="flex p-0 bg-transparent border border-black">
              <button
                onClick={() => setSelectedRole("creator")}
                className={`relative px-8 py-2.5 text-[13px] font-medium uppercase tracking-[0.1em] transition-all duration-300 ${
                  selectedRole === "creator"
                    ? "bg-black text-white"
                    : "text-zinc-500 hover:text-black bg-white"
                }`}
              >
                For Creators
              </button>
              <button
                onClick={() => setSelectedRole("brand")}
                className={`relative px-8 py-2.5 text-[13px] font-medium uppercase tracking-[0.1em] transition-all duration-300 ${
                  selectedRole === "brand"
                    ? "bg-black text-white"
                    : "text-zinc-500 hover:text-black bg-white"
                }`}
              >
                For Brands
              </button>
            </div>

            {/* Annual Toggle */}
            <div className="flex items-center gap-6">
              <span className={`text-[11px] font-medium uppercase tracking-widest transition-colors duration-300 ${!isAnnual ? "text-black" : "text-[#999999]"}`}>Monthly</span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className="group relative w-12 h-6 bg-white border border-[#D1D1D1] p-[2px] transition-all duration-300"
              >
                <motion.div
                  animate={{ x: isAnnual ? 24 : 0 }}
                  transition={{ type: "tween", duration: 0.15, ease: "easeOut" }}
                  className="w-5 h-full bg-black"
                />
              </button>
              <div className="flex items-center gap-4">
                <span className={`text-[11px] font-medium uppercase tracking-widest transition-colors duration-300 ${isAnnual ? "text-black" : "text-[#999999]"}`}>Annual</span>
                <span className="border border-zinc-200 text-zinc-500 text-[9px] font-medium px-2 py-0.5 uppercase tracking-wider">
                  -20%
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="pb-16 px-6 border-t border-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 border-x border-b border-black">
            <AnimatePresence mode="wait">
              {plans.map((plan, index) => (
                <motion.div
                  key={`${selectedRole}-${plan.name}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group relative flex flex-col pt-6 px-8 pb-8 border-black ${
                    index !== 0 ? "md:border-l" : ""
                  } ${
                    plan.highlighted ? "bg-zinc-50" : "bg-white"
                  } hover:bg-[#fcfcfc] transition-all duration-500`}
                >
                  <div className="mb-8 border-b border-zinc-200 pb-6 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold tracking-tighter uppercase">{plan.name}</h3>
                      {plan.highlighted && (
                        <span className="bg-black text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest transition-colors">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-xs uppercase tracking-widest font-medium opacity-60">
                      {plan.description}
                    </p>
                  </div>

                  <div className="mb-10">
                    <div className="flex items-baseline gap-2">
                      <span className="text-6xl font-bold tracking-tighter leading-none transition-transform duration-500 group-hover:scale-105 origin-left">
                        {typeof plan.price[isAnnual ? "annual" : "monthly"] === "number" ? "$" : ""}
                        {plan.price[isAnnual ? "annual" : "monthly"]}
                      </span>
                      {typeof plan.price[isAnnual ? "annual" : "monthly"] === "number" && (
                        <span className="text-sm font-bold uppercase tracking-[0.2em] opacity-40">
                          / mo
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.4em] opacity-60">
                      {plan.trial}
                    </p>
                  </div>

                  <Link
                    to="/auth"
                    className={`flex items-center justify-center gap-3 w-full py-4 font-bold text-xs uppercase tracking-[0.3em] transition-all duration-300 mb-10 border border-black ${
                      plan.highlighted
                        ? "bg-black text-white hover:bg-zinc-800"
                        : "bg-white text-black hover:bg-zinc-50"
                    }`}
                  >
                    {plan.cta}
                  </Link>

                  <div className="flex-grow">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] mb-6 opacity-40">
                      Specifications
                    </h4>
                    <ul className="space-y-4">
                      {plan.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 + featureIndex * 0.05 }}
                          className="flex items-start gap-4 border-b border-zinc-100 group-hover:border-white/10 pb-4 last:border-0 transition-colors"
                        >
                          <div className="w-1 h-1 bg-black mt-2 shrink-0 transition-colors" />
                          <span className="text-xs font-medium tracking-wide uppercase transition-colors">
                            {feature}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>


        </div>
      </section>



      {/* FAQ Section */}
      <section className="pt-16 pb-40 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-16 border-b border-zinc-100 pb-8">
            <h2 className="text-[36px] font-medium text-black tracking-tight">FAQ</h2>
            <p className="text-[11px] font-medium text-[#999999] uppercase tracking-widest max-w-xs md:text-right mb-1">
              Protocol & Billing Information
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-12">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="space-y-3 group"
              >
                <h3 className="text-[14px] font-medium text-black border-l border-zinc-200 pl-6 transition-all">
                  {faq.q}
                </h3>
                <p className="text-[#666666] leading-relaxed text-[13px] font-normal pl-6">
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
}
