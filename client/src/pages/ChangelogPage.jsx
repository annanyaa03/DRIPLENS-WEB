import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function ChangelogPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const releases = [
    {
      version: "v2.8.0",
      date: "April 25, 2026",
      tag: "Feature Release",
      updates: [
        {
          type: "feature",
          title: "Creator Onboarding & Dashboards",
          description: "Added a new creator onboarding flow, messaging buttons, and major dashboard updates for an enhanced user experience."
        },
        {
          type: "improvement",
          title: "UI Redesign & Landing Page",
          description: "Updated LandingPage, AuthPage, and introduced a unified agency design system for improved aesthetics."
        }
      ]
    },
    {
      version: "v2.7.0",
      date: "April 24, 2026",
      tag: "Security Phase",
      updates: [
        {
          type: "security",
          title: "Auth & Server Overhaul",
          description: "Updated authentication schemas, services, and server middlewares to bolster security and stability."
        },
        {
          type: "improvement",
          title: "API & Client Optimizations",
          description: "Refined client pages, creator portals, API routing, and environment configurations."
        },
        {
          type: "integration",
          title: "Documentation Revamp",
          description: "Comprehensive updates to the README with in-depth documentation and security details."
        }
      ]
    },
    {
      version: "v2.6.0",
      date: "April 23, 2026",
      tag: "Major Release",
      updates: [
        {
          type: "feature",
          title: "Real-time Messaging & Discovery",
          description: "Implemented real-time messaging capabilities and advanced creator discovery with comprehensive filtering."
        },
        {
          type: "improvement",
          title: "Redesigned Pricing Page",
          description: "A fresh new look and functionality for the platform's pricing tier selections."
        }
      ]
    },
    {
      version: "v2.5.0",
      date: "April 15, 2024",
      tag: "Major Release",
      updates: [
        {
          type: "feature",
          title: "Advanced Analytics Dashboard",
          description: "New comprehensive analytics showing detailed insights into your profile views, engagement, and potential brand matches."
        },
        {
          type: "feature",
          title: "Portfolio Recommendations",
          description: "AI-powered recommendations suggest what content to add to your portfolio based on trending niches and brand needs."
        },
        {
          type: "improvement",
          title: "Performance Improvements",
          description: "Optimized page load times by 40% with new caching strategies and CDN implementation."
        },
        {
          type: "bug",
          title: "Fixed messaging notifications",
          description: "Resolved issues with missing notifications in messaging conversations."
        }
      ]
    },
    {
      version: "v2.4.3",
      date: "April 8, 2024",
      tag: "Patch Release",
      updates: [
        {
          type: "improvement",
          title: "Enhanced Mobile UX",
          description: "Improved responsive design for better mobile experience across all pages."
        },
        {
          type: "bug",
          title: "Fixed profile image upload",
          description: "Resolved issues where profile images weren't displaying correctly on some devices."
        },
        {
          type: "security",
          title: "Security Updates",
          description: "Applied important security patches and updated dependencies."
        }
      ]
    },
    {
      version: "v2.4.0",
      date: "March 31, 2024",
      tag: "Feature Release",
      updates: [
        {
          type: "feature",
          title: "Verified Badge System",
          description: "New verification process for creators with 100k+ followers or established portfolio history."
        },
        {
          type: "feature",
          title: "Collaboration Tools",
          description: "Team workspace feature allowing creators to collaborate on projects and share portfolios."
        },
        {
          type: "improvement",
          title: "Search Filters",
          description: "Advanced filtering options for finding creators by niche, engagement rate, and audience size."
        }
      ]
    },
    {
      version: "v2.3.0",
      date: "March 15, 2024",
      tag: "Feature Release",
      updates: [
        {
          type: "feature",
          title: "Brand Matching Algorithm v2",
          description: "Improved algorithm taking into account engagement quality, audience demographics, and brand fit."
        },
        {
          type: "integration",
          title: "Google Analytics Integration",
          description: "Direct integration with Google Analytics to track website performance and referral traffic."
        },
        {
          type: "improvement",
          title: "Export Reports",
          description: "Download analytics reports as PDF for sharing with potential brand partners."
        }
      ]
    },
    {
      version: "v2.2.0",
      date: "February 28, 2024",
      tag: "Feature Release",
      updates: [
        {
          type: "feature",
          title: "Real-time Notifications",
          description: "Instant notifications for messages, profile views, and brand interest."
        },
        {
          type: "feature",
          title: "Campaign Management",
          description: "For brands: Create and manage influencer campaigns directly in the platform."
        }
      ]
    },
    {
      version: "v2.1.0",
      date: "February 1, 2024",
      tag: "Feature Release",
      updates: [
        {
          type: "feature",
          title: "Multi-platform Portfolio",
          description: "Ability to connect and display content from multiple social media platforms simultaneously."
        },
        {
          type: "improvement",
          title: "Search Performance",
          description: "Faster search results with improved indexing and caching."
        }
      ]
    }
  ];

  const getTagColor = (type) => {
    switch (type) {
      case "feature":
        return "bg-blue-50 text-blue-700 border border-blue-100";
      case "improvement":
        return "bg-emerald-50 text-emerald-700 border border-emerald-100";
      case "bug":
        return "bg-rose-50 text-rose-700 border border-rose-100";
      case "security":
        return "bg-amber-50 text-amber-700 border border-amber-100";
      case "integration":
        return "bg-violet-50 text-violet-700 border border-violet-100";
      default:
        return "bg-gray-50 text-gray-700 border border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-20">
      {/* Header Section */}
      <header className="bg-white border-b border-[#EEEEEE] py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block px-3 py-1 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-none mb-6">
            Updates & Releases
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-black mb-6 tracking-tight">
            Changelog
          </h1>
          <p className="text-xl text-[#666666] max-w-2xl leading-relaxed">
            Stay in the loop with the latest features, performance improvements, and bug fixes we've shipped to make Driplens better for you.
          </p>
        </div>
      </header>

      {/* Timeline Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA]">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-0 sm:left-1/2 top-0 bottom-0 w-px bg-[#EEEEEE] transform sm:-translate-x-1/2 hidden sm:block"></div>

            <div className="space-y-24">
              {releases.map((release, index) => (
                <div key={release.version} className="relative">
                  {/* Version Circle */}
                  <div className="absolute left-0 sm:left-1/2 top-0 w-3 h-3 rounded-none bg-white border-2 border-black transform sm:-translate-x-1/2 z-10 hidden sm:block"></div>

                  <div className="flex flex-col gap-8 pt-6">
                    {/* Date & Title */}
                    <div className="flex flex-col sm:items-center text-left sm:text-center mb-4">
                      <span className="text-sm font-medium text-[#999999] mb-2">{release.date}</span>
                      <h2 className="text-3xl font-bold text-black flex items-center justify-start sm:justify-center gap-3">
                        {release.version}
                        <span className="px-2 py-0.5 bg-zinc-100 text-[#666666] text-[10px] font-bold uppercase tracking-wider rounded-none">
                          {release.tag}
                        </span>
                      </h2>
                    </div>

                    {/* Updates Cards */}
                    <div className="grid grid-cols-1 gap-6">
                      {release.updates.map((update, idx) => (
                        <div 
                          key={idx} 
                          className="group bg-white p-6 sm:p-8 rounded-none border border-[#EEEEEE] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                        >
                          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                            <span className={`px-3 py-1 rounded-none text-[10px] font-bold uppercase tracking-wider whitespace-nowrap mt-1 ${getTagColor(update.type)}`}>
                              {update.type}
                            </span>
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-black mb-2 group-hover:text-black transition-colors">
                                {update.title}
                              </h3>
                              <p className="text-[#666666] leading-relaxed">
                                {update.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Subscription CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-[#EEEEEE] bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden bg-black rounded-none p-8 sm:p-16 text-center">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-zinc-800 rounded-none blur-[80px] opacity-50"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-zinc-800 rounded-none blur-[80px] opacity-50"></div>

            <div className="relative z-10">
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Never miss an update
              </h3>
              <p className="text-zinc-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                Stay informed about new features and improvements. We'll send you a brief summary of what's new once a month.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-6 py-4 rounded-none bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-white text-black font-bold rounded-none hover:bg-zinc-100 transition-all duration-300 transform active:scale-95"
                >
                  Subscribe
                </button>
              </form>
              
              <p className="mt-6 text-zinc-500 text-xs">
                No spam, ever. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Navigation */}
      <div className="py-12 text-center bg-[#FAFAFA]">
        <Link 
          to="/" 
          className="text-sm font-medium text-[#999999] hover:text-black transition-colors"
        >
          &larr; Back to Home
        </Link>
      </div>
    </div>
  );
}
