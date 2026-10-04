import { Router, Request, Response } from 'express';
import { storage } from '../db/storage.js';

export const publicRouter = Router();

// GET /api/portfolio
publicRouter.get('/portfolio', (_req: Request, res: Response): void => {
  try {
    const portfolio = storage.getPortfolio();
    res.json({
      success: true,
      data: portfolio,
      status: storage.getStorageStatus()
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve portfolio data.' });
  }
});

// GET /api/projects
publicRouter.get('/projects', (_req: Request, res: Response): void => {
  try {
    const projects = storage.getProjects().filter(p => p.published);
    res.json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve projects.' });
  }
});

// GET /api/projects/:slug
publicRouter.get('/projects/:slug', (req: Request, res: Response): void => {
  try {
    const project = storage.getProjectBySlug(req.params.slug);
    if (!project) {
      res.status(404).json({ error: 'Project not found.' });
      return;
    }
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve project details.' });
  }
});

// POST /api/messages (Contact Form)
publicRouter.post('/messages', (req: Request, res: Response): void => {
  try {
    const { name, email, subject, message, honeypot } = req.body;

    // Honeypot spam check
    if (honeypot) {
      res.json({ success: true, message: 'Message sent successfully.' });
      return;
    }

    if (!name || !email || !message) {
      res.status(400).json({ error: 'Name, email, and message are required fields.' });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ error: 'Please enter a valid email address.' });
      return;
    }

    const savedMessage = storage.saveMessage({
      name,
      email,
      subject: subject || 'General Inbound Inquiry',
      message
    });

    res.status(201).json({
      success: true,
      message: 'Thank you, Kunal has received your message and will respond shortly!',
      data: { id: savedMessage.id }
    });
  } catch (error) {
    res.status(500).json({ error: 'Unable to send message. Please try again later.' });
  }
});

// GET /api/status
publicRouter.get('/status', (_req: Request, res: Response): void => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    storage: storage.getStorageStatus()
  });
});
