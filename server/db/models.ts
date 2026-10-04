import mongoose from 'mongoose';

// User / Admin Model
export const AdminUserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  name: { type: String, default: 'Kunal Shrivastav' },
  role: { type: String, default: 'admin' },
  updatedAt: { type: Date, default: Date.now },
});

// Project Model
export const ProjectSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  slug: { type: String, required: true },
  category: { type: String, required: true },
  shortDescription: { type: String, required: true },
  fullDescription: { type: String, default: '' },
  role: { type: String, default: 'Full-Stack Developer' },
  problem: { type: String, default: '' },
  solution: { type: String, default: '' },
  technologies: [{ type: String }],
  features: [{ type: String }],
  challenges: { type: String, default: '' },
  learnings: { type: String, default: '' },
  image: { type: String, required: true },
  githubUrl: { type: String, required: true },
  liveDemoUrl: { type: String, default: '' },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  published: { type: Boolean, default: true },
  createdAt: { type: String, default: () => new Date().toISOString() },
});

// Skill Model
export const SkillSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  level: { type: String, default: 'Intermediate' },
  icon: { type: String, default: 'Code2' },
  order: { type: Number, default: 0 },
});

// Experience Model
export const ExperienceSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  company: { type: String, required: true },
  role: { type: String, required: true },
  location: { type: String, default: 'New Delhi, India' },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  current: { type: Boolean, default: false },
  description: { type: String, default: '' },
  responsibilities: [{ type: String }],
  technologies: [{ type: String }],
  order: { type: Number, default: 0 },
});

// Education Model
export const EducationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  field: { type: String, default: 'Computer Applications' },
  location: { type: String, default: 'New Delhi, India' },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  grade: { type: String, default: '' },
  description: { type: String, default: '' },
  order: { type: Number, default: 0 },
});

// Service Model
export const ServiceSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  deliverables: [{ type: String }],
  icon: { type: String, default: 'Layers' },
  order: { type: Number, default: 0 },
});

// Testimonial Model
export const TestimonialSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  role: { type: String, required: true },
  company: { type: String, required: true },
  content: { type: String, required: true },
  avatarUrl: { type: String, default: '' },
  rating: { type: Number, default: 5 },
  order: { type: Number, default: 0 },
});

// Message Model
export const MessageSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: String, default: () => new Date().toISOString() },
});

// Site Profile Model
export const ProfileSchema = new mongoose.Schema({
  name: { type: String, default: 'Kunal Shrivastav' },
  title: { type: String, default: 'Full-Stack / MERN Stack Developer' },
  headline: { type: String, default: '' },
  subheadline: { type: String, default: '' },
  bio: { type: String, default: '' },
  location: { type: String, default: 'New Delhi, India' },
  email: { type: String, default: 'kunal336552@gmail.com' },
  phone: { type: String, default: '' },
  avatarUrl: { type: String, default: '' },
  resumeUrl: { type: String, default: '#contact' },
  availabilityStatus: { type: String, default: 'Open to Work' },
  yearsExp: { type: String, default: '3 Months' },
  githubUrl: { type: String, default: 'https://github.com/kunal336552' },
  linkedinUrl: { type: String, default: 'https://linkedin.com/in/kunal-shrivastav' },
});

// Theme and SEO schemas
export const SiteThemeSchema = new mongoose.Schema({
  primaryAccent: { type: String, default: '#f59e0b' },
  accentName: { type: String, default: 'Amber Gold' },
  borderRadius: { type: String, default: 'rounded-xl' },
  sectionVisibility: {
    about: { type: Boolean, default: true },
    skills: { type: Boolean, default: true },
    experience: { type: Boolean, default: true },
    education: { type: Boolean, default: true },
    projects: { type: Boolean, default: true },
    services: { type: Boolean, default: true },
    testimonials: { type: Boolean, default: true },
    contact: { type: Boolean, default: true },
  },
});

export const SeoSchema = new mongoose.Schema({
  siteTitle: { type: String, default: 'Kunal Shrivastav | Full-Stack & MERN Developer' },
  metaDescription: { type: String, default: '' },
  ogImage: { type: String, default: '' },
  keywords: { type: String, default: '' },
});
