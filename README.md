
# SOFOL IT | Enterprise-Grade Founder's Platform

A premium, high-fidelity digital ecosystem designed for solo founders and startups. This platform combines a powerful WordPress-style CMS, strategic AI tools, and high-performance engineering to transform visionary concepts into market-ready products.

## 🚀 Key Features

### 🏛️ Advanced Content Management (CMS)
- **WordPress-Style Taxonomy**: Hierarchical category support with parent-child relationships (Subcategories).
- **Dynamic Tagging System**: Flexible metadata management for SEO and content organization.
- **Enterprise Editor**: A Markdown-ready blog builder with real-time local previews and synchronized Cloudinary media uploads.
- **Atomic Persistence**: Integrated server actions ensuring data integrity between Neon DB and Cloudinary storage.

### 🧠 Strategic AI Integration
- **Project Ideator**: A Genkit-powered AI agent that outlines project roadmaps, tech stacks, and complexity estimations based on founder input.
- **Vision-to-Value Mapping**: Automated insights designed to bridge the gap between imagination and technical reality.

### 💼 Admin & Operations
- **Secure Dashboard**: Real-time monitoring of traffic performance and recent lead inquiries.
- **Lead Management**: Robust inquiry system with database persistence and administrative overview.
- **Taxonomy Manager**: Centralized interface for managing categories and global SEO meta-data.

## 🛠️ Tech Stack

- **Frontend**: [Next.js 15 (App Router)](https://nextjs.org/) - React 19, TypeScript.
- **UI Framework**: [Shadcn UI](https://ui.shadcn.com/) + [Tailwind CSS](https://tailwindcss.com/) - Custom HSL theme with mesh gradients and glassmorphism.
- **Backend/ORM**: [Drizzle ORM](https://orm.drizzle.team/) with [Neon Database](https://neon.tech/) (Serverless PostgreSQL).
- **Generative AI**: [Firebase Genkit](https://firebase.google.com/docs/genkit) - Enterprise AI orchestration.
- **Media Management**: [Cloudinary](https://cloudinary.com/) - Automated asset optimization and global CDN delivery.
- **Icons**: [Lucide React](https://lucide.dev/).

## 🛠️ Getting Started

### 1. Prerequisites
- Node.js 20.x or later.
- A Neon Database instance.
- A Cloudinary account.

### 2. Environment Setup
Create a `.env` file in the root directory and configure the following variables:

```bash
# Database (Neon)
DATABASE_URL="postgres://user:password@endpoint.aws.neon.tech/neondb?sslmode=require"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# GenAI (Google AI)
GOOGLE_GENAI_API_KEY="your_api_key"
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

- `src/app/admin`: Secure administrative portal and CMS tools.
- `src/app/blog`: Public-facing journal and dynamic article rendering.
- `src/ai`: Genkit flows and AI agent definitions.
- `src/components/sections`: Reusable, high-fidelity UI sections (Hero, Services, Portfolio, etc.).
- `src/lib/actions`: Server-side logic for DB, Cloudinary, and revalidation.
- `src/lib/db`: Schema definitions and Drizzle configuration.

## 📄 License

Proprietary © 2024 Sofol IT. All rights reserved. Built for visionaries by entrepreneurs.
