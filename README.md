# 🏟️ SportNest

SportNest is a modern Sports Facility Booking Platform designed to help sports lovers and venue owners seamlessly discover, manage, and book sports fields, courts, or venues. This full-stack application utilizes a mobile-first design philosophy and provides efficient step-by-step state handling.

🔗 **Live URL:** [https://sportnest-go.vercel.app/](https://sportnest-go.vercel.app/)  
💻 **Repository Link:** [https://github.com/AMIRUL1104/SportNest](https://github.com/AMIRUL1104/SportNest)  
🌐 **Developer Portfolio:** [https://amirul-islam.vercel.app](https://amirul-islam.vercel.app)

---

## 🎯 Purpose

The main purpose of this project is to bridge the gap between sports lovers and venue management. Tracking turf fields or courts manually can be challenging; SportNest digitalizes this entire experience, ensuring automated slot tracking and secure booking management.

---

## ✨ Features

### 👥 User Features:

- **Responsive Navigation:** Mobile-first user interface with completely responsive navigation and client dashboards.
- **Authentication System:** Secure JWT-based registration and login system managed globally via context.
- **Protected Routes:** User dashboard components and checkout operations are strictly secured for authenticated accounts.
- **Facility Discovery:** A clean directory viewing structure supporting dynamic search filters and detailed info pages (`/facilities`, `/facility/:id`).
- **Dynamic Booking:** Step-by-step slot reservation workflows and fluid payment processing modules.

### 🛠️ Backend & Infrastructure:

- **Database Architecture:** Structurally optimized MongoDB collections for structured handling of `Facilities` and `Bookings`.
- **RESTful API Layer:** Robust Express.js routing endpoints handling authentication, user profiles, and active records (`/me` endpoint verification).
- **Environment Safety:** Strict tracking of secret keys and secure credentials using isolated environment variables.

---

## 📦 NPM Packages Used

The following production dependencies and developer tools were utilized to build this application efficiently:

### 🌐 Frontend (Next.js/React Framework):

- **next** - Core React framework enabling Server-Side Rendering (SSR) and static optimizations.
- **react / react-dom** - Efficient UI structure rendering and DOM reconciliation.
- **tailwindcss** - A utility-first CSS framework for rapid responsive styling.
- **postcss / autoprefixer** - Automatic vendor prefix injection to ensure layout stability across varying mobile screens.
- **eslint** - Code quality enforcement and syntax standardized matching.

### 🖥️ Backend (Express/Node):

- **express** - Minimalist, high-performance web framework for managing backend routing layers.
- **mongoose** - Object modeling framework mapping seamless JavaScript schema types straight into MongoDB.
- **jsonwebtoken (jwt)** - Secure stateless token-based authorization workflows.
- **dotenv** - Automated loading of runtime configurations from isolated files.
- **cors** - Enabling Cross-Origin Resource Sharing security permissions.

---

## 🚀 Installation & Local Setup

To run this project locally on your development system, execute the following steps:

1. **Clone the repository:**

```bash
   git clone [https://github.com/AMIRUL1104/SportNest.git](https://github.com/AMIRUL1104/SportNest.git)
   cd SportNest

```

2. **Install Dependencies:**

```bash
   npm install

```

3. **Environment Variables Configuration (`.env`):**
   Create a new file named `.env` in your root directory and map the following required variables:

```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key

```

4. **Run the Project (Development Mode):**

```bash
   npm run dev

```

---

## 🛠️ Tech Stack Matrix

- **Frontend:** React, Next.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Deployment:** Vercel

---

⭐ **Developer Portfolio:** [Amirul Islam](https://amirul-islam.vercel.app)

Feel free to fork this repository, open issue branches, or submit pull requests to contribute!

```

```
