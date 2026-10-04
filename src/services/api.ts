import { PortfolioData, Project, Skill, Experience, Education, SiteTheme, SeoConfig, Message } from '../types/portfolio.js';

const API_BASE = '/api';

function getAuthHeaders(token?: string | null): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  const authToken = token || localStorage.getItem('kunal_admin_jwt');
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }
  return headers;
}

export const api = {
  // Public
  async getPortfolio(): Promise<{ success: boolean; data: PortfolioData; status: any }> {
    const res = await fetch(`${API_BASE}/portfolio`);
    if (!res.ok) throw new Error('Failed to load portfolio data');
    return res.json();
  },

  async sendMessage(data: { name: string; email: string; subject?: string; message: string; honeypot?: string }) {
    const res = await fetch(`${API_BASE}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to submit message');
    return result;
  },

  // Auth
  async login(email: string, password: string) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Invalid credentials');
    return result;
  },

  async getMe(token: string) {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getAuthHeaders(token),
    });
    if (!res.ok) throw new Error('Session invalid');
    return res.json();
  },

  async changePassword(token: string, data: { currentPassword: string; newPassword: string; newEmail?: string }) {
    const res = await fetch(`${API_BASE}/auth/change-password`, {
      method: 'POST',
      headers: getAuthHeaders(token),
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to update password');
    return result;
  },

  // Admin CRUD
  async updateProfile(token: string, profile: any) {
    const res = await fetch(`${API_BASE}/admin/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(token),
      body: JSON.stringify(profile),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to update profile');
    return result;
  },

  async createProject(token: string, project: Partial<Project>) {
    const res = await fetch(`${API_BASE}/admin/projects`, {
      method: 'POST',
      headers: getAuthHeaders(token),
      body: JSON.stringify(project),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to create project');
    return result;
  },

  async updateProject(token: string, id: string, updates: Partial<Project>) {
    const res = await fetch(`${API_BASE}/admin/projects/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(token),
      body: JSON.stringify(updates),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to update project');
    return result;
  },

  async deleteProject(token: string, id: string) {
    const res = await fetch(`${API_BASE}/admin/projects/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(token),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to delete project');
    return result;
  },

  async createSkill(token: string, skill: Partial<Skill>) {
    const res = await fetch(`${API_BASE}/admin/skills`, {
      method: 'POST',
      headers: getAuthHeaders(token),
      body: JSON.stringify(skill),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to create skill');
    return result;
  },

  async updateSkill(token: string, id: string, skill: Partial<Skill>) {
    const res = await fetch(`${API_BASE}/admin/skills/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(token),
      body: JSON.stringify(skill),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to update skill');
    return result;
  },

  async deleteSkill(token: string, id: string) {
    const res = await fetch(`${API_BASE}/admin/skills/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(token),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to delete skill');
    return result;
  },

  async createExperience(token: string, exp: Partial<Experience>) {
    const res = await fetch(`${API_BASE}/admin/experience`, {
      method: 'POST',
      headers: getAuthHeaders(token),
      body: JSON.stringify(exp),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to create experience');
    return result;
  },

  async updateExperience(token: string, id: string, exp: Partial<Experience>) {
    const res = await fetch(`${API_BASE}/admin/experience/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(token),
      body: JSON.stringify(exp),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to update experience');
    return result;
  },

  async deleteExperience(token: string, id: string) {
    const res = await fetch(`${API_BASE}/admin/experience/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(token),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to delete experience');
    return result;
  },

  async createEducation(token: string, edu: Partial<Education>) {
    const res = await fetch(`${API_BASE}/admin/education`, {
      method: 'POST',
      headers: getAuthHeaders(token),
      body: JSON.stringify(edu),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to create education');
    return result;
  },

  async updateEducation(token: string, id: string, edu: Partial<Education>) {
    const res = await fetch(`${API_BASE}/admin/education/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(token),
      body: JSON.stringify(edu),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to update education');
    return result;
  },

  async deleteEducation(token: string, id: string) {
    const res = await fetch(`${API_BASE}/admin/education/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(token),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to delete education');
    return result;
  },

  async updateTheme(token: string, theme: Partial<SiteTheme>) {
    const res = await fetch(`${API_BASE}/admin/theme`, {
      method: 'PUT',
      headers: getAuthHeaders(token),
      body: JSON.stringify(theme),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to update theme');
    return result;
  },

  async updateSeo(token: string, seo: Partial<SeoConfig>) {
    const res = await fetch(`${API_BASE}/admin/seo`, {
      method: 'PUT',
      headers: getAuthHeaders(token),
      body: JSON.stringify(seo),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to update SEO');
    return result;
  },

  async getMessages(token: string): Promise<{ success: boolean; messages: Message[] }> {
    const res = await fetch(`${API_BASE}/admin/messages`, {
      headers: getAuthHeaders(token),
    });
    if (!res.ok) throw new Error('Failed to fetch messages');
    return res.json();
  },

  async markMessageRead(token: string, id: string, read: boolean) {
    const res = await fetch(`${API_BASE}/admin/messages/${id}/read`, {
      method: 'PATCH',
      headers: getAuthHeaders(token),
      body: JSON.stringify({ read }),
    });
    return res.json();
  },

  async deleteMessage(token: string, id: string) {
    const res = await fetch(`${API_BASE}/admin/messages/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(token),
    });
    return res.json();
  },

  async resetPortfolio(token: string) {
    const res = await fetch(`${API_BASE}/admin/reset`, {
      method: 'POST',
      headers: getAuthHeaders(token),
    });
    return res.json();
  },

  async uploadImage(token: string | null, imageBase64: string, filename: string): Promise<string> {
    try {
      const res = await fetch(`${API_BASE}/admin/upload`, {
        method: 'POST',
        headers: getAuthHeaders(token),
        body: JSON.stringify({ imageBase64, filename }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.url) return data.url;
      }
    } catch (e) {
      console.warn('Backend upload encountered error, falling back to data URL', e);
    }
    return imageBase64;
  },
};
