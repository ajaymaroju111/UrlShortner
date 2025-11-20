

---

# 📌 **URL Shortener – Full Stack Application**

A production-ready URL shortener built using **React (Vite)**, **Node.js + Express**, and **PostgreSQL (Neon / Render)**.
This project allows users to generate short URLs, track click statistics, manage links, and view insights using a clean and responsive UI.

---

## 🚀 **Live Demo**

* **Frontend (Vercel):** *add your vercel URL here*
* **Backend API (Render):** `https://urlshortner-1-4jlb.onrender.com`

---

## 🛠️ **Tech Stack**

### **Frontend**

* React (Vite)
* Tailwind CSS
* React Router
* Lucide Icons
* Fully responsive UI (mobile-first)

### **Backend**

* Node.js
* Express.js
* PostgreSQL (Neon / Render)
* pg (node-postgres)
* CORS, dotenv

---

## 🔗 **Features**

### ✔ URL Shortening

* Create a short, unique code for any long URL
* Optionally provide a custom code
* Auto-generate codes if none provided

### ✔ Link Management

* View all created short links
* Delete links
* Copy short URL to clipboard
* Search and filter links

### ✔ Analytics

* Track:

  * Total click count
  * Last clicked time
  * Created timestamp
* Clean stats page for each code

### ✔ Redirection System

* Redirects `/<code>` to the original URL
* Increments click count and updates timestamps

### ✔ Responsive UI

* Desktop table + mobile card layout
* Smooth UX — loading, empty state, error state

---

## 📁 **Project Structure**

```
project-root/
│
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   └── index.html
│
└── server/                 # Node + Express backend
    ├── src/
    │   ├── controllers/
    │   ├── routes/
    │   ├── db.js
    │   └── server.js
    ├── db.sql              # Database schema
    └── .env
```

---

## 🗄️ **Database Schema**

```sql
CREATE TABLE IF NOT EXISTS links (
  code TEXT PRIMARY KEY,
  url TEXT NOT NULL,
  click_count INTEGER DEFAULT 0,
  last_clicked TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

---

## ⚙️ **Backend API Endpoints**

| Method                      | Endpoint                   | Description |
| --------------------------- | -------------------------- | ----------- |
| `POST /api/links`           | Create short link          |             |
| `GET /api/links`            | Get all links              |             |
| `GET /api/links/code/:code` | Get stats for a short code |             |
| `DELETE /api/links/:code`   | Delete specific link       |             |
| `GET /:code`                | Redirect to original URL   |             |

---

## 🧪 **Testing the API**

### Create new short URL

```bash
POST https://urlshortner-1-4jlb.onrender.com/api/links
Body: { "url": "https://example.com", "code": "test123" }
```

### Get all links

```bash
GET https://urlshortner-1-4jlb.onrender.com/api/links
```

### Redirect

```
https://urlshortner-1-4jlb.onrender.com/test123
```

---

## 🖥️ **Running Locally**

### 1️⃣ Clone the repo

```bash
git clone https://github.com/your-username/your-repo.git
```

### 2️⃣ Install backend dependencies

```bash
cd server
npm install
```

### 3️⃣ Configure environment variables (`server/.env`)

```
DATABASE_URL=your_neon_or_local_postgres_url
```

### 4️⃣ Start backend

```bash
npm start
```

### 5️⃣ Install frontend dependencies

```bash
cd ../client
npm install
```

### 6️⃣ Start frontend

```bash
npm run dev
```

---

## 🌍 **Deployment**

### ✔ Backend – Render

* Add GitHub repo
* Set Build Command: `npm install`
* Set Start Command: `node src/server.js`
* Add environment variable: `DATABASE_URL`
* Done 🎉

### ✔ Frontend – Vercel

* Import GitHub repo
* Set root directory to `/client`
* Add environment variable:

  ```
  VITE_API_URL=https://urlshortner-1-4jlb.onrender.com
  ```
* Deploy 🎉

---

## 🧹 **Improvements / Future Work**

* Authentication (Login to manage URLs)
* QR code generator
* Expiration date for short URLs
* Analytics dashboard with charts
* Sorting and pagination
* Dark mode

---

## 👨‍💻 **Author**

**Ajay Maroju**
Full Stack Developer

---

## ⭐ **Support**

If you like this project, please give it a ⭐ on GitHub!

