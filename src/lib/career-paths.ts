export interface PhraseCategory {
  id: string;
  title: string;       // Vietnamese
  titleEn: string;
  targetCount: number;
}

export interface CareerPath {
  id: string;
  title: string;       // Vietnamese
  titleEn: string;     // English
  emoji: string;
  description: string; // Vietnamese
  targetPhraseCount: number;
  categories: PhraseCategory[];
}

export const CAREER_PATHS: CareerPath[] = [
  {
    id: 'nail-salon',
    title: 'Thợ Nail Chuyên Nghiệp',
    titleEn: 'Nail Salon Pro',
    emoji: '💅',
    description: 'Giao tiếp với khách, giá cả, dịch vụ, tip',
    targetPhraseCount: 50,
    categories: [
      { id: 'greeting', title: 'Chào khách', titleEn: 'Greetings', targetCount: 8 },
      { id: 'services', title: 'Dịch vụ & Orders', titleEn: 'Services', targetCount: 10 },
      { id: 'pricing', title: 'Giá & Thanh toán', titleEn: 'Pricing & Payment', targetCount: 8 },
      { id: 'smalltalk', title: 'Small talk', titleEn: 'Small Talk', targetCount: 8 },
      { id: 'problems', title: 'Xử lý vấn đề', titleEn: 'Problem Handling', targetCount: 8 },
      { id: 'tips', title: 'Tip & Cảm ơn', titleEn: 'Tips & Thanks', targetCount: 8 },
    ],
  },
  {
    id: 'permanent-makeup',
    title: 'Phun Xăm Thẩm Mỹ',
    titleEn: 'PMU Expert',
    emoji: '💄',
    description: 'Tư vấn khách, quy trình, chăm sóc sau',
    targetPhraseCount: 40,
    categories: [
      { id: 'consultation', title: 'Tư vấn', titleEn: 'Consultation', targetCount: 10 },
      { id: 'procedure', title: 'Quy trình', titleEn: 'Procedure', targetCount: 10 },
      { id: 'aftercare', title: 'Chăm sóc sau', titleEn: 'Aftercare', targetCount: 10 },
      { id: 'pricing', title: 'Giá & Đặt lịch', titleEn: 'Pricing & Booking', targetCount: 10 },
    ],
  },
  {
    id: 'daily-life',
    title: 'Cuộc Sống Hàng Ngày',
    titleEn: 'Daily Life in America',
    emoji: '🏠',
    description: 'Mua sắm, bác sĩ, trường học, hàng xóm',
    targetPhraseCount: 60,
    categories: [
      { id: 'shopping', title: 'Mua sắm', titleEn: 'Shopping', targetCount: 10 },
      { id: 'healthcare', title: 'Bác sĩ & Thuốc', titleEn: 'Healthcare', targetCount: 10 },
      { id: 'school', title: 'Trường học con', titleEn: 'Kids & School', targetCount: 10 },
      { id: 'neighbors', title: 'Hàng xóm', titleEn: 'Neighbors', targetCount: 10 },
      { id: 'restaurant', title: 'Nhà hàng', titleEn: 'Restaurant', targetCount: 10 },
      { id: 'emergency', title: 'Khẩn cấp', titleEn: 'Emergency', targetCount: 10 },
    ],
  },
  {
    id: 'restaurant',
    title: 'Nhà Hàng & Quán Ăn',
    titleEn: 'Restaurant & Food Service',
    emoji: '🍜',
    description: 'Phục vụ, order, thanh toán, menu',
    targetPhraseCount: 45,
    categories: [
      { id: 'greeting', title: 'Chào khách', titleEn: 'Greetings', targetCount: 8 },
      { id: 'ordering', title: 'Nhận order', titleEn: 'Taking Orders', targetCount: 10 },
      { id: 'menu', title: 'Giải thích menu', titleEn: 'Menu Explanation', targetCount: 9 },
      { id: 'payment', title: 'Thanh toán', titleEn: 'Payment', targetCount: 8 },
      { id: 'complaints', title: 'Xử lý phàn nàn', titleEn: 'Complaints', targetCount: 10 },
    ],
  },
];

export const IELTS_PATH: CareerPath = {
  id: 'ielts-speaking',
  title: 'IELTS Speaking',
  titleEn: 'IELTS Speaking Prep',
  emoji: '📝',
  description: 'Luyện thi IELTS Speaking band 5.0-7.0+',
  targetPhraseCount: 60,
  categories: [
    { id: 'opinion', title: 'Nêu ý kiến', titleEn: 'Giving Opinions', targetCount: 10 },
    { id: 'hedging', title: 'Nói uyển chuyển', titleEn: 'Hedging Language', targetCount: 10 },
    { id: 'linking', title: 'Liên kết câu', titleEn: 'Linking Words', targetCount: 10 },
    { id: 'examples', title: 'Cho ví dụ', titleEn: 'Giving Examples', targetCount: 10 },
    { id: 'comparing', title: 'So sánh', titleEn: 'Comparing', targetCount: 10 },
    { id: 'buying-time', title: 'Câu "mua thời gian"', titleEn: 'Buying Time', targetCount: 10 },
  ],
};

export function getCareerPath(id: string): CareerPath | undefined {
  return CAREER_PATHS.find(p => p.id === id);
}

/** Detect career path from job description text */
export function detectCareerPathFromJob(jobText: string): string {
  const lower = jobText.toLowerCase();
  if (/nail|móng|mong|manicur|pedicur/.test(lower)) return 'nail-salon';
  if (/phun|xăm|xam|pmu|tattoo|permanent\s*make|microblad/.test(lower)) return 'permanent-makeup';
  if (/nhà hàng|nha hang|restaurant|phục vụ|phuc vu|bồi bàn|boi ban|waiter|server|cook|bếp|bep/.test(lower)) return 'restaurant';
  return 'daily-life';
}
