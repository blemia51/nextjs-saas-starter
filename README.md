# Next.js SaaS Starter

![GitHub stars](https://img.shields.io/github/stars/blemia51/nextjs-saas-starter?style=social)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/git)
![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)

> A **production‑ready** starter to launch a SaaS product in hours ⏱️ instead of weeks. 100% TypeScript, full‑stack Next.js (App Router).

<p align="center">
  <img src="docs/demo-dashboard.png" alt="Dashboard demo screenshot" width="800"/>
</p>

---

## ✨ Key Features

- **Comprehensive Auth**: GitHub OAuth · Google OAuth · Email Magic Link (SendGrid)
- **Admin Panel**: List users, promote/demote roles **USER ↔ ADMIN**
- **Responsive Dashboard**: Sidebar + Topbar with light/dark logos
- **Email Templates**: HTML emails built with `@react-email` (+ Cloudinary-hosted logos)
- **Stripe Ready**: Monthly plans + webhooks (stub provided)
- **Prisma ORM** + PostgreSQL (User, Account, Session models)
- **Tailwind CSS** + Built‑in Dark Mode toggle
- **Observability**: Plausible Analytics, Sentry error monitoring
- **Vercel‑Optimized**: Deploy on Vercel (also works on Railway, Render…)

---

## 🚀 Quick Start

```bash
# 1 · Clone
git clone https://github.com/blemia51/nextjs-saas-starter.git
cd nextjs-saas-starter

# 2 · Install dependencies
npm install

# 3 · Configure environment variables
cp .env.example .env.local
# → fill in GITHUB_ID, DATABASE_URL, SENDGRID_API_KEY, etc.

# 4 · Initialize database
npx prisma migrate dev --name init

# 5 · Start development server
npm run dev
```

> Visit <http://localhost:3000> → sign in with GitHub, Google, Magic Link, or Credentials.

---

## 🔧 Configuration (`.env.example`)

```dotenv
# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/saas_starterdb?schema=public"

# NextAuth & OAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=$(openssl rand -base64 32)
GITHUB_ID=...
GITHUB_SECRET=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
DISCORD_CLIENT_ID=...
DISCORD_CLIENT_SECRET=...

# Email / SendGrid
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxx
EMAIL_FROM="SaaS Starter <noreply@yourdomain.com>"
EMAIL_SERVER=smtp://apikey:${SENDGRID_API_KEY}@smtp.sendgrid.net:587

# Stripe (optional)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

| Environment Variable    | Description                                   |
|-------------------------|-----------------------------------------------|
| `DATABASE_URL`          | PostgreSQL connection string                  |
| `NEXTAUTH_URL`          | Base URL (e.g. http://localhost:3000)         |
| `NEXTAUTH_SECRET`       | JWT secret (use `openssl rand -base64 32`)    |
| `GITHUB_ID/SECRET`      | GitHub OAuth credentials                      |
| `GOOGLE_CLIENT_ID/SEC`  | Google OAuth credentials                      |
| `DISCORD_CLIENT_ID/...` | Discord OAuth credentials                     |
| `SENDGRID_API_KEY`      | SendGrid API key                              |
| `EMAIL_FROM`            | Verified sender email                         |
| `EMAIL_SERVER`          | SMTP URL for SendGrid                         |
| `STRIPE_SECRET_KEY`     | Stripe secret key (optional)                  |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret (optional)              |

---

## 🗂️ Project Structure

```plaintext
src/
 ├ app/                # App Router: pages & API routes
 │ ├ dashboard/        # User dashboard
 │ ├ admin/            # Admin panel (role management)
 │ └ api/              # Next.js API routes (auth, signup, webhooks)
 ├ components/         # Reusable UI components
 ├ emails/             # `@react-email` templates
 ├ lib/                # Helpers (Prisma client, password utils, notifications)
 ├ generated/          # Prisma Client (if configured)
 └ prisma/             # Prisma schema & migrations
```

---

## ➕ Roadmap

- [ ] Integrate **Stripe Checkout & Customer Portal**
- [ ] Add **Storybook** for component development
- [ ] Implement **End‑to‑End tests** (Playwright) + **CI via GitHub Actions**
- [ ] Provide **Docker** setup & deployment guide

---

## 🤝 Contributing

1. **Fork** the repo → create branch `feature/xyz`
2. Run `npm run lint && npm run test`
3. Open a Pull Request for review

---

## 📜 License

MIT © Hervé Bourelle – Have fun and build fast 🚀

