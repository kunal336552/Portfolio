import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { initialPortfolioData } from './seed.js';
import { PortfolioData, Project, Skill, Experience, Education, Service, Testimonial, Message, SiteProfile, SiteTheme, SeoConfig } from '../../src/types/portfolio.js';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DATA_FILE = path.resolve(DATA_DIR, 'portfolio-db.json');

export interface AdminUserRecord {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: string;
}

export interface AppDatabase {
  admin: AdminUserRecord;
  portfolio: PortfolioData;
  messages: Message[];
}

class StorageEngine {
  private isConnectedToMongo: boolean = false;
  private db: AppDatabase;

  constructor() {
    this.db = this.initDefaultState();
    this.ensureDataDirectory();
    this.loadFromFile();
    this.tryConnectMongo();
  }

  private initDefaultState(): AppDatabase {
    // Default admin: kunal336552@gmail.com / password: kunal123
    const salt = bcrypt.genSaltSync(10);
    const defaultHash = bcrypt.hashSync('kunal123', salt);

    return {
      admin: {
        id: 'admin-kunal',
        email: 'kunal336552@gmail.com',
        passwordHash: defaultHash,
        name: 'Kunal Shrivastav',
        role: 'admin'
      },
      portfolio: JSON.parse(JSON.stringify(initialPortfolioData)),
      messages: [
        {
          id: 'msg-welcome',
          name: 'Hiring Team',
          email: 'talent@techstudio.co',
          subject: 'Impressive MERN Stack portfolio & OTT experience',
          message: 'Hi Kunal, we reviewed your OTT platform development and full-stack projects. We would love to discuss a developer role with you!',
          read: false,
          createdAt: new Date().toISOString()
        }
      ]
    };
  }

