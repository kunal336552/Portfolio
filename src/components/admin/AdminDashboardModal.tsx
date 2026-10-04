import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext.js';
import { api } from '../../services/api.js';
import { Project, Skill, Experience, Education, Message, SiteProfile, SiteTheme, SeoConfig } from '../../types/portfolio.js';
import { applyThemeToDOM } from '../../utils/theme.js';
import {
  X, LayoutDashboard, FolderGit2, Wrench, Briefcase, User, Palette, Globe,
  Mail, Settings, Plus, Trash2, Edit3, Check, RefreshCw, LogOut, ExternalLink,
  Save, AlertCircle, Eye, ShieldCheck, Database, Upload, Image as ImageIcon
} from 'lucide-react';

type AdminTab = 'overview' | 'projects' | 'skills' | 'experience' | 'profile' | 'theme' | 'seo' | 'messages' | 'settings';

export const AdminDashboardModal: React.FC = () => {
  const {
    isAdminDashboardOpen,
    closeAdminDashboard,
    adminToken,
    adminUser,
    logoutAdmin,
    portfolio,
    refreshPortfolio,
    storageStatus
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Edit States
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isNewProject, setIsNewProject] = useState(false);

  const [editingSkill, setEditingSkill] = useState<Partial<Skill> | null>(null);
  const [isNewSkill, setIsNewSkill] = useState(false);

  const [profileForm, setProfileForm] = useState<SiteProfile | null>(null);
  const [themeForm, setThemeForm] = useState<SiteTheme | null>(null);
  const [seoForm, setSeoForm] = useState<SeoConfig | null>(null);

  // Credentials change form
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');

  useEffect(() => {
    if (portfolio) {
      setProfileForm(JSON.parse(JSON.stringify(portfolio.profile)));
      setThemeForm(JSON.parse(JSON.stringify(portfolio.theme)));
      setSeoForm(JSON.parse(JSON.stringify(portfolio.seo)));
    }
  }, [portfolio]);

  useEffect(() => {
    if (isAdminDashboardOpen && adminToken) {
      loadMessages();
    }
  }, [isAdminDashboardOpen, adminToken]);

  const loadMessages = async () => {
    if (!adminToken) return;
    try {
      setLoadingMessages(true);
      const res = await api.getMessages(adminToken);
      if (res.messages) {
        setMessages(res.messages);
      }
    } catch (err) {
      console.error('Failed to load messages:', err);
    } finally {
      setLoadingMessages(false);
    }
  };

  const showNotification = (text: string, type: 'success' | 'error' = 'success') => {
    setStatusMessage({ text, type });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const [uploadingImage, setUploadingImage] = useState<boolean>(false);

  const handleFileUpload = (file: File, onSuccess: (url: string) => void) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showNotification('Please select a valid image file (PNG, JPG, WebP, SVG).', 'error');
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      showNotification('File size is larger than 8MB. Please choose a smaller photo.', 'error');
      return;
    }

    setUploadingImage(true);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target?.result as string;
      if (!base64) {
        setUploadingImage(false);
        return;
      }
      try {
        const uploadedUrl = await api.uploadImage(adminToken, base64, file.name);
        onSuccess(uploadedUrl);
        showNotification('Image uploaded successfully from your computer!');
      } catch (err) {
        onSuccess(base64);
        showNotification('Image loaded successfully!');
      } finally {
        setUploadingImage(false);
      }
    };
    reader.onerror = () => {
      showNotification('Failed to read selected image file.', 'error');
      setUploadingImage(false);
    };
    reader.readAsDataURL(file);
  };

  if (!isAdminDashboardOpen || !adminToken) return null;

  // Save Profile
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileForm) return;
    try {
      await api.updateProfile(adminToken, profileForm);
      await refreshPortfolio();
      showNotification('Profile updated successfully.');
    } catch (err) {
      showNotification((err as Error).message, 'error');
    }
  };

  // Save Theme
  const handleSaveTheme = async (updatedTheme: Partial<SiteTheme>) => {
    try {
      if (updatedTheme.primaryAccent) {
        applyThemeToDOM(updatedTheme.primaryAccent);
      }
      await api.updateTheme(adminToken, updatedTheme);
      await refreshPortfolio();
      showNotification('Theme preferences saved successfully.');
    } catch (err) {
      showNotification((err as Error).message, 'error');
    }
  };

  // Save SEO
  const handleSaveSeo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!seoForm) return;
    try {
      await api.updateSeo(adminToken, seoForm);
      await refreshPortfolio();
      showNotification('SEO settings updated.');
    } catch (err) {
      showNotification((err as Error).message, 'error');
    }
  };

  // Save Project
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    try {
      if (isNewProject) {
        await api.createProject(adminToken, editingProject);
        showNotification('New project published.');
      } else if (editingProject.id) {
        await api.updateProject(adminToken, editingProject.id, editingProject);
        showNotification('Project updated.');
      }
      setEditingProject(null);
      await refreshPortfolio();
    } catch (err) {
      showNotification((err as Error).message, 'error');
    }
  };

  // Delete Project
  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.deleteProject(adminToken, id);
      await refreshPortfolio();
      showNotification('Project deleted.');
    } catch (err) {
      showNotification((err as Error).message, 'error');
    }
  };

  // Save Skill
  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill) return;
    try {
      if (isNewSkill) {
        await api.createSkill(adminToken, editingSkill);
        showNotification('Skill added.');
      } else if (editingSkill.id) {
        await api.updateSkill(adminToken, editingSkill.id, editingSkill);
        showNotification('Skill updated.');
      }
      setEditingSkill(null);
      await refreshPortfolio();
    } catch (err) {
      showNotification((err as Error).message, 'error');
    }
  };

  // Delete Skill
  const handleDeleteSkill = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;
    try {
      await api.deleteSkill(adminToken, id);
      await refreshPortfolio();
      showNotification('Skill deleted.');
    } catch (err) {
      showNotification((err as Error).message, 'error');
    }
  };

  // Mark Message Read
  const handleToggleMessageRead = async (id: string, currentRead: boolean) => {
    try {
      await api.markMessageRead(adminToken, id, !currentRead);
      loadMessages();
    } catch (err) {
      showNotification((err as Error).message, 'error');
    }
  };

  // Delete Message
  const handleDeleteMessage = async (id: string) => {
    if (!confirm('Delete this message permanently?')) return;
    try {
      await api.deleteMessage(adminToken, id);
      loadMessages();
      showNotification('Message deleted.');
    } catch (err) {
      showNotification((err as Error).message, 'error');
    }
  };

  // Change Password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.changePassword(adminToken, {
        currentPassword,
        newPassword,
        newEmail: newEmail || undefined
      });
      showNotification('Admin credentials updated.');
      setCurrentPassword('');
      setNewPassword('');
      setNewEmail('');
    } catch (err) {
      showNotification((err as Error).message, 'error');
    }
  };

  // Factory Reset
  const handleFactoryReset = async () => {
    if (!confirm('Reset all portfolio data to the initial factory seed? All custom changes will be restored to Kunal\'s verified initial data.')) return;
    try {
      await api.resetPortfolio(adminToken);
      await refreshPortfolio();
      showNotification('Portfolio reset to initial seed data.');
    } catch (err) {
      showNotification((err as Error).message, 'error');
    }
  };

  const unreadMessagesCount = messages.filter(m => !m.read).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-hidden animate-fade-in">
      
      {/* Modal Full Container */}
      <div className="relative w-full max-w-7xl h-[94vh] bg-[#090c13] border border-white/[0.12] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Top Bar of CMS */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-[#0c1018] border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <span className="text-sm font-bold text-white font-display">Kunal Shrivastav — Portfolio CMS</span>
              <span className="text-xs font-mono text-slate-400 ml-2">Logged in as {adminUser?.email}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {statusMessage && (
              <span className={`text-xs px-3 py-1 rounded-md font-mono ${
                statusMessage.type === 'success' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
              }`}>
                {statusMessage.text}
              </span>
            )}

            <button
              onClick={refreshPortfolio}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-white/[0.08] rounded-md transition-colors cursor-pointer"
              title="Refresh Portfolio State"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={logoutAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-rose-400 hover:bg-rose-500/10 rounded-md transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>

            <button
              onClick={closeAdminDashboard}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-white/[0.08] rounded-md transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CMS Workspace: Left Sidebar + Main Content */}
        <div className="flex flex-1 overflow-hidden">
          
          {/* Sidebar Tabs */}
          <aside className="w-56 shrink-0 bg-[#07090e] border-r border-white/[0.08] p-3 flex flex-col justify-between">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'overview' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/35 font-semibold shadow-sm' : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Overview</span>
              </button>

              <button
                onClick={() => setActiveTab('projects')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'projects' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/35 font-semibold shadow-sm' : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FolderGit2 className="w-4 h-4" />
                  <span>Projects</span>
                </div>
                <span className="text-[10px] font-mono opacity-80">{portfolio?.projects.length || 0}</span>
              </button>

              <button
                onClick={() => setActiveTab('skills')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'skills' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/35 font-semibold shadow-sm' : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Wrench className="w-4 h-4" />
                  <span>Skills</span>
                </div>
                <span className="text-[10px] font-mono opacity-80">{portfolio?.skills.length || 0}</span>
              </button>

              <button
                onClick={() => setActiveTab('experience')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'experience' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/35 font-semibold shadow-sm' : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Experience &amp; Edu</span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'profile' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/35 font-semibold shadow-sm' : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Profile &amp; Bio</span>
              </button>

              <button
                onClick={() => setActiveTab('messages')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'messages' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/35 font-semibold shadow-sm' : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4" />
                  <span>Inbound Inquiries</span>
                </div>
                {unreadMessagesCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-emerald-500 text-black text-[10px] font-bold">
                    {unreadMessagesCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('theme')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'theme' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/35 font-semibold shadow-sm' : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Palette className="w-4 h-4" />
                <span>Theme &amp; Sections</span>
              </button>

              <button
                onClick={() => setActiveTab('seo')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'seo' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/35 font-semibold shadow-sm' : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Globe className="w-4 h-4" />
                <span>SEO &amp; Metadata</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'settings' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/35 font-semibold shadow-sm' : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>System &amp; Security</span>
              </button>
            </nav>

            {/* Persistence Indicator */}
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-[11px] font-mono space-y-1">
              <div className="text-slate-400 flex items-center gap-1.5">
                <Database className="w-3 h-3 text-red-400" />
                <span>Engine:</span>
              </div>
              <div className="text-emerald-400 truncate">
                {storageStatus?.mode || 'Active Storage'}
              </div>
            </div>
          </aside>

          {/* Main Workspace Area */}
          <main className="flex-1 overflow-y-auto p-6 sm:p-8 bg-[#090c13]">
            
            {/* 1. OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-white font-display">System Overview</h2>
                  <p className="text-xs text-slate-400 mt-1">Live status of the MERN full-stack developer portfolio and CMS.</p>
                </div>

                {/* Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="p-5 rounded-xl border border-white/[0.08] bg-[#0c1018]">
                    <div className="text-xs text-slate-400 font-mono">Live Projects</div>
                    <div className="text-3xl font-bold text-white mt-1 tabular-nums">
                      {portfolio?.projects.length || 0}
                    </div>
                  </div>
                  <div className="p-5 rounded-xl border border-white/[0.08] bg-[#0c1018]">
                    <div className="text-xs text-slate-400 font-mono">Tech Skills</div>
                    <div className="text-3xl font-bold text-white mt-1 tabular-nums">
                      {portfolio?.skills.length || 0}
                    </div>
                  </div>
                  <div className="p-5 rounded-xl border border-white/[0.08] bg-[#0c1018]">
                    <div className="text-xs text-slate-400 font-mono">Inbound Inquiries</div>
                    <div className="text-3xl font-bold text-white mt-1 tabular-nums">
                      {messages.length}
                    </div>
                  </div>
                  <div className="p-5 rounded-xl border border-white/[0.08] bg-[#0c1018]">
                    <div className="text-xs text-slate-400 font-mono">Active Theme</div>
                    <div className="text-lg font-bold text-emerald-400 mt-1">
                      {portfolio?.theme.accentName || 'Emerald Mint'}
                    </div>
                  </div>
                </div>

                {/* Quick actions panel */}
                <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#0c1018] space-y-4">
                  <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">Quick CMS Tasks</h3>
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => {
                        setEditingProject({
                          title: '',
                          slug: '',
                          category: 'fullstack',
                          shortDescription: '',
                          fullDescription: '',
                          role: 'Full-Stack Developer',
                          problem: '',
                          solution: '',
                          technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
                          features: ['User Authentication', 'REST APIs', 'Responsive UI'],
                          challenges: '',
                          learnings: '',
                          image: '/src/assets/images/hero_developer_workspace_1790581907335.jpg',
                          githubUrl: 'https://github.com/kunal336552',
                          liveDemoUrl: '',
                          featured: false,
                          published: true,
                          order: (portfolio?.projects.length || 0) + 1
                        });
                        setIsNewProject(true);
                        setActiveTab('projects');
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 text-black font-semibold text-xs cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.35)]"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Project</span>
                    </button>

                    <button
                      onClick={() => {
                        setEditingSkill({
                          name: '',
                          category: 'frontend',
                          level: 'Intermediate',
                          icon: 'Code2',
                          order: (portfolio?.skills.length || 0) + 1
                        });
                        setIsNewSkill(true);
                        setActiveTab('skills');
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-white text-xs cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Skill</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('messages')}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-white text-xs cursor-pointer"
                    >
                      <Mail className="w-4 h-4" />
                      <span>View Inbound Messages</span>
                    </button>
                  </div>
                </div>

                {/* Storage & Deployment Info */}
                <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#0c1018] space-y-3 text-xs text-slate-300">
                  <div className="font-semibold text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>MERN Stack Architecture Details</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    This portfolio runs on an Express backend with Mongoose schemas and native REST endpoints. All updates in this CMS write directly to database storage without requiring code edits or Git commits.
                  </p>
                  <div className="pt-2 flex items-center gap-4 text-slate-500 font-mono text-[11px]">
                    <span>MongoDB Atlas Ready</span>
                    <span>·</span>
                    <span>JWT Session Verification</span>
                    <span>·</span>
                    <span>Zero Static Rebuilds Needed</span>
                  </div>
                </div>
              </div>
            )}

            {/* 2. PROJECTS TAB */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white font-display">Projects Manager</h2>
                    <p className="text-xs text-slate-400 mt-1">Add, update, or remove portfolio projects and case studies.</p>
                  </div>

                  {!editingProject && (
                    <button
                      onClick={() => {
                        setEditingProject({
                          title: '',
                          slug: '',
                          category: 'fullstack',
                          shortDescription: '',
                          fullDescription: '',
                          role: 'Full-Stack Developer',
                          problem: '',
                          solution: '',
                          technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
                          features: ['User Auth', 'REST APIs', 'Responsive Design'],
                          challenges: '',
                          learnings: '',
                          image: '/src/assets/images/hero_developer_workspace_1790581907335.jpg',
                          githubUrl: 'https://github.com/kunal336552',
                          liveDemoUrl: '',
                          featured: false,
                          published: true,
                          order: (portfolio?.projects.length || 0) + 1
                        });
                        setIsNewProject(true);
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 text-black font-semibold text-xs cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.35)]"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Create Project</span>
                    </button>
                  )}
                </div>

                {/* Edit Form */}
                {editingProject ? (
                  <form onSubmit={handleSaveProject} className="p-6 rounded-2xl border border-white/[0.12] bg-[#0c1018] space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                      <h3 className="text-base font-bold text-white">
                        {isNewProject ? 'Add New Project' : `Edit: ${editingProject.title}`}
                      </h3>
                      <button
                        type="button"
                        onClick={() => setEditingProject(null)}
                        className="text-xs text-slate-400 hover:text-white"
                      >
                        Cancel
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">Project Title</label>
                        <input
                          type="text"
                          required
                          value={editingProject.title || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                          className="w-full px-3 py-2 bg-[#080a0f] border border-white/[0.1] rounded-lg text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">Category</label>
                        <select
                          value={editingProject.category || 'fullstack'}
                          onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as any })}
                          className="w-full px-3 py-2 bg-[#080a0f] border border-white/[0.1] rounded-lg text-xs text-white"
                        >
                          <option value="fullstack">Full-Stack MERN</option>
                          <option value="ott">OTT &amp; Streaming</option>
                          <option value="frontend">Frontend &amp; UI</option>
                          <option value="backend">Backend &amp; APIs</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-mono text-slate-300 mb-1">Short Description (Card Summary)</label>
                        <textarea
                          rows={2}
                          required
                          value={editingProject.shortDescription || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, shortDescription: e.target.value })}
                          className="w-full px-3 py-2 bg-[#080a0f] border border-white/[0.1] rounded-lg text-xs text-white resize-none"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-mono text-slate-300 mb-1">Full Description (Case Study)</label>
                        <textarea
                          rows={3}
                          value={editingProject.fullDescription || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, fullDescription: e.target.value })}
                          className="w-full px-3 py-2 bg-[#080a0f] border border-white/[0.1] rounded-lg text-xs text-white resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">My Engineering Role</label>
                        <input
                          type="text"
                          value={editingProject.role || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, role: e.target.value })}
                          className="w-full px-3 py-2 bg-[#080a0f] border border-white/[0.1] rounded-lg text-xs text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="block text-xs font-mono text-slate-300">Project Cover Image</label>
                          <label className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/35 hover:bg-emerald-500/30 text-[11px] font-mono cursor-pointer transition-colors">
                            <Upload className="w-3.5 h-3.5" />
                            <span>{uploadingImage ? 'Uploading...' : 'Upload from File Explorer'}</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              disabled={uploadingImage}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleFileUpload(file, (url) => {
                                    setEditingProject({ ...editingProject, image: url });
                                  });
                                }
                                e.target.value = '';
                              }}
                            />
                          </label>
                        </div>

                        <div className="flex items-center gap-3">
                          {editingProject.image ? (
                            <img
                              src={editingProject.image}
                              alt="Project Cover Preview"
                              className="w-12 h-12 rounded-lg object-cover border border-emerald-500/30 bg-slate-900 shrink-0"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-lg border border-dashed border-white/20 bg-black/40 flex items-center justify-center shrink-0 text-slate-500">
                              <ImageIcon className="w-5 h-5" />
                            </div>
                          )}
                          <input
                            type="text"
                            required
                            placeholder="Image URL or click 'Upload from File Explorer'"
                            value={editingProject.image || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                            className="flex-1 px-3 py-2 bg-[#080a0f] border border-white/[0.1] rounded-lg text-xs text-white placeholder-slate-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">GitHub URL</label>
                        <input
                          type="url"
                          required
                          value={editingProject.githubUrl || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                          className="w-full px-3 py-2 bg-[#080a0f] border border-white/[0.1] rounded-lg text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">Live Demo URL (Optional)</label>
                        <input
                          type="url"
                          value={editingProject.liveDemoUrl || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, liveDemoUrl: e.target.value })}
                          className="w-full px-3 py-2 bg-[#080a0f] border border-white/[0.1] rounded-lg text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">Technologies (Comma separated)</label>
                        <input
                          type="text"
                          value={Array.isArray(editingProject.technologies) ? editingProject.technologies.join(', ') : ''}
                          onChange={(e) => setEditingProject({
                            ...editingProject,
                            technologies: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
                          })}
                          className="w-full px-3 py-2 bg-[#080a0f] border border-white/[0.1] rounded-lg text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">Features (One per line)</label>
                        <textarea
                          rows={2}
                          value={Array.isArray(editingProject.features) ? editingProject.features.join('\n') : ''}
                          onChange={(e) => setEditingProject({
                            ...editingProject,
                            features: e.target.value.split('\n').map(f => f.trim()).filter(Boolean)
                          })}
                          className="w-full px-3 py-2 bg-[#080a0f] border border-white/[0.1] rounded-lg text-xs text-white resize-none"
                        />
                      </div>

                      <div className="sm:col-span-2 grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono text-slate-300 mb-1">Problem Statement</label>
                          <textarea
                            rows={2}
                            value={editingProject.problem || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, problem: e.target.value })}
                            className="w-full px-3 py-2 bg-[#080a0f] border border-white/[0.1] rounded-lg text-xs text-white resize-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-slate-300 mb-1">Solution Implemented</label>
                          <textarea
                            rows={2}
                            value={editingProject.solution || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, solution: e.target.value })}
                            className="w-full px-3 py-2 bg-[#080a0f] border border-white/[0.1] rounded-lg text-xs text-white resize-none"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-6 sm:col-span-2 pt-2">
                        <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editingProject.featured || false}
                            onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                            className="rounded text-red-400"
                          />
                          <span>Featured on Homepage</span>
                        </label>

                        <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editingProject.published !== false}
                            onChange={(e) => setEditingProject({ ...editingProject, published: e.target.checked })}
                            className="rounded text-red-400"
                          />
                          <span>Published (Visible to Visitors)</span>
                        </label>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.08]">
                      <button
                        type="button"
                        onClick={() => setEditingProject(null)}
                        className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 text-black font-semibold text-xs cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.35)]"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save Project</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  /* Projects List */
                  <div className="space-y-3">
                    {portfolio?.projects.map((proj) => (
                      <div
                        key={proj.id}
                        className="p-4 rounded-xl border border-white/[0.08] bg-[#0c1018] flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={proj.image}
                            alt=""
                            className="w-12 h-12 rounded-lg object-cover bg-slate-800 shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-white font-display">{proj.title}</h4>
                              {proj.featured && (
                                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">Featured</span>
                              )}
                              {!proj.published && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-400 font-mono">Draft</span>
                              )}
                            </div>
                            <div className="text-xs text-slate-400 font-mono mt-0.5">
                              {proj.category.toUpperCase()} · {proj.technologies.slice(0, 3).join(', ')}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingProject(JSON.parse(JSON.stringify(proj)));
                              setIsNewProject(false);
                            }}
                            className="p-2 text-slate-400 hover:text-white hover:bg-white/[0.08] rounded-lg transition-colors cursor-pointer"
                            title="Edit Project"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(proj.id)}
                            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                            title="Delete Project"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 3. SKILLS TAB */}
            {activeTab === 'skills' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white font-display">Technical Skills Manager</h2>
                    <p className="text-xs text-slate-400 mt-1">Manage technologies across Frontend, Backend, Database, and Learning.</p>
                  </div>

                  {!editingSkill && (
                    <button
                      onClick={() => {
                        setEditingSkill({
                          name: '',
                          category: 'frontend',
                          level: 'Intermediate',
                          icon: 'Code2',
                          order: (portfolio?.skills.length || 0) + 1
                        });
                        setIsNewSkill(true);
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 text-black font-semibold text-xs cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.35)]"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Skill</span>
                    </button>
                  )}
                </div>

                {editingSkill ? (
                  <form onSubmit={handleSaveSkill} className="p-6 rounded-2xl border border-white/[0.12] bg-[#0c1018] space-y-4">
                    <h3 className="text-base font-bold text-white">
                      {isNewSkill ? 'Add New Technology' : `Edit: ${editingSkill.name}`}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">Technology Name</label>
                        <input
                          type="text"
                          required
                          value={editingSkill.name || ''}
                          onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                          className="w-full px-3 py-2 bg-[#080a0f] border border-white/[0.1] rounded-lg text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">Category</label>
                        <select
                          value={editingSkill.category || 'frontend'}
                          onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value as any })}
                          className="w-full px-3 py-2 bg-[#080a0f] border border-white/[0.1] rounded-lg text-xs text-white"
                        >
                          <option value="frontend">Frontend &amp; UI</option>
                          <option value="backend">Backend &amp; REST APIs</option>
                          <option value="database">Database &amp; ODM</option>
                          <option value="tools">Developer Tools</option>
                          <option value="learning">Currently Learning</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">Proficiency Indicator</label>
                        <input
                          type="text"
                          value={editingSkill.level || 'Intermediate'}
                          onChange={(e) => setEditingSkill({ ...editingSkill, level: e.target.value })}
                          className="w-full px-3 py-2 bg-[#080a0f] border border-white/[0.1] rounded-lg text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.08]">
                      <button
                        type="button"
                        onClick={() => setEditingSkill(null)}
                        className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 text-black font-semibold text-xs cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.35)]"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save Skill</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {portfolio?.skills.map((skill) => (
                      <div
                        key={skill.id}
                        className="p-3.5 rounded-xl border border-white/[0.08] bg-[#0c1018] flex items-center justify-between"
                      >
                        <div>
                          <div className="text-xs font-bold text-white">{skill.name}</div>
                          <div className="text-[11px] font-mono text-slate-400">{skill.category} · {skill.level}</div>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              setEditingSkill(JSON.parse(JSON.stringify(skill)));
                              setIsNewSkill(false);
                            }}
                            className="p-1.5 text-slate-400 hover:text-white hover:bg-white/[0.08] rounded cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteSkill(skill.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 4. EXPERIENCE & EDUCATION TAB */}
            {activeTab === 'experience' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-white font-display">Experience &amp; Education</h2>
                  <p className="text-xs text-slate-400 mt-1">Review and manage professional roles (Humanoid Maker) and academic trajectory (IGNOU).</p>
                </div>

                {/* Experience items */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">Work Engagements</h3>
                  {portfolio?.experience.map((exp) => (
                    <div key={exp.id} className="p-6 rounded-2xl border border-white/[0.08] bg-[#0c1018] space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-base font-bold text-white">{exp.role} · {exp.company}</h4>
                          <div className="text-xs text-slate-400 font-mono mt-0.5">{exp.startDate} — {exp.endDate} · {exp.location}</div>
                        </div>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
                </div>

                {/* Education items */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">Formal Education</h3>
                  {portfolio?.education.map((edu) => (
                    <div key={edu.id} className="p-6 rounded-2xl border border-white/[0.08] bg-[#0c1018] space-y-3">
                      <div>
                        <h4 className="text-base font-bold text-white">{edu.degree}</h4>
                        <div className="text-xs text-slate-400 font-mono mt-0.5">{edu.institution} · {edu.startDate} — {edu.endDate}</div>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{edu.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. PROFILE & BIO TAB */}
            {activeTab === 'profile' && profileForm && (
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white font-display">Profile &amp; Biography</h2>
                  <p className="text-xs text-slate-400 mt-1">Edit your hero copy, introduction, and contact coordinates.</p>
                </div>

                <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#0c1018] grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Owner / Developer Avatar Image Upload Section */}
                  <div className="sm:col-span-2 p-5 rounded-2xl border border-emerald-500/25 bg-emerald-950/20 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="relative group shrink-0">
                          <img
                            src={profileForm.avatarUrl || '/src/assets/images/avatar_kunal_editorial_1790581967170.jpg'}
                            alt={profileForm.name}
                            className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-500/40 shadow-lg bg-slate-900"
                          />
                          <label className="absolute inset-0 bg-black/60 rounded-2xl opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-opacity text-white text-[10px] font-mono">
                            <Upload className="w-4 h-4 mb-0.5 text-emerald-400" />
                            <span>Change</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              disabled={uploadingImage}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleFileUpload(file, (url) => {
                                    setProfileForm({ ...profileForm, avatarUrl: url });
                                  });
                                }
                                e.target.value = '';
                              }}
                            />
                          </label>
                        </div>

                        <div>
                          <h4 className="text-sm font-bold text-white font-display">Owner / Developer Photo</h4>
                          <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                            Upload your real photo directly from your file explorer to replace the default portrait.
                          </p>
                          <div className="flex flex-wrap items-center gap-2 mt-2.5">
                            <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 text-black font-semibold text-xs cursor-pointer shadow-sm transition-all">
                              <Upload className="w-3.5 h-3.5" />
                              <span>{uploadingImage ? 'Uploading...' : 'Upload Photo from File Explorer'}</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                disabled={uploadingImage}
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    handleFileUpload(file, (url) => {
                                      setProfileForm({ ...profileForm, avatarUrl: url });
                                    });
                                  }
                                  e.target.value = '';
                                }}
                              />
                            </label>
                            {profileForm.avatarUrl && (
                              <button
                                type="button"
                                onClick={() => setProfileForm({ ...profileForm, avatarUrl: '/src/assets/images/avatar_kunal_editorial_1790581967170.jpg' })}
                                className="px-2.5 py-1.5 text-xs text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                              >
                                Reset to Default
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">Direct Avatar Image URL</label>
                      <input
                        type="text"
                        placeholder="Paste image URL or use the upload button above"
                        value={profileForm.avatarUrl || ''}
                        onChange={(e) => setProfileForm({ ...profileForm, avatarUrl: e.target.value })}
                        className="w-full px-3 py-2 bg-[#080a0f] border border-white/[0.1] rounded-lg text-xs text-white placeholder-slate-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Developer Full Name</label>
                    <input
                      type="text"
                      required
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full px-3 py-2 bg-[#080a0f] border border-white/[0.1] rounded-lg text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Professional Title</label>
                    <input
                      type="text"
                      required
                      value={profileForm.title}
                      onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                      className="w-full px-3 py-2 bg-[#080a0f] border border-white/[0.1] rounded-lg text-xs text-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-mono text-slate-300 mb-1">Hero Main Headline</label>
                    <input
                      type="text"
                      required
                      value={profileForm.headline}
                      onChange={(e) => setProfileForm({ ...profileForm, headline: e.target.value })}
                      className="w-full px-3 py-2 bg-[#080a0f] border border-white/[0.1] rounded-lg text-xs text-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-mono text-slate-300 mb-1">Hero Subheadline</label>
                    <textarea
                      rows={2}
                      value={profileForm.subheadline}
                      onChange={(e) => setProfileForm({ ...profileForm, subheadline: e.target.value })}
                      className="w-full px-3 py-2 bg-[#080a0f] border border-white/[0.1] rounded-lg text-xs text-white resize-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-mono text-slate-300 mb-1">About Narrative Bio</label>
                    <textarea
                      rows={4}
                      value={profileForm.bio}
                      onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                      className="w-full px-3 py-2 bg-[#080a0f] border border-white/[0.1] rounded-lg text-xs text-white resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Location</label>
                    <input
                      type="text"
                      value={profileForm.location}
                      onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                      className="w-full px-3 py-2 bg-[#080a0f] border border-white/[0.1] rounded-lg text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Public Email</label>
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="w-full px-3 py-2 bg-[#080a0f] border border-white/[0.1] rounded-lg text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">GitHub Profile URL</label>
                    <input
                      type="url"
                      value={profileForm.githubUrl}
                      onChange={(e) => setProfileForm({ ...profileForm, githubUrl: e.target.value })}
                      className="w-full px-3 py-2 bg-[#080a0f] border border-white/[0.1] rounded-lg text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">LinkedIn Profile URL</label>
                    <input
                      type="url"
                      value={profileForm.linkedinUrl}
                      onChange={(e) => setProfileForm({ ...profileForm, linkedinUrl: e.target.value })}
                      className="w-full px-3 py-2 bg-[#080a0f] border border-white/[0.1] rounded-lg text-xs text-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 text-black font-semibold text-xs cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.35)]"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Profile Changes</span>
                  </button>
                </div>
              </form>
            )}

            {/* 6. MESSAGES INBOX */}
            {activeTab === 'messages' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white font-display">Inbound Inquiries</h2>
                    <p className="text-xs text-slate-400 mt-1">Direct inquiries submitted through the contact form.</p>
                  </div>

                  <button
                    onClick={loadMessages}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] text-xs text-slate-300 hover:text-white"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Refresh</span>
                  </button>
                </div>

                {loadingMessages ? (
                  <div className="py-12 text-center text-xs text-slate-400">Loading inquiries...</div>
                ) : messages.length === 0 ? (
                  <div className="p-8 rounded-xl border border-dashed border-white/[0.1] text-center text-xs text-slate-400">
                    No inbound messages recorded yet. Submit a message on the public site to see it appear here.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`p-5 rounded-xl border transition-colors space-y-3 ${
                          msg.read ? 'border-white/[0.06] bg-[#0c1018]' : 'border-emerald-500/40 bg-emerald-950/20'
                        }`}
                      >
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-white">{msg.name}</span>
                              <span className="text-xs font-mono text-slate-400">&lt;{msg.email}&gt;</span>
                              {!msg.read && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500 text-black font-bold font-mono">
                                  NEW
                                </span>
                              )}
                            </div>
                            <div className="text-xs font-semibold text-emerald-300 mt-1">{msg.subject}</div>
                          </div>

                          <div className="text-[11px] font-mono text-slate-500">
                            {new Date(msg.createdAt).toLocaleString()}
                          </div>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed bg-[#080a0f] p-3 rounded-lg border border-white/[0.04]">
                          {msg.message}
                        </p>

                        <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-xs">
                          <a
                            href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                            className="inline-flex items-center gap-1.5 text-red-400 hover:underline"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>Reply via Email</span>
                          </a>

                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleToggleMessageRead(msg.id, msg.read)}
                              className="text-slate-400 hover:text-white"
                            >
                              {msg.read ? 'Mark as Unread' : 'Mark as Read'}
                            </button>
                            <button
                              onClick={() => handleDeleteMessage(msg.id)}
                              className="text-rose-400 hover:underline"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 7. THEME & SECTIONS TAB */}
            {activeTab === 'theme' && themeForm && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-white font-display">Theme &amp; Section Layout</h2>
                  <p className="text-xs text-slate-400 mt-1">Customize primary accent color, active sections, and border radius.</p>
                </div>

                {/* Accent Color Presets */}
                <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#0c1018] space-y-4">
                  <h3 className="text-xs font-mono text-slate-300 uppercase tracking-wider">Primary Accent Color</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {[
                      { hex: '#10b981', name: 'Emerald Mint' },
                      { hex: '#3b82f6', name: 'Electric Cobalt' },
                      { hex: '#8b5cf6', name: 'Modern Violet' },
                      { hex: '#f59e0b', name: 'Amber Gold' },
                      { hex: '#06b6d4', name: 'Cyan Neon' },
                      { hex: '#f43f5e', name: 'Cinnabar Rose' },
                    ].map((accent) => {
                      const isSelected = themeForm.primaryAccent === accent.hex;
                      return (
                        <button
                          key={accent.hex}
                          type="button"
                          onClick={() => {
                            const updated = { ...themeForm, primaryAccent: accent.hex, accentName: accent.name };
                            setThemeForm(updated);
                            applyThemeToDOM(accent.hex);
                            handleSaveTheme(updated);
                          }}
                          className={`p-3 rounded-xl border text-left flex items-center justify-between gap-2 transition-all cursor-pointer ${
                            isSelected
                              ? 'border-emerald-400 bg-emerald-500/15 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                              : 'border-white/[0.06] bg-[#080a0f] hover:border-white/[0.2]'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm" style={{ backgroundColor: accent.hex }} />
                            <span className="text-xs text-white font-medium truncate">{accent.name}</span>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Section Visibility Toggles */}
                <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#0c1018] space-y-4">
                  <h3 className="text-xs font-mono text-slate-300 uppercase tracking-wider">Section Visibility Toggles</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {Object.entries(themeForm.sectionVisibility).map(([key, isVisible]) => (
                      <label
                        key={key}
                        className="flex items-center justify-between p-3 rounded-xl border border-white/[0.06] bg-[#080a0f] cursor-pointer"
                      >
                        <span className="text-xs font-medium text-white capitalize">{key} Section</span>
                        <input
                          type="checkbox"
                          checked={isVisible}
                          onChange={(e) => {
                            const updated = {
                              ...themeForm,
                              sectionVisibility: {
                                ...themeForm.sectionVisibility,
                                [key]: e.target.checked
                              }
                            };
                            setThemeForm(updated);
                            handleSaveTheme(updated);
                          }}
                          className="rounded text-emerald-500 focus:ring-emerald-500"
                        />
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 8. SEO TAB */}
            {activeTab === 'seo' && seoForm && (
              <form onSubmit={handleSaveSeo} className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white font-display">SEO &amp; Social Sharing</h2>
                  <p className="text-xs text-slate-400 mt-1">Configure page title, meta description, and keywords.</p>
                </div>

                <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#0c1018] space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Browser Tab &amp; OpenGraph Title</label>
                    <input
                      type="text"
                      required
                      value={seoForm.siteTitle}
                      onChange={(e) => setSeoForm({ ...seoForm, siteTitle: e.target.value })}
                      className="w-full px-3 py-2 bg-[#080a0f] border border-white/[0.1] rounded-lg text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Search Meta Description</label>
                    <textarea
                      rows={3}
                      required
                      value={seoForm.metaDescription}
                      onChange={(e) => setSeoForm({ ...seoForm, metaDescription: e.target.value })}
                      className="w-full px-3 py-2 bg-[#080a0f] border border-white/[0.1] rounded-lg text-xs text-white resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Keywords</label>
                    <input
                      type="text"
                      value={seoForm.keywords}
                      onChange={(e) => setSeoForm({ ...seoForm, keywords: e.target.value })}
                      className="w-full px-3 py-2 bg-[#080a0f] border border-white/[0.1] rounded-lg text-xs text-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 text-black font-semibold text-xs cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.35)]"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save SEO Configuration</span>
                  </button>
                </div>
              </form>
            )}

            {/* 9. SETTINGS & SECURITY TAB */}
            {activeTab === 'settings' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-white font-display">System &amp; Security Settings</h2>
                  <p className="text-xs text-slate-400 mt-1">Manage admin credentials and maintenance operations.</p>
                </div>

                {/* Change Password Form */}
                <form onSubmit={handleChangePassword} className="p-6 rounded-2xl border border-white/[0.08] bg-[#0c1018] space-y-4">
                  <h3 className="text-xs font-mono text-slate-300 uppercase tracking-wider">Change Admin Credentials</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Current Password</label>
                      <input
                        type="password"
                        required
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full px-3 py-2 bg-[#080a0f] border border-white/[0.1] rounded-lg text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">New Password</label>
                      <input
                        type="password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-3 py-2 bg-[#080a0f] border border-white/[0.1] rounded-lg text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Update Admin Email (Optional)</label>
                      <input
                        type="email"
                        placeholder="Leave blank to keep"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        className="w-full px-3 py-2 bg-[#080a0f] border border-white/[0.1] rounded-lg text-xs text-white"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 text-black font-semibold text-xs cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.35)]"
                  >
                    <span>Update Credentials</span>
                  </button>
                </form>

                {/* Reset to Default Seed Data */}
                <div className="p-6 rounded-2xl border border-rose-500/20 bg-rose-500/[0.03] space-y-3">
                  <h3 className="text-xs font-mono text-rose-400 uppercase tracking-wider">Factory Data Reset</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Reset all projects, skills, and settings to Kunal's initial verified MERN stack portfolio data.
                  </p>
                  <button
                    type="button"
                    onClick={handleFactoryReset}
                    className="px-4 py-2 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 text-xs font-semibold border border-rose-500/30 cursor-pointer transition-colors"
                  >
                    Restore Initial Seed Data
                  </button>
                </div>
              </div>
            )}

          </main>
        </div>

      </div>
    </div>
  );
};
