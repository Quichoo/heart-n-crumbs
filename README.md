# He[art] 'n Crumbs 🍪

A full-stack cookie ordering web app with a customer-facing storefront and a real-time admin dashboard, built for a home-based cookie business.

**Live site:** https://heart-in-crumbles.web.app

## Features

### Customer-facing
- Dynamic product catalog (cookies, bundles, and any future categories) with quantity selectors per size
- Live order summary with running total and delivery fee
- Order confirmation modal before submission
- Real-time order placement via Firestore, with sequential order numbers
- Fully responsive design

### Admin panel
- Secure login (Firebase Authentication)
- **Dashboard** — live stats (new orders, preparing, delivered, revenue today), recent orders, quick-accept panel
- **Orders** — filterable by date range, exportable to Excel, printable receipts, safe status management (pending → ongoing → done, or cancelled)
- **Sales Report** — revenue chart (week/month/6-month views), best-selling products with order drill-down, new vs. returning customer breakdown, PDF export
- **Catalog management** — fully editable categories and products from the UI; new product categories can be added without any code changes
- Real-time notifications (toast, sound, and notification bell) when new orders come in
- Mobile-responsive sidebar navigation

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS v4
- **Backend:** Firebase (Firestore, Authentication, Hosting)
- **Charts:** Recharts
- **Icons:** Lucide React
- **Excel export:** SheetJS (xlsx)
- **Routing:** React Router

## Project Structure
src/
components/
ui/ # Shared components (Card, Modal, QuantityStepper)
layouts/ # Customer-facing header/hero
order-form/ # Customer order flow
admin/
auth/ # Login, protected routes
layout/ # Sidebar, admin shell
orders/ # Orders table, status management
dashboard/ # Dashboard widgets
sales/ # Sales report components
catalog/ # Category/product management
notifications/ # Toast, notification bell
context/ # Auth and notification context providers
hooks/ # Custom hooks (useOrders, useCatalog, useSalesStats, etc.)
data/ # (legacy, catalog now lives in Firestore)
utils/ # Shared helper functions
firebase.js # Firebase config and initialization

## Getting Started

### Prerequisites
- Node.js and npm
- A Firebase project (Firestore, Authentication with Email/Password enabled, Hosting)

### Setup

1. Clone the repo
```bash
   git clone https://github.com/YOUR_USERNAME/heart-n-crumbs.git
   cd heart-n-crumbs
```

2. Install dependencies
```bash
   npm install
```

3. Add your Firebase config in `src/firebase.js`

4. Run the dev server
```bash
   npm run dev
```

### Firestore Setup

This app expects the following collections:
- `categories` — product categories (e.g. Cookies, Bundles), each with `sizeOptions`
- `products` — individual products, each linked to a `categoryId`
- `orders` — customer orders
- `counters` — used for sequential order numbering

Security rules: public `create` on `orders`, public `read` on `categories`/`products`, all writes/reads elsewhere require authentication. See `firestore.rules` in the Firebase console for the full ruleset.

### Deployment

```bash
npm run build
firebase deploy --only hosting
```

## Branching

- `main` — production, always deploy-ready
- `dev` — active development
- `feature/*` — individual feature branches, merged into `dev`

## Roadmap

- [ ] Settings page (store info, delivery fee, admin account management)
- [ ] Distance-based delivery fee calculation
