import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.spaceHosts': 'Space Hosts',
    'nav.storageSeekers': 'Storage Seekers',
    
    // Hero Section
    'hero.title1': 'Find Space.',
    'hero.title2': 'Store Smart.',
    'hero.subtitle': 'Hong Kong\'s trusted peer-to-peer storage marketplace',
    'hero.stats.spaces': 'spaces shared',
    'hero.stats.sqft': 'sq ft available',
    'hero.stats.users': 'active users',
    'hero.cta.haveSpace': 'I have space',
    'hero.cta.needSpace': 'I need space',
    
    // Space Hosts
    'hosts.title': 'Share Your Space',
    'hosts.subtitle': 'Turn unused space into income',
    'hosts.step1.title': 'Describe Your Space',
    'hosts.step1.desc': 'Tell us about your available storage area',
    'hosts.step2.title': 'Set Your Price',
    'hosts.step2.desc': 'Choose competitive daily rates',
    'hosts.step3.title': 'Upload Photos',
    'hosts.step3.desc': 'Show off your space with great photos',
    'hosts.dashboard.title': 'Your Space Dashboard',
    'hosts.dashboard.requests': 'Storage Requests',
    
    // Storage Seekers
    'seekers.title': 'Find Perfect Storage',
    'seekers.subtitle': 'Secure, convenient storage near you',
    'seekers.search.placeholder': 'Search location in Hong Kong...',
    'seekers.search.useLocation': 'Use my location',
    'seekers.filters.distance': 'Distance',
    'seekers.filters.price': 'Price Range',
    'seekers.filters.access': 'Floor Access',
    'seekers.filters.security': '24h Security',
    'seekers.camera.scan': 'Scan Item with AI',
    
    // Chatbot
    'chat.welcome': 'Hi! How can I help you find storage today?',
    'chat.quickReply.nearestSpaces': 'Show nearest 24h spaces',
    'chat.quickReply.insurance': 'Explain insurance',
    'chat.placeholder': 'Type your message...',
    
    // Common
    'common.loading': 'Loading...',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.publish': 'Publish',
    'common.search': 'Search',
    'common.filters': 'Filters',
    'common.close': 'Close',
  },
  zh: {
    // Navigation
    'nav.spaceHosts': '空間主人',
    'nav.storageSeekers': '儲存需求者',
    
    // Hero Section
    'hero.title1': '善用空間',
    'hero.title2': '靈活儲存',
    'hero.subtitle': '香港值得信賴的點對點儲存市場',
    'hero.stats.spaces': '共享空間',
    'hero.stats.sqft': '平方呎可用',
    'hero.stats.users': '活躍用戶',
    'hero.cta.haveSpace': '我有空間',
    'hero.cta.needSpace': '我需要空間',
    
    // Space Hosts
    'hosts.title': '分享您的空間',
    'hosts.subtitle': '將閒置空間轉化為收入',
    'hosts.step1.title': '描述您的空間',
    'hosts.step1.desc': '告訴我們您的可用儲存區域',
    'hosts.step2.title': '設定價格',
    'hosts.step2.desc': '選擇有競爭力的日租金',
    'hosts.step3.title': '上傳照片',
    'hosts.step3.desc': '用精美照片展示您的空間',
    'hosts.dashboard.title': '您的空間控制板',
    'hosts.dashboard.requests': '儲存請求',
    
    // Storage Seekers
    'seekers.title': '尋找完美儲存',
    'seekers.subtitle': '安全便利的就近儲存',
    'seekers.search.placeholder': '搜尋香港位置...',
    'seekers.search.useLocation': '使用我的位置',
    'seekers.filters.distance': '距離',
    'seekers.filters.price': '價格範圍',
    'seekers.filters.access': '樓層通道',
    'seekers.filters.security': '24小時保安',
    'seekers.camera.scan': 'AI 掃描物品',
    
    // Chatbot
    'chat.welcome': '您好！今天我可以如何幫您找到儲存空間？',
    'chat.quickReply.nearestSpaces': '顯示最近的24小時空間',
    'chat.quickReply.insurance': '解釋保險',
    'chat.placeholder': '輸入您的訊息...',
    
    // Common
    'common.loading': '載入中...',
    'common.back': '返回',
    'common.next': '下一步',
    'common.publish': '發佈',
    'common.search': '搜尋',
    'common.filters': '篩選',
    'common.close': '關閉',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Get language from localStorage or default to English
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};