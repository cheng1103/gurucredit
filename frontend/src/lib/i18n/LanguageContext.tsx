'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { Language, getTranslation } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'guru-credits-language';
const COOKIE_KEY = 'gc_lang';

const getQueryLanguage = (): Language | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  const params = new URLSearchParams(window.location.search);
  const langParam = params.get('lang');
  if (langParam === 'ms' || langParam === 'en') {
    return langParam;
  }
  return null;
};

const readCookieLang = (): Language | null => {
  if (typeof document === 'undefined') {
    return null;
  }
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${COOKIE_KEY}=`));
  if (!match) return null;
  const value = match.split('=')[1];
  return value === 'ms' || value === 'en' ? value : null;
};

const getInitialLanguage = (): Language => {
  if (typeof window === 'undefined') {
    return 'en';
  }

  const queryLang = getQueryLanguage();
  if (queryLang) {
    return queryLang;
  }

  const cookieLang = readCookieLang();
  if (cookieLang) {
    return cookieLang;
  }

  const saved = window.localStorage.getItem(STORAGE_KEY) as Language | null;
  if (saved && ['en', 'ms'].includes(saved)) {
    return saved;
  }

  const browserLang = window.navigator.language.split('-')[0];
  if (browserLang === 'ms' || browserLang === 'id') {
    return 'ms';
  }

  return 'en';
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  // Hydrate from persisted value/browser settings on first client render
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const queryLang = getQueryLanguage();
    if (queryLang && queryLang !== language) {
      setLanguageState(queryLang);
      return;
    }

    const saved = window.localStorage.getItem(STORAGE_KEY) as Language | null;
    if (saved && ['en', 'ms'].includes(saved) && saved !== language) {
      setLanguageState(saved);
      return;
    }

    const browserLang = window.navigator.language.split('-')[0];
    if ((browserLang === 'ms' || browserLang === 'id') && language !== 'ms') {
      setLanguageState('ms');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep DOM attributes + storage in sync when language changes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, language);
    }
    if (typeof document !== 'undefined') {
      document.cookie = `${COOKIE_KEY}=${language}; path=/; max-age=31536000`;
    }
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  const t = useCallback(
    (key: string): string => {
      return getTranslation(language, key);
    },
    [language]
  );

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({ language, setLanguage, t }),
    [language, setLanguage, t]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Hook for getting translation with current language
export function useTranslation() {
  const { t, language } = useLanguage();
  return { t, language };
}
