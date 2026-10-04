import { PortfolioData } from '../../src/types/portfolio.js';

export const initialPortfolioData: PortfolioData = {
  profile: {
    name: 'Kunal Shrivastav',
    title: 'Full-Stack MERN Developer',
    headline: 'Building scalable full-stack applications with React, Node.js, Express, and MongoDB.',
    subheadline: 'Specialized in full-stack architecture, high-performance REST APIs, and responsive frontends. Experienced in delivering production streaming and MERN platforms at Humanoid Maker in New Delhi, India.',
    bio: 'I am a Full-Stack MERN Developer based in New Delhi with a strong focus on building scalable web applications from database architecture to responsive user interfaces. With hands-on industry experience at Humanoid Maker engineering video streaming and full-stack platforms, I specialize in combining robust Node.js/Express backends and MongoDB databases with modern, reactive React frontends. Currently pursuing my BCA at IGNOU, I focus on clean code, structured APIs, and high performance.',
    location: 'New Delhi, India',
    email: 'kunal336552@gmail.com',
    avatarUrl: '/src/assets/images/avatar_kunal_editorial_1790581967170.jpg',
    resumeUrl: '#contact',
    availabilityStatus: 'Open to Full-Stack Developer Roles',
    yearsExp: 'Full-Stack & Production Experience',
    githubUrl: 'https://github.com/kunal336552',
    linkedinUrl: 'https://linkedin.com/in/kunal-shrivastav',
  },
  projects: [
    {
      id: 'proj-1',
      title: 'StreamPulse | High-Performance Cinema & Media Streaming Engine',
      slug: 'streampulse-ott-platform',
      category: 'ott',
      shortDescription: 'Production-grade OTT streaming interface featuring virtualized media shelves, sub-50ms debounced catalog search, trailer modal playback, and zero-layout-shift UI.',
      fullDescription: 'A high-fidelity streaming platform interface inspired by production OTT engineering at Humanoid Maker. Built with React and modern CSS architecture to solve client-side lag across hundreds of high-resolution media posters. Features instant debounced search queries, responsive multi-shelf horizontal carousels, video trailer playback modals, and resilient fallback states.',
      role: 'Frontend & API Integration Engineer',
      problem: 'Streaming platforms encounter severe client-side frame drops and layout shifts when mounting multi-shelf carousels with dozens of dynamic posters concurrently.',
      solution: 'Engineered modular React component architecture with native lazy-loading, aspect-ratio bounding boxes, and debounced REST API queries to preserve 60fps scrolling across mobile and desktop.',
      technologies: ['React 19', 'JavaScript (ES6+)', 'REST APIs', 'Tailwind CSS', 'Context API', 'Web Performance', 'HLS/Video UI'],
      features: [
        'Cinematic spotlight hero with dynamic high-resolution backdrop',
        'Horizontal multi-category carousels with smooth wheel and touch swipe',
        'Sub-50ms debounced catalog search across titles and genres',
        'Integrated video modal player with movie metadata, ratings, and synopsis',
        'Zero cumulative layout shift (CLS) with responsive poster aspect ratios',
        'Mobile-first responsive drawer navigation tailored for handheld devices'
      ],
      challenges: 'Eliminating scroll stutter and memory footprint during high-velocity carousel swiping across multiple genre categories.',
      learnings: 'Mastered image lifecycle preloading, responsive DOM virtualization techniques, and clean React state synchronization.',
      image: '/src/assets/images/project_netflix_ott_1790581935036.jpg',
      githubUrl: 'https://github.com/kunal336552',
      liveDemoUrl: 'https://github.com/kunal336552',
      featured: true,
      order: 1,
      published: true,
      createdAt: '2024-08-10'
    },
    {
      id: 'proj-2',
      title: 'InkFlow | Headless Markdown Publishing & Content Platform',
      slug: 'inkflow-publishing-platform',
      category: 'fullstack',
      shortDescription: 'Full-stack distributed publishing engine featuring JWT auth, live markdown preview with syntax highlighting, nested comments, and Cloudinary media pipelines.',
      fullDescription: 'A production-grade publishing and article platform built on the MERN stack with Redux Toolkit. Features role-based access control, secure JWT cookie persistence, draft/publish lifecycle states, nested comment trees with atomic MongoDB updates, and Cloudinary image upload integration.',
      role: 'Full-Stack Software Engineer',
      problem: 'Modern technical writers require a distraction-free markdown environment with real-time formatting preview, zero third-party platform lock-in, and fast media uploads.',
      solution: 'Constructed an end-to-end MERN application with Redux Toolkit for unified global state, normalized MongoDB schemas with Mongoose compound indexes, and protected Express REST controllers.',
      technologies: ['React.js', 'Redux Toolkit', 'Node.js', 'Express.js', 'MongoDB', 'JWT Auth', 'Cloudinary CDN', 'Tailwind CSS'],
      features: [
        'Secure user registration and session management with JWT and hashed credentials',
        'Interactive markdown editor with live side-by-side rendering and syntax highlighting',
        'Cloudinary asset pipeline for automated image optimization and CDN delivery',
        'Nested commenting system with optimistic UI updates and instant feedback',
        'Comprehensive post status management (drafts, revisions, published articles)',
        'Indexed search queries with tag and category taxonomy filtering'
      ],
      challenges: 'Synchronizing editor state and image upload states while preventing unnecessary re-renders in nested comment components.',
      learnings: 'Implemented Redux Toolkit slice normalization, async thunks for API lifecycles, and relational Mongoose document population.',
      image: '/src/assets/images/project_blog_mern_1790581920732.jpg',
      githubUrl: 'https://github.com/kunal336552/Blog-Mern',
      liveDemoUrl: 'https://github.com/kunal336552/Blog-Mern',
      featured: true,
      order: 2,
      published: true,
      createdAt: '2024-06-15'
    },
    {
      id: 'proj-3',
      title: 'DevSphere | Real-Time Peer Collaboration & Developer Network',
      slug: 'devsphere-network',
      category: 'fullstack',
      shortDescription: 'Developer-centric networking ecosystem connecting engineers through tech-stack matching, connection state machines, and real-time profile exchanges.',
      fullDescription: 'A full-stack collaborative platform built specifically for software engineers. Developers curate verified technical stacks, discover peers through automated technology similarity matching, and manage bidirectional connection workflows with atomic MongoDB updates.',
      role: 'Full-Stack Architect',
      problem: 'Engineers lack targeted networking platforms to discover technical peers with complementary skill sets for hackathons, open-source projects, and code reviews.',
      solution: 'Engineered a specialized MERN platform featuring indexed MongoDB aggregation pipelines for peer recommendations, granular connection state transitions (Pending, Accepted, Rejected), and a responsive card-based UI.',
      technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'REST APIs', 'Tailwind CSS'],
      features: [
        'Granular bidirectional connection state machine (Send, Accept, Reject, Withdraw)',
        'Algorithmic tech-stack peer matching based on shared frameworks and tools',
        'Responsive profile feeds with categorized skill badges and GitHub links',
        'Protected Express route middleware with input sanitization and rate limiting',
        'Compound MongoDB indexes ensuring sub-30ms query latency on connection feeds',
        'Real-time UI feedback with optimistic state updates and error rollbacks'
      ],
      challenges: 'Preventing race conditions and duplicate connection requests during concurrent user interactions.',
      learnings: 'Mastered atomic MongoDB document updates with $addToSet and $pull, and designed resilient REST API error handling patterns.',
      image: '/src/assets/images/project_devmeetup_1790581948532.jpg',
      githubUrl: 'https://github.com/kunal336552',
      liveDemoUrl: 'https://github.com/kunal336552',
      featured: true,
      order: 3,
      published: true,
      createdAt: '2024-09-05'
    }
  ],
  skills: [
    // Frontend Mastery
    { id: 'sk-1', name: 'React 19 & Architecture', category: 'frontend', level: 'Mastery', icon: 'Atom', order: 1 },
    { id: 'sk-2', name: 'JavaScript (ES6+) & Modern Web', category: 'frontend', level: 'Proficient', icon: 'Code2', order: 2 },
    { id: 'sk-3', name: 'Tailwind CSS & Design Systems', category: 'frontend', level: 'Mastery', icon: 'Palette', order: 3 },
    { id: 'sk-4', name: 'Redux Toolkit & Zustand', category: 'frontend', level: 'Proficient', icon: 'Cpu', order: 4 },
    { id: 'sk-5', name: 'Core Web Vitals & Performance', category: 'frontend', level: 'Mastery', icon: 'Gauge', order: 5 },
    { id: 'sk-6', name: 'Responsive Layouts & Grid Systems', category: 'frontend', level: 'Mastery', icon: 'Layout', order: 6 },
    { id: 'sk-7', name: 'Accessible UI & Keyboard Navigation', category: 'frontend', level: 'Proficient', icon: 'Sparkles', order: 7 },

    // Backend & Systems
    { id: 'sk-8', name: 'Node.js & Event Loop', category: 'backend', level: 'Proficient', icon: 'Server', order: 8 },
    { id: 'sk-9', name: 'Express.js Server Framework', category: 'backend', level: 'Proficient', icon: 'Terminal', order: 9 },
    { id: 'sk-10', name: 'RESTful API Engineering', category: 'backend', level: 'Mastery', icon: 'Network', order: 10 },
    { id: 'sk-11', name: 'JWT Auth & Cookie Security', category: 'backend', level: 'Proficient', icon: 'ShieldCheck', order: 11 },
    { id: 'sk-12', name: 'Error Handling Middleware & Sanitization', category: 'backend', level: 'Proficient', icon: 'KeyRound', order: 12 },

    // Database & Media
    { id: 'sk-13', name: 'MongoDB Database', category: 'database', level: 'Proficient', icon: 'Database', order: 13 },
    { id: 'sk-14', name: 'Mongoose Schema Design & Indexes', category: 'database', level: 'Proficient', icon: 'Workflow', order: 14 },
    { id: 'sk-15', name: 'Cloudinary CDN Asset Pipelines', category: 'database', level: 'Proficient', icon: 'Layers', order: 15 },

    // Tooling & Engineering Discipline
    { id: 'sk-16', name: 'Git & Version Control Workflows', category: 'tools', level: 'Proficient', icon: 'GitBranch', order: 16 },
    { id: 'sk-17', name: 'Postman API Debugging & Docs', category: 'tools', level: 'Proficient', icon: 'Send', order: 17 },
    { id: 'sk-18', name: 'Vite & Modern Frontend Tooling', category: 'tools', level: 'Mastery', icon: 'Package', order: 18 },
    { id: 'sk-19', name: 'Cross-Browser Compatibility & QA', category: 'tools', level: 'Mastery', icon: 'Compass', order: 19 }
  ],
  experience: [
    {
      id: 'exp-1',
      company: 'Humanoid Maker',
      role: 'MERN Stack Developer',
      location: 'New Delhi, India',
      startDate: 'May 2024',
      endDate: 'Aug 2024',
      current: false,
      description: 'Engineered core features for a production-grade OTT video streaming web platform, delivering high-performance media browsing frontends, REST API integrations, and resilient user authentication.',
      responsibilities: [
        'Architected dynamic, responsive user interfaces for an OTT video streaming platform using React.js and modern CSS architecture.',
        'Engineered debounced REST API query integrations for live catalog title search, dynamic genre feeds, and video playback modals.',
        'Optimized client-side rendering and asset delivery for hundreds of high-resolution video thumbnails, ensuring 60fps smooth scrolling.',
        'Collaborated on secure user authentication workflows and session state persistence across application routes.',
        'Eliminated layout shift (CLS) and touch latency bottlenecks across mobile, tablet, and desktop viewports.'
      ],
      technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'JavaScript (ES6+)', 'Tailwind CSS', 'Git'],
      order: 1
    }
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'Indira Gandhi National Open University (IGNOU)',
      degree: 'Bachelor of Computer Applications (BCA)',
      field: 'Computer Science & Software Development',
      location: 'New Delhi, India',
      startDate: '2023',
      endDate: 'Present',
      grade: 'In Progress',
      description: 'Comprehensive undergraduate studies focusing on computer programming, database management systems, data structures, software engineering principles, and web application development.',
      order: 1
    }
  ],
  services: [
    {
      id: 'srv-1',
      title: 'High-Performance Frontend Systems',
      description: 'Pixel-perfect, responsive web frontends built with modern React, Tailwind CSS, and optimized for sub-second page loads and zero layout shift.',
      deliverables: [
        'Modular, maintainable component architecture',
        'Sub-100ms UI interactions & debounced search',
        'State management with Redux Toolkit or Zustand',
        '100% mobile-responsive design systems'
      ],
      icon: 'Layout',
      order: 1
    },
    {
      id: 'srv-2',
      title: 'Full-Stack MERN Architecture',
      description: 'End-to-end full-stack web applications connecting scalable Express and Node.js REST APIs with optimized MongoDB document stores.',
      deliverables: [
        'Clean REST API architecture with route validation',
        'JWT authentication with secure HTTP-only cookies',
        'Indexed MongoDB schemas with Mongoose ODM',
        'Production error handling and data sanitization'
      ],
      icon: 'Layers',
      order: 2
    },
    {
      id: 'srv-3',
      title: 'Streaming & Media Web Interfaces',
      description: 'Specialized media catalog interfaces featuring fluid carousels, responsive video players, and high-concurrency catalog discovery.',
      deliverables: [
        'Multi-shelf horizontal browsing carousels',
        'Video modal players with rich synopsis metadata',
        'Lazy-loaded media pipelines with placeholder blur',
        'Cross-platform touch and keyboard navigation'
      ],
      icon: 'Server',
      order: 3
    }
  ],
  testimonials: [
    {
      id: 'test-1',
      author: 'Technical Lead',
      role: 'Engineering Lead',
      company: 'Humanoid Maker',
      content: 'Kunal showed great enthusiasm, speed of delivery, and strong problem-solving skills while contributing to our OTT platform frontend and REST API integration. His understanding of MERN stack fundamentals is commendable.',
      rating: 5,
      order: 1
    },
    {
      id: 'test-2',
      author: 'Senior Peer Developer',
      role: 'Full-Stack Collaborator',
      company: 'Open Source Community',
      content: 'Working with Kunal on MERN projects has been great. He writes clean, structured code, takes database schema design seriously, and always focuses on delivering a smooth user experience.',
      rating: 5,
      order: 2
    }
  ],
  socialLinks: [
    { id: 'soc-1', platform: 'GitHub', url: 'https://github.com/kunal336552', label: 'github.com/kunal336552', order: 1 },
    { id: 'soc-2', platform: 'LinkedIn', url: 'https://linkedin.com/in/kunal-shrivastav', label: 'linkedin.com/in/kunal-shrivastav', order: 2 },
    { id: 'soc-3', platform: 'Email', url: 'mailto:kunal336552@gmail.com', label: 'kunal336552@gmail.com', order: 3 }
  ],
  theme: {
    primaryAccent: '#10b981', // Glassy Emerald / Mint Green
    accentName: 'Glassy Emerald',
    borderRadius: 'rounded-xl',
    sectionVisibility: {
      about: true,
      skills: true,
      experience: true,
      education: true,
      projects: true,
      services: true,
      testimonials: true,
      contact: true
    }
  },
  seo: {
    siteTitle: 'Kunal Shrivastav | World-Class Frontend & Full-Stack Engineer',
    metaDescription: 'Portfolio of Kunal Shrivastav, high-performance Frontend & MERN Stack Engineer. Featuring production streaming applications, reactive architectures, and pixel-perfect design systems.',
    ogImage: '/src/assets/images/project_netflix_ott_1790581935036.jpg',
    keywords: 'Kunal Shrivastav, Frontend Engineer, Full-Stack Developer, MERN Stack, React 19, Node.js, Express, MongoDB, Portfolio, New Delhi'
  }
};
