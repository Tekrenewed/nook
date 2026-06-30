export interface SiteConfig {
  id?: string; // 'streatham', 'slough', etc.
  address: string;
  phone: string;
  email: string;
  openingHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  faq: {
    question: string;
    answer: string;
  }[];
  heroText?: string;
  aboutText?: string;
}