  private ensureDataDirectory() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
    } catch (e) {
      console.warn('Could not create data dir:', e);
    }
  }

  private loadFromFile() {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const content = fs.readFileSync(DATA_FILE, 'utf-8');
        const parsed = JSON.parse(content);
        if (parsed.portfolio && parsed.admin) {
          this.db = parsed;
          return;
        }
      }
      this.saveToFile();
    } catch (e) {
      console.warn('Could not load existing data file, initializing fresh:', e);
      this.saveToFile();
    }
  }

  private saveToFile() {
    try {
      this.ensureDataDirectory();
      fs.writeFileSync(DATA_FILE, JSON.stringify(this.db, null, 2), 'utf-8');
    } catch (e) {
      console.error('Error writing database to disk:', e);
    }
  }

  private async tryConnectMongo() {
    const mongoUri = process.env.MONGODB_URI;
    if (mongoUri) {
      try {
        await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 3000 });
        this.isConnectedToMongo = true;
        console.log('Successfully connected to external MongoDB Atlas instance.');
      } catch (err) {
        console.warn('MongoDB URI present but connection failed; continuing with robust persistent local storage:', (err as Error).message);
      }
    }
  }

  public getStorageStatus() {
    return {
      mode: this.isConnectedToMongo ? 'MongoDB Atlas' : 'Persistent Embedded JSON DB',
      isMongo: this.isConnectedToMongo,
      projectsCount: this.db.portfolio.projects.length,
      skillsCount: this.db.portfolio.skills.length,
      messagesCount: this.db.messages.length
    };
  }

  // --- Admin User & Auth ---
  public getAdmin(): AdminUserRecord {
    return this.db.admin;
  }

  public async verifyAdminPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.db.admin.passwordHash);
  }

  public async updateAdminPassword(newPassword: string, newEmail?: string): Promise<boolean> {
    const salt = await bcrypt.genSalt(10);
    this.db.admin.passwordHash = await bcrypt.hash(newPassword, salt);
    if (newEmail) {
      this.db.admin.email = newEmail.trim().toLowerCase();
    }
    this.saveToFile();
    return true;
  }

  // --- Portfolio Data ---
  public getPortfolio(): PortfolioData {
    return this.db.portfolio;
  }

  // --- Profile ---
  public updateProfile(updated: Partial<SiteProfile>): SiteProfile {
    this.db.portfolio.profile = {
      ...this.db.portfolio.profile,
      ...updated
    };
    this.saveToFile();
    return this.db.portfolio.profile;
  }

  // --- Projects ---
  public getProjects(): Project[] {
    return this.db.portfolio.projects.sort((a, b) => a.order - b.order);
  }

  public getProjectBySlug(slug: string): Project | undefined {
    return this.db.portfolio.projects.find(p => p.slug === slug || p.id === slug);
  }

  public createProject(project: Omit<Project, 'id' | 'createdAt'>): Project {
    const newProject: Project = {
      ...project,
      id: `proj-${Date.now()}`,
      createdAt: new Date().toISOString(),
      order: project.order ?? (this.db.portfolio.projects.length + 1)
    };
    this.db.portfolio.projects.push(newProject);
    this.saveToFile();
    return newProject;
  }

  public updateProject(id: string, updates: Partial<Project>): Project | null {
    const index = this.db.portfolio.projects.findIndex(p => p.id === id);
    if (index === -1) return null;
    this.db.portfolio.projects[index] = {
      ...this.db.portfolio.projects[index],
      ...updates
    };
    this.saveToFile();
    return this.db.portfolio.projects[index];
  }

  public deleteProject(id: string): boolean {
    const initialLen = this.db.portfolio.projects.length;
    this.db.portfolio.projects = this.db.portfolio.projects.filter(p => p.id !== id);
    const deleted = this.db.portfolio.projects.length < initialLen;
    if (deleted) this.saveToFile();
    return deleted;
  }

  // --- Skills ---
  public getSkills(): Skill[] {
    return this.db.portfolio.skills.sort((a, b) => a.order - b.order);
  }

  public createSkill(skill: Omit<Skill, 'id'>): Skill {
    const newSkill: Skill = {
      ...skill,
      id: `sk-${Date.now()}`,
      order: skill.order ?? (this.db.portfolio.skills.length + 1)
    };
    this.db.portfolio.skills.push(newSkill);
    this.saveToFile();
    return newSkill;
  }

  public updateSkill(id: string, updates: Partial<Skill>): Skill | null {
    const index = this.db.portfolio.skills.findIndex(s => s.id === id);
    if (index === -1) return null;
    this.db.portfolio.skills[index] = {
      ...this.db.portfolio.skills[index],
      ...updates
    };
    this.saveToFile();
    return this.db.portfolio.skills[index];
  }

  public deleteSkill(id: string): boolean {
    const initialLen = this.db.portfolio.skills.length;
    this.db.portfolio.skills = this.db.portfolio.skills.filter(s => s.id !== id);
    const deleted = this.db.portfolio.skills.length < initialLen;
    if (deleted) this.saveToFile();
    return deleted;
  }

  // --- Experience ---
  public getExperience(): Experience[] {
    return this.db.portfolio.experience.sort((a, b) => a.order - b.order);
  }

  public createExperience(exp: Omit<Experience, 'id'>): Experience {
    const newExp: Experience = {
      ...exp,
      id: `exp-${Date.now()}`,
      order: exp.order ?? (this.db.portfolio.experience.length + 1)
    };
    this.db.portfolio.experience.push(newExp);
    this.saveToFile();
    return newExp;
  }

  public updateExperience(id: string, updates: Partial<Experience>): Experience | null {
    const index = this.db.portfolio.experience.findIndex(e => e.id === id);
    if (index === -1) return null;
    this.db.portfolio.experience[index] = {
      ...this.db.portfolio.experience[index],
      ...updates
    };
    this.saveToFile();
    return this.db.portfolio.experience[index];
  }

  public deleteExperience(id: string): boolean {
    const initialLen = this.db.portfolio.experience.length;
    this.db.portfolio.experience = this.db.portfolio.experience.filter(e => e.id !== id);
    const deleted = this.db.portfolio.experience.length < initialLen;
    if (deleted) this.saveToFile();
    return deleted;
  }

  // --- Education ---
  public getEducation(): Education[] {
    return this.db.portfolio.education.sort((a, b) => a.order - b.order);
  }

  public updateEducation(id: string, updates: Partial<Education>): Education | null {
    const index = this.db.portfolio.education.findIndex(e => e.id === id);
    if (index === -1) return null;
    this.db.portfolio.education[index] = {
      ...this.db.portfolio.education[index],
      ...updates
    };
    this.saveToFile();
    return this.db.portfolio.education[index];
  }

  public createEducation(edu: Omit<Education, 'id'>): Education {
    const newEdu: Education = {
      ...edu,
      id: `edu-${Date.now()}`,
      order: edu.order ?? (this.db.portfolio.education.length + 1)
    };
    this.db.portfolio.education.push(newEdu);
    this.saveToFile();
    return newEdu;
  }

  public deleteEducation(id: string): boolean {
    const initialLen = this.db.portfolio.education.length;
    this.db.portfolio.education = this.db.portfolio.education.filter(e => e.id !== id);
    const deleted = this.db.portfolio.education.length < initialLen;
    if (deleted) this.saveToFile();
    return deleted;
  }

  // --- Services ---
  public getServices(): Service[] {
    return this.db.portfolio.services.sort((a, b) => a.order - b.order);
  }

  public updateService(id: string, updates: Partial<Service>): Service | null {
    const index = this.db.portfolio.services.findIndex(s => s.id === id);
    if (index === -1) return null;
    this.db.portfolio.services[index] = {
      ...this.db.portfolio.services[index],
      ...updates
    };
    this.saveToFile();
    return this.db.portfolio.services[index];
  }

  public createService(srv: Omit<Service, 'id'>): Service {
    const newSrv: Service = {
      ...srv,
      id: `srv-${Date.now()}`,
      order: srv.order ?? (this.db.portfolio.services.length + 1)
    };
    this.db.portfolio.services.push(newSrv);
    this.saveToFile();
    return newSrv;
  }

  public deleteService(id: string): boolean {
    const initialLen = this.db.portfolio.services.length;
    this.db.portfolio.services = this.db.portfolio.services.filter(s => s.id !== id);
    const deleted = this.db.portfolio.services.length < initialLen;
    if (deleted) this.saveToFile();
    return deleted;
  }

  // --- Testimonials ---
  public getTestimonials(): Testimonial[] {
    return this.db.portfolio.testimonials.sort((a, b) => a.order - b.order);
  }

  public updateTestimonial(id: string, updates: Partial<Testimonial>): Testimonial | null {
    const index = this.db.portfolio.testimonials.findIndex(t => t.id === id);
    if (index === -1) return null;
    this.db.portfolio.testimonials[index] = {
      ...this.db.portfolio.testimonials[index],
      ...updates
    };
    this.saveToFile();
    return this.db.portfolio.testimonials[index];
  }

  // --- Theme & SEO ---
  public updateTheme(themeUpdates: Partial<SiteTheme>): SiteTheme {
    this.db.portfolio.theme = {
      ...this.db.portfolio.theme,
      ...themeUpdates,
      sectionVisibility: {
        ...this.db.portfolio.theme.sectionVisibility,
        ...(themeUpdates.sectionVisibility || {})
      }
    };
    this.saveToFile();
    return this.db.portfolio.theme;
  }

  public updateSeo(seoUpdates: Partial<SeoConfig>): SeoConfig {
    this.db.portfolio.seo = {
      ...this.db.portfolio.seo,
      ...seoUpdates
    };
    this.saveToFile();
    return this.db.portfolio.seo;
  }

  // --- Messages / Contact Form ---
  public getMessages(): Message[] {
    return [...this.db.messages].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public saveMessage(msg: { name: string; email: string; subject: string; message: string }): Message {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      name: msg.name.trim(),
      email: msg.email.trim(),
      subject: msg.subject.trim(),
      message: msg.message.trim(),
      read: false,
      createdAt: new Date().toISOString()
    };
    this.db.messages.unshift(newMessage);
    this.saveToFile();
    return newMessage;
  }

  public markMessageRead(id: string, read: boolean = true): boolean {
    const msg = this.db.messages.find(m => m.id === id);
    if (!msg) return false;
    msg.read = read;
    this.saveToFile();
    return true;
  }

  public deleteMessage(id: string): boolean {
    const initialLen = this.db.messages.length;
    this.db.messages = this.db.messages.filter(m => m.id !== id);
    const deleted = this.db.messages.length < initialLen;
    if (deleted) this.saveToFile();
    return deleted;
  }

  // --- Reset to Factory Seed ---
  public resetToDefaults() {
    this.db.portfolio = JSON.parse(JSON.stringify(initialPortfolioData));
    this.saveToFile();
    return this.db.portfolio;
  }
}

export const storage = new StorageEngine();
