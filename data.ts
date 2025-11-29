import { PortfolioItem, ProfileData, ProjectCategory } from './types';
import { portfolioDataRaw } from './portfolio';

// Type assertion to ensure data matches our interfaces
const rawData = portfolioDataRaw as any;

export const profileData: ProfileData = {
  name: rawData.profile.name,
  role: rawData.profile.role,
  about: rawData.profile.about,
  social: {
    linkedin: rawData.profile.social.linkedin,
    email: rawData.profile.social.email,
    whatsapp: rawData.profile.social.whatsapp
  }
};

// Map raw data to typed objects
export const portfolioData: PortfolioItem[] = rawData.projects.map((item: any) => ({
  ...item,
  // Ensure category matches the Enum
  category: item.category as ProjectCategory
}));