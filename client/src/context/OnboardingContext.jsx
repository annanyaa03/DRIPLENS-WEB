import { createContext, useContext, useState, useEffect } from 'react';

const OnboardingContext = createContext(null);

const STORAGE_KEY = 'driplens_onboarding_draft';

const defaultData = {
  // Step 1
  display_name: '',
  category: '',
  tagline: '',
  // Step 2
  platforms: [],
  primary_platform: '',
  follower_count: '',
  // Step 3
  tags: [],
  qualifications: ['', '', ''],
  past_work: ['', '', ''],
  // Step 4
  min_budget: 0,
  max_budget: 10000,
  is_available: true,
  preferred_work_type: [],
  // Step 5
  avatar_url: '',
  location: '',
  bio: '',
  website: '',
};

export function OnboardingProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      return saved ? { ...defaultData, ...JSON.parse(saved) } : defaultData;
    } catch {
      return defaultData;
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {}
  }, [data]);

  const update = (fields) => setData(prev => ({ ...prev, ...fields }));

  const clear = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setData(defaultData);
  };

  // Compute audience tier from follower count
  const getAudienceTier = (count) => {
    const n = parseInt(count) || 0;
    if (n >= 1_000_000) return 'Mega';
    if (n >= 100_000)   return 'Macro';
    if (n >= 10_000)    return 'Micro';
    if (n >= 1)         return 'Nano';
    return null;
  };

  const audienceTier = getAudienceTier(data.follower_count);

  return (
    <OnboardingContext.Provider value={{ data, update, clear, audienceTier }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export const useOnboarding = () => {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error('useOnboarding must be inside OnboardingProvider');
  return ctx;
};
