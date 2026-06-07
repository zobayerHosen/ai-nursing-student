<div align="center">
  <img src="/assets/logo.png" alt="STEMRN Logo" width="400" />
  <br /><br />
  <h1>STEMRN — AI-Powered NCLEX-RN Prep Platform</h1>
  <p><strong>Pass the NCLEX on your first attempt. Guaranteed.</strong></p>
  <p>
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#project-structure">Project Structure</a> •
    <a href="#purpose">Purpose</a>
  </p>
</div>

---

## 🧠 What is STEMRN?

**STEMRN** is an all-in-one, AI-powered NCLEX-RN preparation platform built **by a nurse, for nursing students**. It combines a massive question bank, AI-driven clinical tools, adaptive flashcards, visual study notes, and **CARA** — your personal Clinical Adaptive Response Assistant — into one intelligent platform designed to help you pass the NCLEX on your first attempt.

The name **STEMRN** combines **STEM** (Science, Technology, Engineering, Mathematics) + **RN** (Registered Nurse), while also symbolizing *stem cells* — the foundational building blocks of nursing knowledge.

---

## ✨ Why Was STEMRN Created? <a id="purpose"></a>

STEMRN was founded by **Captain Tonny P**, a Public Health Nurse and US Army Captain who understood a critical truth about the NCLEX:

> *"NCLEX questions don't reward memorization — they reward pattern recognition under pressure."*

Traditional NCLEX prep tools are fragmented — one app for flashcards, another for questions, another for lectures. Students waste time jumping between tools instead of building the clinical reasoning muscle the exam actually tests.

**STEMRN solves this by layering everything you need — the term, the picture, the comparison — into one spot, so you stop tab-hopping and start connecting.**

---

## 🚀 Key Features <a id="features"></a>

### 🤖 CARA — Clinical Adaptive Response Assistant
Your 24/7 AI tutor that explains the *why* behind every answer, drills your weak spots, and breaks down NGN cases step-by-step.

### 📚 Massive Q&A Bank
**12,000+ exam-standard NCLEX-style questions** with detailed explanations for every option — not just "A is correct."

### 🃏 Adaptive Flashcards
**5,000+ verified flashcards** with spaced repetition so you actually remember what you review.

### 🛠️ 12 AI-Powered Clinical Tools
| Tool | Description |
|------|-------------|
| **My Tutor (CARA)** | Ask anything about nursing — pharmacology, pathophysiology, clinical reasoning |
| **Lecture Notes** | Upload lectures and get AI-generated organized study notes |
| **Notes → Flashcards** | Turn class notes into ready-to-study flashcard decks |
| **Notes → Quiz** | Generate NCLEX-style practice quizzes from your own notes |
| **Research Paper** | Evidence-based nursing research help with real citations |
| **Assignment Checker** | Review work for grammar, structure, and clinical accuracy |
| **Care Plan Builder** | Build NANDA-formatted care plans in minutes |
| **Drug Cards** | Complete drug cards for any medication |
| **Charting Coach** | Master SOAP, SBAR, and DAR charting with AI feedback |
| **Labs Interpretation** | Instant clinical interpretation of any lab value |
| **Concept Map** | Visualize diseases, symptoms, treatments, and complications |
| **Practical Skills** | Step-by-step clinical procedure guides |

### 🎨 Visual Notes (Stem Toons)
Cartoon-style visual notes that make complex nursing concepts stick — perfect for visual learners.

### 📖 Core Learning Modules
- **Body Systems** — Complete coverage across all specialties
- **Study Notes** — Curated nursing content
- **ECG Mastery** — Learn to read EKGs confidently
- **Dosage Calculation** — Master medication math
- **Diagnostic Tests & Labs** — Understand what tests mean
- **Nursing Assessments** — Systematic assessment guides
- **Cheat Sheets** — Quick-reference high-yield content

### 📊 Progress Tracking
CARA builds your personalized study plan, tracks your weak spots, and adjusts daily.

### 📝 NGN-Ready
Full support for Next Generation NCLEX question formats including bowtie, matrix, cloze, and extended multiple response.

---

## 🛠️ Tech Stack <a id="tech-stack"></a>

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with App Router, SSR, and API routes |
| **React 19** | UI component library |
| **Tailwind CSS 4** | Utility-first CSS framework for rapid styling |
| **Ant Design 6** | Enterprise-grade UI component library |
| **TanStack React Query 5** | Server state management, caching, and data fetching |
| **Axios** | HTTP client for API communication |
| **React Hook Form** | Performant form handling and validation |
| **Framer Motion** | Declarative animations and transitions |
| **react-hot-toast** | Toast notifications |
| **Google OAuth** | Social authentication via `@react-oauth/google` |
| **js-cookie** | Browser cookie management |
| **clsx / tailwind-merge** | Conditional class name utilities |
| **lucide-react** | Lightweight icon library |
| **react-icons** | Popular icon packs |
| **Swiper** | Touch-enabled carousels and sliders |
| **ESLint** | Code linting and quality enforcement |

---

## 🏗️ Project Structure <a id="project-structure"></a>

```
stemrn/
├── actions/               # Server actions (Next.js)
│   └── auth/              # Authentication actions
├── app/                   # Next.js App Router
│   ├── (root)/            # Landing/home page
│   │   └── components/    # Home page components
│   ├── auth/              # Authentication pages
│   │   ├── components/    # Auth UI components
│   │   └── hooks/         # Auth-form-specific hooks
│   ├── dashboard/         # Protected dashboard routes
│   │   ├── components/    # Dashboard UI components
│   │   └── */*/           # Feature pages & components
│   ├── layout.js          # Root layout
│   └── globals.css        # Global styles
├── components/            # Shared UI components
├── constants/             # App constants & route names
├── data/                  # Static/dummy data
├── dummydata/             # Development dummy data
├── hooks/                 # Custom React hooks
│   ├── auth/              # Authentication hooks
│   ├── subscription-plan/ # Subscription hooks
│   └── user/              # User management hooks
├── lib/                   # Library configurations
│   ├── axios.public.js    # Public API client
│   ├── axios.private.*.js # Private API clients
├── providers/             # React context providers
├── public/assets/         # Static assets & images
├── services/              # API service functions
│   ├── auth/              # Auth API services
│   ├── subscription-plan/ # Subscription API services
│   ├── user/              # User API services
│   └── cms/               # CMS API services
├── utils/                 # Utility functions
├── proxy.js               # Middleware (auth guard)
├── package.json
└── next.config.mjs
```

---

## 🚦 Getting Started <a id="getting-started"></a>

### Prerequisites
- Node.js (v18+)
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd stemrn

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Authentication
NEXT_PUBLIC_AUTH_TOKEN_NAME=stemrn_auth
NEXT_PUBLIC_API_URL=<your-api-url>

# Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=<your-google-client-id>

# (Add other env vars as needed)
```

### Development

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build & Production

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

---

## 📄 License

This project is proprietary and confidential.

---

## 📬 Contact

- **Email:** hello@stemrn.com
- **Instagram:** [@stemrn_nclex](https://instagram.com/stemrn_nclex)

---

<div align="center">
  <p>Built with ❤️ by Zobayer Hosen, for nurses.</p>
</div>
