# Brew & Bloom — Café Website + Admin Dashboard

A full-stack café website (React/Vite + Tailwind) with a secure admin
dashboard, built on Node.js/Express, MongoDB, and Cloudinary.

## Project structure

```
cafe-project/
├── backend/     Express API (MongoDB + Cloudinary + JWT auth)
└── frontend/    React (Vite) — public site + /admin dashboard
```

## 1. Prerequisites

- Node.js 18+
- A MongoDB database — either local (`mongodb://localhost:27017/cafe_db`)
  or free-tier [MongoDB Atlas](https://www.mongodb.com/atlas)
- A free [Cloudinary](https://cloudinary.com) account (for image uploads)

## 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Open `.env` and fill in:
- `MONGO_URI` — your MongoDB connection string
- `JWT_SECRET` — any long random string
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
  — from your Cloudinary dashboard
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — the login you'll use for the first
  admin account

Create the admin account and default settings document:

```bash
npm run seed
```

Start the API:

```bash
npm run dev        # http://localhost:5000
```

## 3. Frontend setup

In a second terminal:

```bash
cd frontend
npm install
npm run dev         # http://localhost:5173
```

The Vite dev server proxies `/api` requests to `http://localhost:5000`
(see `vite.config.js`), so no extra config is needed locally.

## 4. Using the admin dashboard

Go to `http://localhost:5173/admin/login` and sign in with the
`ADMIN_EMAIL` / `ADMIN_PASSWORD` you set in `.env`. From there you can:

- Change the logo, hero image, website name, and tagline
- Add/edit/delete menu items (with images + prices) across all categories
- Upload gallery images
- Manage reservations (confirm/cancel/delete) and view analytics
- Manage testimonials and contact messages
- Update contact details, social links, and theme colors — these apply
  to the live site immediately, no redeploy needed

## 5. Production deployment notes

- **Backend**: deploy to Render/Railway/Fly.io/EC2 etc. Set the same env
  vars as `.env`, plus `NODE_ENV=production` and `CLIENT_URL` set to your
  deployed frontend's URL (for CORS).
- **Frontend**: `npm run build` produces a static `dist/` folder —
  deploy to Vercel/Netlify/Cloudflare Pages. Set `VITE_API_URL` to your
  deployed backend's `/api` URL as a build-time env var.
- Consider adding rate limiting (`express-rate-limit`) on the public
  `/api/reservations` and `/api/contact` endpoints before going live.

## 6. What's included

**Public site**: Home (hero, featured menu, testimonials, Instagram-style
grid, map), About, Menu (search + category filter), Gallery (lightbox),
Reservation (validated form → MongoDB), Contact (form + map + socials).
Dark/light mode, responsive layout, scroll-aware navbar, Framer Motion
animations, SEO meta tags.

**Admin dashboard**: JWT-protected `/admin`, analytics overview, full
CRUD for menu items/gallery/testimonials/reservations/messages, and a
site-settings panel (branding, images, contact info, social links,
theme colors) — all backed by a single editable `Settings` document so
the whole site is configurable without code changes.
# Cafe
# Cafe
