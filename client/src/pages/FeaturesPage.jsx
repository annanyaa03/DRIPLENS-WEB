import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function FeaturesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      id: 1,
      title: "Merit-Based Portfolio System",
      description: "Build a professional portfolio showcasing your work through verified ratings and community feedback.",
      icon: "🎯"
    },
    {
      id: 2,
      title: "Creator Collaboration Hub",
      description: "Connect with other creators, share insights, and collaborate on projects within a supportive community.",
      icon: "🤝"
    },
    {
      id: 3,
      title: "Brand-Creator Matching",
      description: "Intelligent matching algorithm connects brands with creators based on niche, style, and portfolio quality.",
      icon: "⚡"
    },
    {
      id: 4,
      title: "Real-Time Messaging",
      description: "Communicate directly with brands and creators through our integrated messaging platform.",
      icon: "💬"
    },
    {
      id: 5,
      title: "Portfolio Analytics",
      description: "Track views, engagement, and growth metrics to optimize your professional presence.",
      icon: "📊"
    },
    {
      id: 6,
      title: "Verified Credentials",
      description: "Display verified social media accounts and professional certifications to build credibility.",
      icon: "✓"
    },
    {
      id: 7,
      title: "Multi-Platform Integration",
      description: "Seamlessly connect your Instagram, TikTok, YouTube, and other social media accounts.",
      icon: "🔗"
    },
    {
      id: 8,
      title: "Secure Payment System",
      description: "Safe and transparent payment processing for collaborations and sponsorships.",
      icon: "💳"
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E5E5] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-black mb-4">Features</h1>
          <p className="text-xl text-[#555555] max-w-2xl">
            Driplens provides powerful tools designed specifically for creators and brands to build meaningful professional relationships.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.id} className="p-8 rounded-lg border border-[#E5E5E5] hover:border-black transition-all duration-300 hover:shadow-xl group">
                <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-xl font-bold text-black mb-3">{feature.title}</h3>
                <p className="text-[#555555] leading-relaxed group-hover:text-black transition-colors">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to transform your creative career?</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who are already using Driplens to build professional careers.
          </p>
          <Link to="/auth" className="inline-block px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition-colors">
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
}
