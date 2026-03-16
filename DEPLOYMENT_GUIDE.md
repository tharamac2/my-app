# Ratan Matrimony - Deployment Guide (Production)

This guide provides instructions for deploying the Ratan Matrimony application in a production environment.

## 1. Backend (FastAPI)
**Environment**: Oracle Cloud / AWS / Azure
**Platform**: Ubuntu 22.04 LTS recommended

1.  **Clone Repository**: `git clone <repo-url>`
2.  **Environment Variables**: Create a `.env` file in `backend/app/core` with the following:
    ```env
    SECRET_KEY=your_secure_secret
    DATABASE_URI=mysql+pymysql://user:pass@db_host/ratan_matrimony
    CLOUDINARY_CLOUD_NAME=...
    CLOUDINARY_API_KEY=...
    CLOUDINARY_API_SECRET=...
    RAZORPAY_KEY_ID=...
    RAZORPAY_KEY_SECRET=...
    ```
3.  **Setup Environment**:
    ```bash
    cd backend
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements_fastapi.txt
    ```
4.  **Run with Gunicorn/Uvicorn**:
    ```bash
    gunicorn -w 4 -k uvicorn.workers.UvicornWorker app.main:app --bind 0.0.0.0:8000
    ```

## 2. Database (MySQL)
**Platform**: Managed MySQL (RDS / Azure Database for MySQL)

1.  Create the database: `CREATE DATABASE ratan_matrimony;`
2.  Import the schema: `mysql -u root -p ratan_matrimony < backend/schema_production.sql`
3.  Ensure database host allows traffic from the Backend server IP.

## 3. Frontend (React Native & Vite Admin)
### Mobile (React Native)
1.  **Build Bundle**: `npx expo export --platform android` (for Android APK)
2.  **CDN**: Upload assets to an S3 bucket or similar if using web version.

### Admin Panel (Vite)
**Platform**: Vercel / Netlify / Cloudflare Pages

1.  `cd admin`
2.  Add environment variable `VITE_API_URL` pointing to your deployed backend.
3.  Connect to Vercel/Netlify for automatic deployment from the subfolder.

## 4. Third-Party Integrations
-   **Cloudinary**: Create an account and get API credentials for photo storage.
-   **Razorpay**: Create a merchant account, generate API keys, and set up a Webhook URL pointing to `https://your-api.com/api/v1/billing/webhook`.
