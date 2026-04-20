import { useEffect } from "react";

export default function TermsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-4xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-black mb-4">Terms of Service</h1>
        <p className="text-[#555555] mb-12 uppercase tracking-widest text-sm font-bold">Last Updated: April 2024</p>
        
        <div className="prose prose-zinc max-w-none space-y-10 text-[#555555] leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using Driplens, you agree to be bound by these Terms of Service and all applicable laws and regulations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">2. User Responsibilities</h2>
            <p>
              Users are responsible for the content they upload and the communications they engage in. You must not use the platform for any illegal or unauthorized purpose.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">3. Payments & Fees</h2>
            <p>
              Collaborations facilitated through Driplens may be subject to platform fees. All financial transactions are processed through our secure payment partners.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">4. Intellectual Property</h2>
            <p>
              Creators retain ownership of their portfolio content. Brands are granted specific rights to content as part of individual project agreements.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
