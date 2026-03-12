# SOFOL IT | The Technical Powerhouse for Founders

Sofol IT is an elite software engineering agency focused on transforming visionary concepts into market-dominating digital assets. Built for early-stage and solo founders, this platform serves as the ultimate "Control Tower" for our agency operations, lead generation, and content strategy.

## 🚀 Key Features

### 🏛️ Advanced Architecture & Settings
- **Dynamic Site Configurations**: A fully database-backed settings system to control SEO metadata, maintenance mode, and third-party integrations (e.g., Calendly) without touching code.
- **Enterprise-Grade SEO**: Pre-configured dynamic OpenGraph and Twitter cards, semantic HTML, and dynamic sitemaps tailored for high-ticket client hunting.

### 📝 CMS & Content Engineering
- **WordPress-Style Taxonomy**: Hierarchical category support with parent-child relationships and dynamic tagging.
- **Markdown Blog Builder**: An enterprise-grade editor with real-time local previews, automated slug generation (with manual overrides), and synchronized Cloudinary media uploads.
- **Atomic Persistence**: Robust Next.js Server Actions ensuring data integrity between our Neon Serverless Postgres DB and Cloudinary edge storage.

### 🧠 Strategic AI Integration
- **Project Ideator**: A Genkit-powered AI agent that estimates complexity, roadmaps, and tech stacks based on a founder's raw concept.
- **Vision-to-Value Mapping**: Bridges the gap between a founder's imagination and technical reality.

### 💼 Admin & Operations
- **Dark/Light Mode Optimized UI**: A stunning, responsive Admin dashboard featuring glassmorphism and animated components that adapt perfectly to any device size.
- **Secure Dashboard**: Monitor traffic, review inbound leads, and manage global settings.
- **Lead Management**: Database-persisted inquiry system tracking high-value client engagements.

## 🛠️ Tech Stack

- **Frontend**: [Next.js 15 (App Router)](https://nextjs.org/) - React 19, TypeScript
- **UI Framework**: [Shadcn UI](https://ui.shadcn.com/) + [Tailwind CSS](https://tailwindcss.com/) - Custom HSL theme with mesh gradients
- **Backend/ORM**: [Drizzle ORM](https://orm.drizzle.team/) with [Neon Database](https://neon.tech/) (Serverless PostgreSQL)
- **Media Management**: [Cloudinary](https://cloudinary.com/) - Automated asset optimization and global CDN delivery
- **Icons**: [Lucide React](https://lucide.dev/)

## 🛠️ Getting Started

### 1. Prerequisites
- Node.js 20.x or later
- A Neon Database instance
- A Cloudinary account limit

### 2. Environment Setup
Create a `.env` file in the root directory and configure the following variables:

```bash
# Database (Neon)
DATABASE_URL="postgres://user:password@endpoint.aws.neon.tech/neondb?sslmode=require"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

```

### 3. Installation
```bash
npm install
```

### 4. Database Sync
```bash
npm run db:push
```

### 5. Development
```bash
npm run dev
```

## 📂 Project Structure

- `src/app/admin`: Secure administrative portal, settings, and CMS tools.
- `src/app/blog`: Public-facing journal and dynamic article rendering.
- `src/app/projects`: Deep-dive, metric-driven portfolio case studies.
- `src/components/sections`: Reusable, high-fidelity UI sections (Hero, Services, Portfolio, Contact, etc.).
- `src/lib/actions`: Server-side logic for DB, Cloudinary, and Settings mutations.
- `src/lib/db`: Schema definitions and Drizzle configuration.

## 📄 License

Proprietary © 2024-2026 Sofol IT. All rights reserved. Built for visionaries by engineers.
