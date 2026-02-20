import * as React from 'react';
import { NavBar } from '../components/NavBar';
import { FooterSection } from '../components/FooterSection';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#2C3E50] font-sans">
      <NavBar />
      <main className="container mx-auto px-6 py-24 max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight mb-8">Terms of Service</h1>
        <div className="prose prose-slate max-w-none space-y-6">
          <p className="text-slate-600 leading-relaxed">
            <strong>Last updated:</strong> February 20, 2026
          </p>
          <p className="text-slate-600 leading-relaxed">
            Welcome to Threaddits. By using our service, you agree to these terms. Please read them carefully.
          </p>
          <h2 className="text-2xl font-bold mt-8">1. Service Description</h2>
          <p className="text-slate-600 leading-relaxed">
            Threaddits is a lead discovery platform that monitors public Reddit conversations to identify potential customers for your product or service. We provide AI-powered analysis and draft responses, but you maintain full control over any engagement.
          </p>
          <h2 className="text-2xl font-bold mt-8">2. Acceptable Use</h2>
          <p className="text-slate-600 leading-relaxed">
            You agree to use Threaddits in compliance with Reddit's Terms of Service and all applicable laws. You will not use the service for spam, harassment, or any form of automated posting without human review.
          </p>
          <h2 className="text-2xl font-bold mt-8">3. Subscriptions & Billing</h2>
          <p className="text-slate-600 leading-relaxed">
            Paid subscriptions are billed monthly. You may cancel at any time. Refunds are handled on a case-by-case basis within the first 14 days of service.
          </p>
          <h2 className="text-2xl font-bold mt-8">4. Data & Privacy</h2>
          <p className="text-slate-600 leading-relaxed">
            We collect and process data as described in our Privacy Policy. All lead data comes from publicly available Reddit posts.
          </p>
          <h2 className="text-2xl font-bold mt-8">5. Limitation of Liability</h2>
          <p className="text-slate-600 leading-relaxed">
            Threaddits is provided "as is" without warranties of any kind. We are not responsible for any actions you take based on leads or suggestions provided by our platform.
          </p>
          <h2 className="text-2xl font-bold mt-8">6. Contact</h2>
          <p className="text-slate-600 leading-relaxed">
            For questions about these terms, contact us at support@threaddits.com.
          </p>
        </div>
      </main>
      <FooterSection />
    </div>
  );
}
