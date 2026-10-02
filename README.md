# ELARIS — Digital Invitations Website & Platform

> **"Ձեր կարևոր պահերը՝ մեկ գեղեցիկ հղումով"**
> *"Ваши важные моменты — в одной красивой ссылке"*
> *"Your special moments in one beautiful link"*

ELARIS is a modern, luxury multilingual web platform for digital event invitations (weddings, engagements, birthdays, baptisms, baby events, corporate galas, anniversaries, and private celebrations).

Built with **React**, **Vite**, **Tailwind CSS**, and **Express.js**, featuring complete Armenian (default), Russian, and English localization, data-driven catalogs, and an extensible architecture.

---

## 📁 Project Structure

```
elaris-website/
├── frontend/
│   ├── public/
│   │   ├── favicon.svg              # Brand vector favicon with sparkle icon
│   │   ├── logo-source.png          # High-resolution original logo asset
│   │   └── images/
│   │       ├── invitations/         # Invitation visuals
│   │       └── occasions/           # Occasion banners
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Header.jsx       # Responsive navbar with ELARIS logo & CTA
│   │   │   │   ├── Footer.jsx       # Brand footer, navigation & social links
│   │   │   │   ├── LanguageSwitcher.jsx # Desktop (Հայերեն | Русский | English) & Mobile
│   │   │   │   └── MobileNav.jsx    # Smooth mobile navigation drawer
│   │   │   ├── sections/
│   │   │   │   ├── HeroSection.jsx  # Hero concept & interactive invitation phone mockup
│   │   │   │   ├── OccasionsSection.jsx # 8 data-driven occasion cards
│   │   │   │   ├── CatalogSection.jsx # Filterable & searchable invitation catalog
│   │   │   │   ├── HowItWorksSection.jsx # 5-step process walkthrough
│   │   │   │   ├── FeaturesSection.jsx # 10 interactive invitation features
│   │   │   │   ├── PricingSection.jsx # START, ELEGANT, and SIGNATURE packages
│   │   │   │   ├── OrderSection.jsx # Order form connected to backend API
│   │   │   │   ├── FaqSection.jsx   # Accordion with 9 translated questions & answers
│   │   │   │   └── ContactSection.jsx # Contact details & quick inquiry form
│   │   │   └── ui/
│   │   │       ├── Logo.jsx         # ELARIS logo with strictly "Digital Invitations" subtitle
│   │   │       ├── Button.jsx       # Reusable button styles
│   │   │       ├── InvitationCard.jsx # Reusable invitation card with "View" and "Order"
│   │   │       ├── OccasionCard.jsx # Occasion highlight card
│   │   │       ├── PricingCard.jsx  # Package tier card
│   │   │       └── Accordion.jsx    # Accessible FAQ accordion
│   │   ├── contexts/
│   │   │   └── LanguageContext.jsx  # Multilingual state & localStorage persistence
│   │   ├── data/
│   │   │   ├── invitations.js       # Data-driven catalog (add new designs here!)
│   │   │   ├── occasions.js         # Celebration categories
│   │   │   ├── pricing.js           # 3 packages with AMD pricing
│   │   │   ├── features.js          # Digital features list
│   │   │   └── contactConfig.js     # Configurable contact numbers, email, and Instagram
│   │   ├── locales/
│   │   │   ├── hy.json              # Armenian (Default) translations
│   │   │   ├── ru.json              # Russian translations
│   │   │   └── en.json              # English translations
│   │   ├── hooks/
│   │   │   └── useTranslation.js    # Quick translation hook
│   │   ├── services/
│   │   │   └── api.js               # Backend REST API connector
│   │   ├── App.jsx                  # Main page assembler
│   │   ├── index.css                # Tailwind directives & Armenian typography
│   │   └── main.jsx                 # React root
│   ├── index.html                   # SEO tags, Armenian & multilingual Google Fonts
│   ├── tailwind.config.js           # ELARIS color palette & animations
│   ├── vite.config.js               # Vite config with API proxy
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                # Plug-and-play DB (file persistence + MongoDB ready)
│   │   ├── controllers/
│   │   │   ├── invitationController.js # GET /api/invitations, GET /api/invitations/:id
│   │   │   ├── orderController.js      # POST /api/orders, GET /api/orders
│   │   │   └── contactController.js    # POST /api/contact
│   │   ├── middleware/
│   │   │   └── errorHandler.js      # Central HTTP error handling
│   │   ├── models/
│   │   │   ├── Invitation.js        # Catalog item schema & validation
│   │   │   ├── Order.js             # Customer order schema & validation
│   │   │   └── ContactRequest.js    # Contact message schema
│   │   ├── routes/
│   │   │   ├── invitationRoutes.js
│   │   │   ├── orderRoutes.js
│   │   │   └── contactRoutes.js
│   │   └── server.js                # Express app entry point
│   ├── data/
│   │   └── db.json                  # Auto-generated turnkey database
│   ├── .env.example
│   ├── .env
│   └── package.json
│
├── README.md
└── .gitignore
```

