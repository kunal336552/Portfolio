# Kunal Shrivastav — Full-Stack / MERN Developer Portfolio & CMS

A production-grade, highly creative personal developer portfolio and content management system (CMS) engineered with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js).

Designed with intentional typography, editorial discipline, authentic technical representation, and a full-featured Admin CMS for browser-based updates without modifying source code.

---

## 🛠️ The Tech Stack

### Frontend
- **React.js (v19)** — Functional component architecture, custom hooks, and context state
- **Tailwind CSS** — Utility-first, responsive design with custom dark theme tokens
- **Lucide Icons** — Lightweight, accessible iconography
- **Typography** — Syne (Headings), Plus Jakarta Sans (Body), JetBrains Mono (Code & Data)

### Backend
- **Node.js & Express.js** — Modular REST API architecture with structured error handling
- **JWT (JSON Web Tokens)** — Stateless, secure admin session authentication
- **Bcrypt.js** — Salted password hashing for credentials protection
- **CORS & Body Parser** — Configured for modern web requests

### Database & Persistence
- **MongoDB & Mongoose ODM** — Schemas for Admin, Projects, Skills, Experience, Education, Services, and Inbound Messages
- **Dual-Storage Engine** — Connects directly to external MongoDB Atlas via `MONGODB_URI`, with an automatic fallback persistent JSON file store (`data/portfolio-db.json`) for seamless zero-config operation out-of-the-box

---

## 🚀 Key Features

1. **Top Bar Contract Navigation** — Single wordmark brand zone, 5 clean text navigation links, and primary contact actions.
2. **Split-Screen Editorial Hero** — Bold typography, dynamic availability badge, and live interactive architecture blueprint tabs (MERN, Express/Mongo, Auth).
3. **Selected Works & Deep Case Studies** — Bento project cards with category filters, GitHub links, live demo links, and modal case study viewer (Problem, Solution, Role, Technical Features, Challenges, and Takeaways).
4. **Honest Skills & Experience Representation** — Categorized technical stack (Frontend, Backend, Database, Tools, Currently Learning) with explicit separation between production expertise and active study areas.
5. **Humanoid Maker OTT Work Showcase** — Honest breakdown of 3-month production MERN experience developing an OTT video-streaming platform.
6. **Academic Background** — Bachelor of Computer Applications (BCA) at Indira Gandhi National Open University (IGNOU).
7. **Working Contact Inbound Pipeline** — Real-time contact form with field validation and anti-spam protection that saves messages directly to the database.
8. **Comprehensive Admin CMS Dashboard**:
   - Protected by email & password with JWT session verification
   - **Projects**: Add, edit, delete, mark featured, toggle published/draft
   - **Skills**: Add, edit, and categorize technologies
   - **Profile & Bio**: Edit hero headline, bio, location, email, and social links
   - **Experience & Education**: Timeline items management
   - **Inbound Messages**: Read, mark as read/unread, delete, and email replies
   - **Theme Customizer**: Switch primary accent colors (Amber Gold, Electric Cobalt, Emerald, etc.) and toggle section visibility
   - **SEO Settings**: Customize browser title, meta description, and keywords
   - **Factory Reset**: Restore initial verified seed data with one click

---

## 📂 Project Structure

```text
├── data/                       # Local persistent JSON database storage
│   └── portfolio-db.json
├── server/                     # Full-stack backend application
│   ├── db/
│   │   ├── models.ts           # Mongoose schemas and data types
│   │   ├── seed.ts             # Initial verified seed data
│   │   └── storage.ts          # Dual-engine MongoDB & local storage manager
│   └── routes/
│       ├── auth.ts             # JWT authentication and password endpoints
│       ├── public.ts           # Public REST endpoints (/api/portfolio, /api/messages)
│       └── admin.ts            # Protected CMS CRUD endpoints (/api/admin/*)
├── src/                        # React frontend application
│   ├── assets/                 # Generated high-fidelity visual assets
│   ├── components/
│   │   ├── Navbar.tsx          # 3-Zone Top Bar
│   │   ├── Hero.tsx            # Split-screen editorial hero
│   │   ├── About.tsx           # Bio, academic and professional facts
│   │   ├── SkillsSection.tsx   # Searchable & filterable tech stack
│   │   ├── ExperienceSection.tsx # Timeline for Humanoid Maker & IGNOU BCA
│   │   ├── ProjectsSection.tsx # Bento project grid
│   │   ├── ProjectCaseStudyModal.tsx # Full case study modal
│   │   ├── ServicesSection.tsx # Engineering offerings
│   │   ├── ProcessSection.tsx  # 4-Step MERN development workflow
│   │   ├── ContactSection.tsx  # Inbound message form
│   │   ├── Footer.tsx          # Editorial footer
│   │   └── admin/
│   │       ├── AdminLoginModal.tsx      # Admin authentication modal
│   │       └── AdminDashboardModal.tsx  # Full CMS dashboard
│   ├── context/
│   │   └── PortfolioContext.tsx# Centralized state provider
│   ├── services/
│   │   └── api.ts              # Fetch client for all REST endpoints
│   ├── types/
│   │   └── portfolio.ts        # TypeScript data interfaces
│   ├── App.tsx                 # Root application component
│   ├── index.css               # Tailwind & theme variables
│   └── main.tsx                # Client DOM entry point
├── server.ts                   # Express & Vite unified development server
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## ⚙️ Installation & Setup

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/kunal336552/portfolio-mern.git
cd portfolio-mern
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

To connect to MongoDB Atlas, add your connection string:
```env
MONGODB_URI="mongodb+srv://<username>:<password>@cluster.mongodb.net/kunal_portfolio?retryWrites=true&w=majority"
JWT_SECRET="your-super-secret-jwt-key"
```
*(If `MONGODB_URI` is omitted, the application automatically uses the persistent local JSON engine in `data/portfolio-db.json` without any setup).*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Admin CMS Access

- Press `Ctrl + Shift + A` (or `Cmd + Shift + A`) anywhere on the website, or click the **Lock** icon in the navbar / footer.
- **Default Email**: `kunal336552@gmail.com`
- **Default Password**: `kunal123`
*(You can click "Auto-Fill Credentials" on the login modal for quick testing, and update credentials under System & Security).*

---

## 🚢 Deployment

### Monolith / Full-Stack (Render, Railway, or Google Cloud Run)
1. Build the frontend: `npm run build`
2. Start server: `npm start` (runs `tsx server.ts`)
3. Provide environment variables: `PORT=3000`, `MONGODB_URI`, `JWT_SECRET`.

---

## 👤 Author

**Kunal Shrivastav**  
Full-Stack / MERN Stack Developer  
New Delhi, India  
- GitHub: [kunal336552](https://github.com/kunal336552)  
- Email: [kunal336552@gmail.com](mailto:kunal336552@gmail.com)
