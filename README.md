# ShopZen 🛒

ShopZen is a premium, responsive e-commerce catalog application built using **Next.js** and styled with **Tailwind CSS**. It provides a sleek product directory interface, interactive creation forms, real-time validations, listing administration, and secure user authentication.

---

## 🚀 Key Features

* **Real-time Catalog Showcase**: A grid of product cards displaying categories, prices, ratings, and image previews. Includes multi-select categories, pricing ranges, search keywords, and ratings sorting.
* **Interactive Live Previews**: The product creation page utilizes React Hook Form to validate details while displaying a side-by-side **Live Card Preview** that updates in real time as the user types.
* **Dynamic Product Details**: Dynamic routes (`/items/[slug]`) compiled at build time for speed, featuring technical specifications (SKU, weight, material), rating summaries, and store trust assurances.
* **Catalog Management**: Admin view displaying items in a sleek table on desktop viewports and custom flex cards on mobile layouts, supporting view/delete actions.
* **User Authentication**: Login and Registration forms backed by **Firebase Auth** (supporting Email/Password credentials and single-click **Google Sign-in/Sign-up**).
* **Robust Form Validations**: Utilizes `react-hook-form` for form state and validation rules (e.g. password complexity requirements: minimum 6 characters, one uppercase letter, one special character).
* **Toastify Notifications**: Integration of `react-toastify` for global, non-blocking visual feedback on login, registration, cart additions, and product deletions.

---

## 🛠️ Setup & Installation Instructions

Follow these steps to run the project locally on your machine:

### 1. Clone the Repository
```bash
git clone https://github.com/Shoaib7504/shop-zone.git
cd shop-zone
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Firebase Environment Variables
Create a `.env` or `.env.local` file in the project root folder and specify your Firebase configuration parameters:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here
```

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the running application.

### 5. Build for Production
```bash
npm run build
npm start
```

---

## 🛣️ Route Summary

| Route | Accessibility | Description |
|---|---|---|
| `/` | Public | Home / Landing page featuring curated trending items and banners. |
| `/items` | Public | Main product gallery list with real-time query, sorting, and category filters. |
| `/items/[slug]` | Public | Dynamic product details page displaying detailed information, specs sheet, and cart CTAs. |
| `/items/add` | Public / Private | Catalog creator page with input forms and a real-time live preview card. |
| `/items/manage` | Public / Private | Catalog administrator dashboard table/grid with delete controls. |
| `/login` | Public | User sign-in page supporting Email/Password (with show/hide toggle) and Google Auth. |
| `/register` | Public | Account creation form with password strength validators and Google Auth. |
