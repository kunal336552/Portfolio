import { Router, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { storage } from '../db/storage.js';
import { requireAdmin, AuthenticatedRequest } from './auth.js';

export const adminRouter = Router();

// Apply requireAdmin to all /api/admin routes
adminRouter.use(requireAdmin);

// Image Upload Endpoint (supports profile avatars and project covers)
adminRouter.post('/upload', (req: AuthenticatedRequest, res: Response): void => {
  try {
    const { imageBase64, filename } = req.body;
    if (!imageBase64) {
      res.status(400).json({ error: 'imageBase64 data is required.' });
      return;
    }

    // Match data URI scheme e.g. data:image/png;base64,.....
    const matches = imageBase64.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
    if (!matches) {
      // If it is already a direct URL or path, return as is
      res.json({ success: true, url: imageBase64 });
      return;
    }

    const rawExt = matches[1].toLowerCase();
    const ext = rawExt === 'jpeg' ? 'jpg' : (rawExt === 'svg+xml' ? 'svg' : rawExt);
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');

    const uploadsDir = path.resolve(process.cwd(), 'src/assets/images/uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const prefix = (filename ? filename.replace(/[^a-zA-Z0-9_-]/g, '_') : 'img').slice(0, 30);
    const cleanName = `${prefix}_${Date.now()}.${ext}`;
    const filePath = path.join(uploadsDir, cleanName);
    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/src/assets/images/uploads/${cleanName}`;
    res.json({ success: true, url: publicUrl });
  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).json({ error: 'Failed to process and store uploaded image.' });
  }
});

// Status
adminRouter.get('/storage-status', (_req: AuthenticatedRequest, res: Response): void => {
  res.json({ success: true, status: storage.getStorageStatus() });
});

// Profile
adminRouter.put('/profile', (req: AuthenticatedRequest, res: Response): void => {
  try {
    const updated = storage.updateProfile(req.body);
    res.json({ success: true, profile: updated });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile.' });
  }
});

// Projects CRUD
adminRouter.get('/projects', (_req: AuthenticatedRequest, res: Response): void => {
  res.json({ success: true, projects: storage.getProjects() });
});

adminRouter.post('/projects', (req: AuthenticatedRequest, res: Response): void => {
  try {
    const { title, slug, category, shortDescription, fullDescription, role, problem, solution, technologies, features, challenges, learnings, image, githubUrl, liveDemoUrl, featured, published, order } = req.body;

    if (!title || !shortDescription || !image || !githubUrl) {
      res.status(400).json({ error: 'Title, short description, image URL, and GitHub URL are required.' });
      return;
    }

    const created = storage.createProject({
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      category: category || 'fullstack',
      shortDescription,
      fullDescription: fullDescription || shortDescription,
      role: role || 'Full-Stack Developer',
      problem: problem || '',
      solution: solution || '',
      technologies: Array.isArray(technologies) ? technologies : (typeof technologies === 'string' ? technologies.split(',').map((t: string) => t.trim()) : []),
      features: Array.isArray(features) ? features : (typeof features === 'string' ? features.split('\n').map((f: string) => f.trim()).filter(Boolean) : []),
      challenges: challenges || '',
      learnings: learnings || '',
      image,
      githubUrl,
      liveDemoUrl: liveDemoUrl || '',
      featured: Boolean(featured),
      order: Number(order) || 0,
      published: published !== false,
    });

    res.status(201).json({ success: true, project: created });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project.' });
  }
});

adminRouter.put('/projects/:id', (req: AuthenticatedRequest, res: Response): void => {
  try {
    const updated = storage.updateProject(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ error: 'Project not found.' });
      return;
    }
    res.json({ success: true, project: updated });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project.' });
  }
});

adminRouter.delete('/projects/:id', (req: AuthenticatedRequest, res: Response): void => {
  try {
    const deleted = storage.deleteProject(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: 'Project not found.' });
      return;
    }
    res.json({ success: true, message: 'Project deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project.' });
  }
});

// Skills CRUD
adminRouter.get('/skills', (_req: AuthenticatedRequest, res: Response): void => {
  res.json({ success: true, skills: storage.getSkills() });
});

adminRouter.post('/skills', (req: AuthenticatedRequest, res: Response): void => {
  try {
    const { name, category, level, icon, order } = req.body;
    if (!name || !category) {
      res.status(400).json({ error: 'Skill name and category are required.' });
      return;
    }
    const created = storage.createSkill({
      name,
      category,
      level: level || 'Intermediate',
      icon: icon || 'Code2',
      order: Number(order) || 0,
    });
    res.status(201).json({ success: true, skill: created });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create skill.' });
  }
});

adminRouter.put('/skills/:id', (req: AuthenticatedRequest, res: Response): void => {
  try {
    const updated = storage.updateSkill(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ error: 'Skill not found.' });
      return;
    }
    res.json({ success: true, skill: updated });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update skill.' });
  }
});

adminRouter.delete('/skills/:id', (req: AuthenticatedRequest, res: Response): void => {
  try {
    const deleted = storage.deleteSkill(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: 'Skill not found.' });
      return;
    }
    res.json({ success: true, message: 'Skill deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete skill.' });
  }
});

// Experience CRUD
adminRouter.get('/experience', (_req: AuthenticatedRequest, res: Response): void => {
  res.json({ success: true, experience: storage.getExperience() });
});

adminRouter.post('/experience', (req: AuthenticatedRequest, res: Response): void => {
  try {
    const created = storage.createExperience(req.body);
    res.status(201).json({ success: true, experience: created });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create experience.' });
  }
});

adminRouter.put('/experience/:id', (req: AuthenticatedRequest, res: Response): void => {
  try {
    const updated = storage.updateExperience(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ error: 'Experience item not found.' });
      return;
    }
    res.json({ success: true, experience: updated });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update experience item.' });
  }
});

adminRouter.delete('/experience/:id', (req: AuthenticatedRequest, res: Response): void => {
  try {
    const deleted = storage.deleteExperience(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: 'Experience item not found.' });
      return;
    }
    res.json({ success: true, message: 'Experience item deleted.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete experience item.' });
  }
});

// Education CRUD
adminRouter.get('/education', (_req: AuthenticatedRequest, res: Response): void => {
  res.json({ success: true, education: storage.getEducation() });
});

adminRouter.post('/education', (req: AuthenticatedRequest, res: Response): void => {
  try {
    const created = storage.createEducation(req.body);
    res.status(201).json({ success: true, education: created });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create education item.' });
  }
});

adminRouter.put('/education/:id', (req: AuthenticatedRequest, res: Response): void => {
  try {
    const updated = storage.updateEducation(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ error: 'Education item not found.' });
      return;
    }
    res.json({ success: true, education: updated });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update education item.' });
  }
});

adminRouter.delete('/education/:id', (req: AuthenticatedRequest, res: Response): void => {
  try {
    const deleted = storage.deleteEducation(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: 'Education item not found.' });
      return;
    }
    res.json({ success: true, message: 'Education item deleted.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete education item.' });
  }
});

// Services CRUD
adminRouter.post('/services', (req: AuthenticatedRequest, res: Response): void => {
  try {
    const created = storage.createService(req.body);
    res.status(201).json({ success: true, service: created });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create service.' });
  }
});

adminRouter.put('/services/:id', (req: AuthenticatedRequest, res: Response): void => {
  try {
    const updated = storage.updateService(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ error: 'Service not found.' });
      return;
    }
    res.json({ success: true, service: updated });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update service.' });
  }
});

adminRouter.delete('/services/:id', (req: AuthenticatedRequest, res: Response): void => {
  try {
    const deleted = storage.deleteService(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: 'Service not found.' });
      return;
    }
    res.json({ success: true, message: 'Service deleted.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete service.' });
  }
});

// Testimonials CRUD
adminRouter.put('/testimonials/:id', (req: AuthenticatedRequest, res: Response): void => {
  try {
    const updated = storage.updateTestimonial(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ error: 'Testimonial not found.' });
      return;
    }
    res.json({ success: true, testimonial: updated });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update testimonial.' });
  }
});

// Theme & SEO
adminRouter.put('/theme', (req: AuthenticatedRequest, res: Response): void => {
  try {
    const updated = storage.updateTheme(req.body);
    res.json({ success: true, theme: updated });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update theme.' });
  }
});

adminRouter.put('/seo', (req: AuthenticatedRequest, res: Response): void => {
  try {
    const updated = storage.updateSeo(req.body);
    res.json({ success: true, seo: updated });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update SEO.' });
  }
});

// Messages Management
adminRouter.get('/messages', (_req: AuthenticatedRequest, res: Response): void => {
  res.json({ success: true, messages: storage.getMessages() });
});

adminRouter.patch('/messages/:id/read', (req: AuthenticatedRequest, res: Response): void => {
  try {
    const read = req.body.read !== false;
    const ok = storage.markMessageRead(req.params.id, read);
    if (!ok) {
      res.status(404).json({ error: 'Message not found.' });
      return;
    }
    res.json({ success: true, message: 'Message updated.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update message.' });
  }
});

adminRouter.delete('/messages/:id', (req: AuthenticatedRequest, res: Response): void => {
  try {
    const deleted = storage.deleteMessage(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: 'Message not found.' });
      return;
    }
    res.json({ success: true, message: 'Message deleted.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete message.' });
  }
});

// Reset Database
adminRouter.post('/reset', (_req: AuthenticatedRequest, res: Response): void => {
  try {
    const fresh = storage.resetToDefaults();
    res.json({ success: true, message: 'Portfolio reset to default state.', data: fresh });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reset portfolio.' });
  }
});
