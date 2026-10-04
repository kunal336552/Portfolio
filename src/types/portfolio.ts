export interface Project {
  id: string;
  title: string;
  slug: string;
  category: 'fullstack' | 'frontend' | 'ott' | 'backend';
  shortDescription: string;
  fullDescription: string;
  role: string;
  problem: string;
  solution: string;
  technologies: string[];
  features: string[];
  challenges?: string;
  learnings?: string;
  image: string;
  githubUrl: string;
  liveDemoUrl?: string;
  featured: boolean;
  order: number;
  published: boolean;
  createdAt: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'learning';
  level?: string;
  icon?: string;
  order: number;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  responsibilities: string[];
  technologies: string[];
  order: number;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  grade?: string;
  description: string;
  order: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  icon: string;
  order: number;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  content: string;
  avatarUrl?: string;
  rating: number;
  order: number;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  label: string;
  order: number;
}

export interface SiteProfile {
  name: string;
  title: string;
  headline: string;
  subheadline: string;
  bio: string;
  location: string;
  email: string;
  phone?: string;
  avatarUrl: string;
  resumeUrl: string;
  availabilityStatus: string;
  yearsExp: string;
  githubUrl: string;
  linkedinUrl: string;
}

export interface SiteTheme {
  primaryAccent: string; // e.g. '#f59e0b', '#3b82f6', '#10b981', '#ec4899', '#8b5cf6'
  accentName: string;
  borderRadius: 'rounded-none' | 'rounded-lg' | 'rounded-xl' | 'rounded-2xl';
  sectionVisibility: {
    about: boolean;
    skills: boolean;
    experience: boolean;
    education: boolean;
    projects: boolean;
    services: boolean;
    testimonials: boolean;
    contact: boolean;
  };
}

export interface SeoConfig {
  siteTitle: string;
  metaDescription: string;
  ogImage: string;
  keywords: string;
}

export interface PortfolioData {
  profile: SiteProfile;
  projects: Project[];
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  services: Service[];
  testimonials: Testimonial[];
  socialLinks: SocialLink[];
  theme: SiteTheme;
  seo: SeoConfig;
}
