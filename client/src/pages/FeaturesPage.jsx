import { useEffect } from "react";
import { 
  Target, 
  Users, 
  Zap, 
  MessageSquare, 
  BarChart3, 
  BadgeCheck, 
  Link as LinkIcon, 
  CreditCard 
} from "lucide-react";

export default function FeaturesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      id: 1,
      title: "Merit-Based Portfolio System",
      description: "Build a professional portfolio showcasing your work through verified ratings and community feedback.",
      icon: Target
    },
    {
      id: 2,
      title: "Creator Collaboration Hub",
      description: "Connect with other creators, share insights, and collaborate on projects within a supportive community.",
      icon: Users
    },
    {
      id: 3,
      title: "Brand-Creator Matching",
      description: "Intelligent matching algorithm connects brands with creators based on niche, style, and portfolio quality.",
      icon: Zap
    },
    {
      id: 4,
      title: "Real-Time Messaging",
      description: "Communicate directly with brands and creators through our integrated messaging platform.",
      icon: MessageSquare
    },
    {
      id: 5,
      title: "Portfolio Analytics",
      description: "Track views, engagement, and growth metrics to optimize your professional presence.",
      icon: BarChart3
    },
    {
      id: 6,
      title: "Verified Credentials",
      description: "Display verified social media accounts and professional certifications to build credibility.",
      icon: BadgeCheck
    },
    {
      id: 7,
      title: "Multi-Platform Integration",
      description: "Seamlessly connect your Instagram, TikTok, YouTube, and other social media accounts.",
      icon: LinkIcon
    },
    {
      id: 8,
      title: "Secure Payment System",
      description: "Safe and transparent payment processing for collaborations and sponsorships.",
      icon: CreditCard
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E5E5] pt-16 pb-0 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-black mb-4">Features</h1>
          <p className="text-xl text-[#555555] max-w-2xl pb-10">
            Driplens provides powerful tools designed specifically for creators and brands to build meaningful professional relationships.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.id} className="p-8 rounded-none border border-[#E5E5E5] hover:border-black transition-all duration-300 hover:shadow-xl group">
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-10 h-10 text-black" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-black mb-3">{feature.title}</h3>
                <p className="text-[#555555] leading-relaxed group-hover:text-black transition-colors">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
