import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Info, ArrowRight, Star, Zap, Layout, ShieldCheck, ZapIcon } from "lucide-react";
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
      description: "For emerging talent beginning their creative journey",
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-white text-[#111111] font-inter antialiased">
      <Helmet>
        <title>Pricing — DripLens</title>
        <meta name="description" content="Choose the perfect DripLens plan for your creative career or brand growth." />
      </Helmet>

      {/* Breadcrumb / Navigation */}
      <div className="border-b border-[#F5F5F5] sticky top-0 z-50 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.4em] font-bold text-[#AAAAAA]">
            DripLens <span className="text-[#EEEEEE]">/</span> Pricing
          </div>
          <div className="flex items-center gap-6">
            <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#AAAAAA]">Need help?</span>
            <Link to="/contact" className="text-[9px] uppercase tracking-[0.3em] font-bold text-black hover:underline underline-offset-4">
              Contact Sales
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-black"></span>
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#AAAAAA]">Strategic Solutions</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-[0.9]">
            Scalable plans for <br />
            modern creative work.
          </h1>
          <p className="text-lg text-[#666666] font-light max-w-xl leading-relaxed">
            Transparent pricing designed to empower both independent creators and global brands to build meaningful partnerships.
          </p>
        </motion.div>
      </section>

      {/* Controls Section */}
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border-y border-[#F5F5F5] py-8">
          {/* Role Toggle */}
          <div className="flex border border-[#EEEEEE] p-1">
            {["creator", "brand"].map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`px-8 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                  selectedRole === role
                    ? "bg-black text-white"
                    : "text-[#AAAAAA] hover:text-black bg-white"
                }`}
              >
                For {role}s
              </button>
            ))}
          </div>

          {/* Annual Toggle */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4">
              <span className={`text-[9px] uppercase tracking-widest font-bold ${!isAnnual ? "text-black" : "text-[#AAAAAA]"}`}>Monthly</span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className="w-10 h-5 border border-[#EEEEEE] relative bg-white"
              >
                <motion.div
                  animate={{ x: isAnnual ? 20 : 0 }}
                  className="w-4 h-full bg-black"
                />
              </button>
              <span className={`text-[9px] uppercase tracking-widest font-bold ${isAnnual ? "text-black" : "text-[#AAAAAA]"}`}>Annual</span>
            </div>
            <span className="px-3 py-1 bg-[#F9F9F9] border border-[#EEEEEE] text-[8px] font-bold uppercase tracking-[0.2em] text-blue-600">
              Save 20%
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-1"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={`${selectedRole}-${plan.name}`}
              variants={itemVariants}
              className={`group relative flex flex-col p-10 border border-[#EEEEEE] hover:border-black transition-all duration-500 ${
                plan.highlighted ? "bg-[#FAFAFA]" : "bg-white"
              }`}
            >
              <div className="mb-10 flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-[#AAAAAA] mb-2">{plan.name}</h3>
                  <p className="text-xs text-[#666666] leading-relaxed max-w-[200px]">
                    {plan.description}
                  </p>
                </div>
                {plan.highlighted && (
                  <span className="text-[8px] font-bold uppercase tracking-widest text-blue-600 flex items-center gap-1.5">
                    <Zap className="w-3 h-3 fill-blue-600" /> Recommended
                  </span>
                )}
              </div>

              <div className="mb-12">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold tracking-tighter">
                    {typeof plan.price[isAnnual ? "annual" : "monthly"] === "number" ? "$" : ""}
                    {plan.price[isAnnual ? "annual" : "monthly"]}
                  </span>
                  {typeof plan.price[isAnnual ? "annual" : "monthly"] === "number" && (
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#AAAAAA]">/ mo</span>
                  )}
                </div>
                <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.4em] text-[#AAAAAA]">
                  {plan.trial}
                </p>
              </div>

              <Link
                to="/auth"
                className={`w-full py-4 text-center text-[9px] font-bold uppercase tracking-[0.4em] border transition-all duration-300 mb-12 ${
                  plan.highlighted
                    ? "bg-black text-white border-black hover:bg-[#222222]"
                    : "bg-white text-black border-[#EEEEEE] hover:border-black"
                }`}
              >
                {plan.cta}
              </Link>

              <div className="flex-grow">
                <h4 className="text-[8px] font-bold uppercase tracking-[0.5em] text-[#AAAAAA] mb-6">Specifications</h4>
                <ul className="space-y-4">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      <Check className="w-3 h-3 text-black mt-0.5 shrink-0" />
                      <span className="text-[10px] uppercase tracking-widest font-bold leading-tight">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Decorative accent for hovered card */}
              <div className="absolute top-0 right-0 w-1 h-0 bg-black group-hover:h-full transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Trust Section */}
      <section className="bg-[#FAFAFA] border-y border-[#F5F5F5] py-12 px-6 overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10 text-center">
           {[
             { icon: <ShieldCheck className="w-6 h-6 mx-auto mb-4" />, title: "Secure Protocol", desc: "Enterprise-grade encryption and secure payment gateways for all transactions." },
             { icon: <ZapIcon className="w-6 h-6 mx-auto mb-4" />, title: "Rapid Onboarding", desc: "Deploy your profile or brief in minutes and start matching instantly." },
             { icon: <Layout className="w-6 h-6 mx-auto mb-4" />, title: "Universal License", desc: "Simplified licensing agreements that protect both creators and brands." }
           ].map((item, i) => (
             <div key={i} className="space-y-4">
                <div className="text-black">{item.icon}</div>
                <h3 className="text-xs font-bold uppercase tracking-[0.3em]">{item.title}</h3>
                <p className="text-xs text-[#666666] leading-relaxed max-w-[250px] mx-auto">{item.desc}</p>
             </div>
           ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 mb-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#AAAAAA] mb-6 flex items-center gap-3">
               <span className="w-8 h-[1px] bg-[#EEEEEE]"></span> FAQ
            </h2>
            <h3 className="text-3xl font-bold tracking-tighter">Common Questions</h3>
          </div>
          
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-black border-l border-black pl-4">
                  {faq.q}
                </h4>
                <p className="text-xs text-[#666666] leading-relaxed pl-4">
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="border border-[#EEEEEE] p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none select-none flex items-center justify-center">
             <span className="text-[15vw] font-bold tracking-tighter leading-none">PRICING</span>
          </div>
          
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter max-w-2xl mx-auto">
              Choose the path that fits your creative vision.
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <Link to="/auth" className="w-full md:w-auto px-12 py-5 bg-black text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#222222] transition-colors">
                Start Free Trial
              </Link>
              <Link to="/contact" className="w-full md:w-auto px-12 py-5 border border-[#EEEEEE] text-[10px] font-bold uppercase tracking-[0.3em] hover:border-black transition-colors bg-white">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
