import * as React from 'react';
import { NavBar } from '../components/NavBar';
import { FooterSection } from '../components/FooterSection';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#2C3E50] font-sans">
      <NavBar />
      <main className="container mx-auto px-6 py-24 max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight mb-8">Privacy Policy</h1>
        <div className="prose prose-slate max-w-none space-y-6">
          <p className="text-slate-600 leading-relaxed">
            <strong>Last updated:</strong> February 20, 2026
          </p>
          <p className="text-slate-600 leading-relaxed">
            Your privacy matters to us. This policy explains what data we collect, how we use it, and your rights.
          </p>
          <h2 className="text-2xl font-bold mt-8">1. Information We Collect</h2>
          <p className="text-slate-600 leading-relaxed">
            We collect your email address and name through Google OAuth sign-in. We also collect product URLs and configuration data you provide during onboarding.
          </p>
          <h2 className="text-2xl font-bold mt-8">2. How We Use Your Data</h2>
          <p className="text-slate-600 leading-relaxed">
            We use your data to provide the Threaddits service: discovering relevant leads from public Reddit posts, generating AI-powered draft responses, and managing your subscription.
          </p>
          <h2 className="text-2xl font-bold mt-8">3. Data Sources</h2>
          <p className="text-slate-600 leading-relaxed">
            Lead data is sourced from publicly available Reddit posts and comments. We do not access private messages or non-public content.
          </p>
          <h2 className="text-2xl font-bold mt-8">4. Third-Party Services</h2>
          <p className="text-slate-600 leading-relaxed">
            We use Supabase for data storage, Stripe for payment processing, and Google Gemini for AI analysis. Each service has its own privacy policy.
          </p>
          <h2 className="text-2xl font-bold mt-8">5. Data Retention</h2>
          <p className="text-slate-600 leading-relaxed">
            We retain your account data for as long as your account is active. You may request data deletion at any time by contacting us.
          </p>
          <h2 className="text-2xl font-bold mt-8">6. Your Rights</h2>
          <p className="text-slate-600 leading-relaxed">
            You have the right to access, correct, or delete your personal data. Contact us at support@threaddits.com for any privacy-related requests.
          </p>
        </div>
      </main>
      <FooterSection />
    </div>
  );
}
