import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PortfolioData, Project } from '../types/portfolio.js';
import { api } from '../services/api.js';
import { applyThemeToDOM } from '../utils/theme.js';

interface AdminUserState {
  id?: string;
  email: string;
  name: string;
  role: string;
}

interface PortfolioContextType {
  portfolio: PortfolioData | null;
  loading: boolean;
  error: string | null;
  refreshPortfolio: () => Promise<void>;
  
  // Case Study Modal
  selectedProject: Project | null;
  openCaseStudy: (project: Project) => void;
  closeCaseStudy: () => void;

  // Admin Access & Dashboard
  isAdminLoginOpen: boolean;
  isAdminDashboardOpen: boolean;
  adminUser: AdminUserState | null;
  adminToken: string | null;
  openAdminLogin: () => void;
  closeAdminLogin: () => void;
  openAdminDashboard: () => void;
  closeAdminDashboard: () => void;
  loginAdmin: (token: string, user: AdminUserState) => void;
  logoutAdmin: () => void;
  storageStatus: any;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [storageStatus, setStorageStatus] = useState<any>(null);

  // Case Study Modal State
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Admin CMS State
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState<boolean>(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState<boolean>(false);
  const [adminToken, setAdminToken] = useState<string | null>(() => localStorage.getItem('kunal_admin_jwt'));
  const [adminUser, setAdminUser] = useState<AdminUserState | null>(() => {
    const saved = localStorage.getItem('kunal_admin_user');
    return saved ? JSON.parse(saved) : null;
  });

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.getPortfolio();
      if (res.data) {
        setPortfolio(res.data);
        setStorageStatus(res.status);

        // Dynamic document title update
        if (res.data.seo?.siteTitle) {
          document.title = res.data.seo.siteTitle;
        }

        // Apply primary accent and theme palette to DOM
        if (res.data.theme?.primaryAccent) {
          applyThemeToDOM(res.data.theme.primaryAccent);
        } else if (res.data.theme?.accentName) {
          applyThemeToDOM(res.data.theme.accentName);
        }
      }
    } catch (err) {
      console.error('Failed to fetch portfolio:', err);
      setError('Unable to load portfolio details. Please ensure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    // Verify existing admin token if present
    if (adminToken) {
      api.getMe(adminToken).catch(() => {
        // Token expired or invalid
        logoutAdmin();
      });
    }

    // Keyboard shortcut for quick Admin Portal opening: Ctrl+Shift+A or Cmd+Shift+A
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        if (adminToken) {
          setIsAdminDashboardOpen(prev => !prev);
        } else {
          setIsAdminLoginOpen(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const openCaseStudy = (project: Project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeCaseStudy = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  const openAdminLogin = () => {
    setIsAdminLoginOpen(true);
  };

  const closeAdminLogin = () => {
    setIsAdminLoginOpen(false);
  };

  const openAdminDashboard = () => {
    if (!adminToken) {
      setIsAdminLoginOpen(true);
    } else {
      setIsAdminDashboardOpen(true);
    }
  };

  const closeAdminDashboard = () => {
    setIsAdminDashboardOpen(false);
  };

  const loginAdmin = (token: string, user: AdminUserState) => {
    setAdminToken(token);
    setAdminUser(user);
    localStorage.setItem('kunal_admin_jwt', token);
    localStorage.setItem('kunal_admin_user', JSON.stringify(user));
    setIsAdminLoginOpen(false);
    setIsAdminDashboardOpen(true);
  };

  const logoutAdmin = () => {
    setAdminToken(null);
    setAdminUser(null);
    localStorage.removeItem('kunal_admin_jwt');
    localStorage.removeItem('kunal_admin_user');
    setIsAdminDashboardOpen(false);
  };

  return (
    <PortfolioContext.Provider
      value={{
        portfolio,
        loading,
        error,
        refreshPortfolio: loadData,
        selectedProject,
        openCaseStudy,
        closeCaseStudy,
        isAdminLoginOpen,
        isAdminDashboardOpen,
        adminUser,
        adminToken,
        openAdminLogin,
        closeAdminLogin,
        openAdminDashboard,
        closeAdminDashboard,
        loginAdmin,
        logoutAdmin,
        storageStatus
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
