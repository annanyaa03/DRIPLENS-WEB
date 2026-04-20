import { useEffect } from "react";

export default function PrivacyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-4xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-black mb-4">Privacy Policy</h1>
        <p className="text-[#555555] mb-12 uppercase tracking-widest text-sm font-bold">Last Updated: April 2024</p>
        
        <div className="prose prose-zinc max-w-none space-y-10 text-[#555555] leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">1. Introduction</h2>
            <p>
              At Driplens, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information when you use our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">2. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, such as when you create an account, build a portfolio, or communicate with other users. This may include:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Contact information (email, name)</li>
              <li>Authentication credentials</li>
              <li>Portfolio media and project details</li>
              <li>Messaging history within the platform</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">3. How We Use Your Information</h2>
            <p>
              We use the information we collect to provide, maintain, and improve our services, including matching creators with brands and facilitating professional collaborations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">4. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your data, including encryption and secure database access through Supabase's Row Level Security (RLS).
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
