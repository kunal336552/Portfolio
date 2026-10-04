import { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { storage } from '../db/storage.js';

const JWT_SECRET = process.env.JWT_SECRET || 'kunal-portfolio-secure-jwt-key-2026';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export function requireAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Authentication required. No valid Bearer token provided.' });
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string; role: string };
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid or expired session token.' });
  }
}

export const authRouter = Router();

// POST /api/auth/login
authRouter.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required.' });
      return;
    }

    const admin = storage.getAdmin();
    const isEmailMatch = admin.email.toLowerCase() === email.trim().toLowerCase();

    if (!isEmailMatch) {
      res.status(401).json({ error: 'Invalid email or password.' });
      return;
    }

    const isPasswordValid = await storage.verifyAdminPassword(password);
    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid email or password.' });
      return;
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: admin.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'An internal authentication error occurred.' });
  }
});

// GET /api/auth/me
authRouter.get('/me', requireAdmin, (req: AuthenticatedRequest, res: Response): void => {
  const admin = storage.getAdmin();
  res.json({
    user: {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role
    }
  });
});

// POST /api/auth/change-password
authRouter.post('/change-password', requireAdmin, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { currentPassword, newPassword, newEmail } = req.body;

    if (!currentPassword || !newPassword) {
      res.status(400).json({ error: 'Current password and new password are required.' });
      return;
    }

    if (newPassword.length < 6) {
      res.status(400).json({ error: 'New password must be at least 6 characters long.' });
      return;
    }

    const isCurrentValid = await storage.verifyAdminPassword(currentPassword);
    if (!isCurrentValid) {
      res.status(400).json({ error: 'Current password is incorrect.' });
      return;
    }

    await storage.updateAdminPassword(newPassword, newEmail);
    res.json({ success: true, message: 'Admin credentials successfully updated.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update admin credentials.' });
  }
});
