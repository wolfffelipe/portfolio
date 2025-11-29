export enum ProjectCategory {
  VIDEO = 'Video',
  THUMBNAIL = 'Thumbnail',
  APP = 'App'
}

export interface BaseProject {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

export interface VideoProject extends BaseProject {
  category: ProjectCategory.VIDEO;
  videoUrl: string; // YouTube embed URL or MP4 link
  thumbnailUrl: string; // Cover image
}

export interface ThumbnailProject extends BaseProject {
  category: ProjectCategory.THUMBNAIL;
  imageBefore: string;
  imageAfter: string;
}

export interface AppProject extends BaseProject {
  category: ProjectCategory.APP;
  iconUrl?: string; // Optional icon
  imageUrl: string; // Screenshot
  appLink: string;
  repoLink?: string;
}

export type PortfolioItem = VideoProject | ThumbnailProject | AppProject;

export interface ProfileData {
  name: string;
  role: string;
  about: string;
  social: {
    github?: string;
    linkedin?: string;
    email?: string;
    instagram?: string;
    whatsapp?: string;
  };
}