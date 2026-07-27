## 🚀 Getting Started
Global Advance OPC — Job Portal FrontendThis is the client-side single-page application (SPA) for the Global Advance OPC Job Portal. Built using the frontend portion of the MERN Stack (React.js), this application manages job searches, applicant management dashboards, and user authentications.Live Client Link: vercel.appLocal API Context: Connects locally to an Express/Node.js backend instance.

### 🚀 Key Features
Dynamic Job Search & Filters: React-driven filtering for jobs by category, location, and keywords.
User Authentication: Sign-up and log-in workflows for candidates and employers.
Responsive Dashboard: Optimized view layouts for profile management and tracking applications.Axios API Layer: Fully integrated to fetch, send, and cycle data through your local server instance.

## 🛠 Tech StackFrontend Library: 
## React.js (v18+)Routing: React Router DOM (Client-side routing)HTTP Client: Axios (For processing local API actions)Hosting Platform: Vercelhttps://job-frontend-psi.vercel.app/

## 📂 Project Architecture 

```text
├── public/                 # Static visual resources (icons, logos)
└── src/
    ├── components/         # Global reusable UI blocks (Buttons, Cards)
    ├── hooks/              # Custom React logic workflows (useAuth)
    ├── pages/              # App views (Login.jsx, Jobs.jsx, Dashboard.jsx)
    ├── services/           # Axios instance maps tracking the Local API
    ├── styles/             # Modular application CSS configurations
    ├── App.jsx             # Base component housing top-level routes
    └── main.jsx            # Application entry mounting the DOM
```

## 🌐 Local API Schema Integration

| Action Category | Protocol Method | Express Endpoint Routing | Expected Response |
| :--- | :--- | :--- | :--- |
| **Authentication** | `POST` | `/api/auth/register` | Account Creation / Token |
| **Authentication** | `POST` | `/api/auth/login` | Session Initialization / Bearer Token |
| **Job Engine** | `GET` | `/api/jobs` | Array of available Job Listings |
| **Job Engine** | `POST` | `/api/jobs/apply/:id` | Application Success Receipt |
| **Profile Management** | `PUT` | `/api/user/profile` | Updated User JSON Details |

## 🚢 Continuous Vercel Deployment

This project maps directly to Git workflows on Vercel.

* **Pull Requests:** Committing branches spins up isolation preview testing servers.
* **Production Build:** Merges accepted into the `main` track automatically build out directly to [job-frontend-psi.vercel.app](https://vercel.app).
