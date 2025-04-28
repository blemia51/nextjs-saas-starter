# Next.js SaaS Starter

![repo stars](https://img.shields.io/github/stars/blemia51/nextjs-saas-starter?style=social)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/git)
![MIT licence](https://img.shields.io/badge/licence-MIT-blue.svg)

> Un starter **production‑ready** pour lancer un produit SaaS en quelques heures ⏱️ plutôt qu’en plusieurs semaines. 100 % TypeScript, full‑stack Next.js (App Router).

<p align="center">
  <img src="docs/demo-dashboard.png" alt="Demo screenshot" width="800"/>
</p>

---

## ✨ Fonctionnalités majeures

- **Auth complète** : GitHub OAuth · Google OAuth · Email Magic Link (SendGrid)
- **Admin panel** : liste des users, promote / demote rôle **USER ↔ ADMIN**
- **Dashboard** responsive + Sidebar + Topbar avec logo dark/light
- **Email HTML** généré via `@react-email` (+ logo Cloudinary)
- **Stripe ready** : plans mensuels avec webhooks (fichier stub fourni)
- **Prisma ORM** + PostgreSQL, models User / Account / Subscription
- **Tailwind CSS** + Dark Mode toggle natif
- Config tournée vers **Vercel** mais agnostique (Railway, Render…)

---

## 🚀 Installation rapide

```bash
# 1 · Clone
git clone https://github.com/blemia51/nextjs-saas-starter.git
cd nextjs-saas-starter

# 2 · Dépendances
npm install

# 3 · Variables d'env
cp .env.example .env.local
#  → complète GITHUB_ID, DATABASE_URL, etc.

# 4 · Base de données
npx prisma migrate dev --name init

# 5 · Lance le mode dev
npm run dev
```

> Ouvre <http://localhost:3000> ➜ registre‑toi avec GitHub ou reçois un Magic Link 💌

---

## 🔧 Configuration (extrait .env)

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Chaîne PostgreSQL complète |
| `NEXTAUTH_SECRET` | Secret JWT (openssl rand -base64 32) |
| `GITHUB_ID / GITHUB_SECRET` | OAuth GitHub |
| `GOOGLE_CLIENT_ID / SECRET` | OAuth Google |
| `EMAIL_SERVER` | SMTP SendGrid (ou autre) |
| `EMAIL_FROM` | **noreply@tondomaine.com** |
| `STRIPE_SECRET_KEY` | Clé privée Stripe |
| `STRIPE_WEBHOOK_SECRET` | Secret webhook Stripe |

---

## 🗂️ Arborescence

```
src/
 ├ app/                # App Router routes
 │ ├ dashboard/
 │ ├ admin/
 │ └ api/
 ├ components/         # UI réutilisable
 ├ emails/             # Templates "react-email"
 ├ lib/                # Prisma / helpers
 ├ generated/          # Prisma Client
 └ prisma/schema.prisma
```

---

## ➕ Roadmap courte

- [ ] Intégration Stripe Checkout + Customer Portal
- [ ] Storybook pour isoler les composants
- [ ] Tests Playwright + CI GitHub Actions
- [ ] Exemple déploiement Docker

> Contributions, issues et PR bienvenues 🙏

---

## 🤝 Contribuer

1. **Fork** → `git clone` → crée une branche `feature/xyz`.
2. `npm run lint && npm run test` avant PR.
3. Ouvre la Pull Request.

---

## 📜 Licence

MIT © Hervé Bourelle – Have fun & build fast 🚀

