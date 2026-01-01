import * as React from 'react';
import { useState } from 'react';
import { LandingHero } from '../components/LandingHero';
import { OnboardingFlow } from '../components/OnboardingFlow';

export default function Home() {
  const [view, setView] = useState<'hero' | 'onboarding'>('hero');

  const handleStartHunting = (url: string) => {
    console.log(`Analyzing URL: ${url}`);
    setView('onboarding');
  };

  if (view === 'onboarding') {
    return <OnboardingFlow />;
  }

  return <LandingHero onStartHunting={handleStartHunting} />;
}
