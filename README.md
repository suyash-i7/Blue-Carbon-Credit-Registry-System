# 🌿 Veridian — Blue Carbon Credit Registry

**Veridian** is a modern, full-stack digital platform designed to bring transparency, efficiency, and elegant UX to the blue carbon credit market. Built for NGOs, Governments, and Corporations, Veridian leverages the power of **Node.js, Express, Supabase (PostgreSQL), and React** to track the birth, verification, issuance, and lifecycle of carbon credits from coastal ecosystems (mangroves, seagrasses, wetlands).

![Veridian UI](https://img.shields.io/badge/Design-Glassmorphism-0D9488?style=for-the-badge&logo=tailwind-css)
![Backend](https://img.shields.io/badge/Backend-Node.js/Express-3ECF8E?style=for-the-badge&logo=nodedotjs)
![Database](https://img.shields.io/badge/Database-Supabase%20PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase)
![Frontend](https://img.shields.io/badge/Frontend-React%20%2F%20Vite-61DAFB?style=for-the-badge&logo=react)

---

## ✨ Key Features

*   **Premium Glassmorphic UI**: A state-of-the-art interface built with React, Tailwind CSS, and Framer Motion.
*   **Role-Based Access & Dashboards**:
    *   **NGOs**: Register organization, submit coastal restoration projects (MRV bundles, GIS data, hectare measurements), and receive approved carbon credits upon verification.
    *   **Admin**: Oversee platform verification queues, review NGO and company enrollments, validate ecological projects, and generate official carbon credit issuance certificates.
    *   **Companies**: Purchase VCC (Veridian Carbon Credits) within annual limits, manage offsetting portfolios, and track compliance timelines.
*   **Automated Credit Issuance & Tracking**:
    *   **Issuance**: Verified projects generate carbon credits (`10 VCC per hectare`) with unique registry transaction reference codes.
    *   **Annual Offsetting Cycle**: Real-time validity and credit management powered by Supabase.

---

## 🛠️ Tech Stack

*   **Frontend**: React (Vite), Tailwind CSS, Framer Motion, Lucide React, Axios.
*   **Backend**: Node.js, Express.js, Multer.
*   **Database**: Supabase (PostgreSQL).
*   **Authentication**: JWT-based with bcrypt password hashing and role authorization middleware.

---

## 🚀 Getting Started

### 1. Prerequisites
*   Node.js (v18+)
*   A Supabase Project (PostgreSQL)

### 2. Backend Setup
1.  **Database**: Go to your Supabase SQL Editor and run the contents of `backend/supabase_schema.sql`.
2.  **Configure `.env` in `backend/`**:
    ```env
    PORT=5000
    SUPABASE_URL=your_supabase_project_url
    SUPABASE_KEY=your_supabase_anon_key
    JWT_SECRET=your_jwt_secret
    ADMIN_EMAIL=carbonadmin@gmail.com
    ```
3.  **Install Dependencies & Run**:
    ```bash
    cd backend
    npm install
    npm run dev
    ```

### 3. Frontend Setup
```bash
cd veridian-frontend
npm install
npm run dev
```

The application will be accessible at `http://localhost:5173`.

---

## 📅 Platform Workflow

1.  **NGO**: Registers organization -> Submits Restoration Project (Area, Location, Documents) -> Status set to `Pending`.
2.  **Admin**: Logs in via authorized email (`carbonadmin@gmail.com`) -> Reviews Queue -> Approves User & Project.
3.  **Registry Issuance**: Approval automatically calculates credits and registers official issuance certificates.
4.  **Company**: Registers corporate account -> Purchases carbon credits -> Credits immediately reflected in portfolio.
5.  **Tracking**: All transactions and allocations maintain complete audit history in PostgreSQL.

---

## 🔒 Security

*   Admin access is protected and restricted to authorized administrator emails.
*   JWT payloads are signed and verified for all API requests.
*   Role-based middleware prevents unauthorized access between NGO, corporate, and admin routes.

## 📄 License
This project is licensed under the MIT License.