---

## 🚀 Quick Start Instructions

Both the frontend and backend run as independent Node.js applications.

### 1. Start the Backend API (Port 5000)

Open a terminal and navigate to `backend`:

```powershell
cd C:\Users\GM-Service\Desktop\elaris-website\backend
npm run dev
# Or for standard execution:
npm start
```

The API server will start at: `http://localhost:5000`
- Health Check: `http://localhost:5000/api/health`
- Invitations API: `http://localhost:5000/api/invitations`
- Orders API: `http://localhost:5000/api/orders`

### 2. Start the Frontend (Port 5173)

Open a second terminal and navigate to `frontend`:

```powershell
cd C:\Users\GM-Service\Desktop\elaris-website\frontend
npm run dev
```

Open your browser at: `http://localhost:5173`

---

## ⚙️ Environment Variables

### Backend Configuration (`backend/.env`)

```ini
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Optional: MongoDB Connection
# Leave empty to automatically use local file-persisted database (backend/data/db.json)
MONGODB_URI=

# Optional: Admin Secret Token
ADMIN_SECRET=elaris_admin_secret_token_2026
```

### Frontend Configuration (`frontend/.env` - optional)

Vite uses its proxy in `vite.config.js` to automatically route `/api/*` to `http://localhost:5000`.
If deploying to a separate domain in production, specify:
```ini
VITE_API_URL=https://api.yourdomain.com
```

---

## 🎨 Brand & Design System

- **Brand Name**: ELARIS
- **Subtitle**: Strictly **"Digital Invitations"** (consistently displayed across header, footer, mobile drawer, and hero)
- **Palette**:
  - Background: `#F5F1E9` (Warm Ivory)
  - Primary Text: `#555846` (Olive Charcoal)
  - Green Accent: `#27AE60` (Emerald Green)
  - Light Green: `#C2FFC5` (Mint Glow)
  - Secondary Background: `#DEDDD5` (Stone)
  - Gold Accent: `#C5A059` (Bespoke Champagne)
- **Typography**:
  - Headings: `Noto Serif Armenian`, `Playfair Display`, serif
  - Body: `Noto Sans Armenian`, `Plus Jakarta Sans`, sans-serif
  - Both fonts support Armenian, Cyrillic, and Latin characters flawlessly.

---

## 🌐 Language System

- **Default Language**: Armenian (`hy`)
- **Supported Languages**: Armenian (`hy`), Russian (`ru`), English (`en`)
- **Persistence**: Selected language automatically persists via `localStorage`.
- **Zero Hardcoded Visible Texts**: All texts reside in `src/locales/hy.json`, `ru.json`, `en.json`.

---

## 📦 Adding New Invitations

To add a new invitation design:
1. Open `frontend/src/data/invitations.js`.
2. Add a new object to `invitationsData`:
```javascript
{
  id: "invitation-009",
  title: {
    hy: "Rose Romance",
    ru: "Rose Romance",
    en: "Rose Romance"
  },
  category: "wedding", // wedding, engagement, birthday, baptism, baby, corporate, anniversary, other
  price: 15000,
  image: "https://images.unsplash.com/...",
  previewUrl: "https://your-real-invitation-url.com", // <-- Replace with your real URL!
  description: {
    hy: "...",
    ru: "...",
    en: "..."
  }
}
```
3. The catalog, search, and category filters will immediately update without any component modifications!

---

## 🔌 API Endpoints Summary

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service status and timestamp |
| `GET` | `/api/invitations` | Get all catalog invitations (supports `?category=wedding`) |
| `GET` | `/api/invitations/:id` | Get single invitation by ID |
| `POST` | `/api/orders` | Place a customer invitation order |
| `GET` | `/api/orders` | Retrieve customer orders list |
| `POST` | `/api/contact` | Submit general customer message/inquiry |
