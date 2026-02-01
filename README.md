# 🚀 MargAI

> **Stop Learning Everything. Start Learning Right.**
> An intelligent, AI-powered roadmap generator that creates personalized study plans based on your career goals, skill level, and schedule.

![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=for-the-badge&logo=supabase)
![Gemini AI](https://img.shields.io/badge/AI-Gemini_Pro-orange?style=for-the-badge&logo=google)

---

## 🌟 Why MargAI?

Self-learning is hard. Tutorials are everywhere, but **structure** is missing.
**MargAI** solves "tutorial hell" by acting as your personal tech mentor. It builds a step-by-step curriculum tailored specifically to you—whether you have 2 hours a day or 8.

## ✨ Key Features

- 🤖 **AI-Powered Curriculums:** Uses **Google Gemini** to generate detailed, week-by-week study plans for any tech stack (AI/ML, Full Stack, DevOps, etc.).
- 🔗 **Smart Resource Linking:** Automatically generates deep links to high-quality documentation (**GeeksforGeeks**, **W3Schools**) and targeted **YouTube** tutorials.
- 🔐 **Secure Authentication:** Full user support with **Google OAuth** and Email login via **Supabase**.
- ☁️ **Cloud Sync:** Never lose your progress. All roadmaps are stored in a **PostgreSQL** database.
- 🎨 **Modern Experience:** Built with **Next.js 15** and **Tailwind CSS** for a fast, responsive, dark-mode interface.

---

## 🛠️ Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | Next.js 15 (App Router) | React Framework for Production |
| **Styling** | Tailwind CSS | Utility-first CSS |
| **Language** | TypeScript | Static typing for reliability |
| **AI Model** | Google Gemini API | Logic behind the roadmaps |
| **Backend/DB** | Supabase | Auth & PostgreSQL Database |
| **Auth** | OAuth 2.0 | Google & Email Sign-in |

---

## 🚀 Getting Started

Follow these steps to run MargAI locally.

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/marg-ai.git](https://github.com/your-username/marg-ai.git)
cd marg-ai

### 2. Install Dependencies
npm install

### 3. Configure Environment Variables
Create a .env file in the root directory and add your API keys:

# Google Gemini API (For AI Generation)
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_key_here

# Supabase (For Database & Auth)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

### 4. Run the Development Server
npm run dev
Open http://localhost:3000 to see the app live!

📁 Project Structure
src/
├── app/
│   ├── api/            # Server-side API routes (Gemini integration)
│   ├── login/          # Authentication pages
│   ├── dashboard/      # User progress dashboard
│   ├── generated/      # Dynamic roadmap view
│   └── layout.tsx      # Root layout & providers
├── components/
│   ├── common/         # Reusable UI (Navbar, Buttons)
│   └── roadmap/        # Roadmap visualization components
├── lib/
│   └── supabaseClient.ts # Database connection logic
└── styles/             # Global Tailwind styles

🔮 Future Roadmap
[ ] Progress Tracking: Mark individual topics as "Complete" and update DB.

[ ] Public Profiles: Share your roadmap with the community.

[ ] PDF Export: Download your syllabus.

[ ] Job Matching: See jobs that match your completed roadmap.

🤝 Contributing
Contributions are welcome! If you have ideas for better prompts or UI improvements:

1. Fork the Project

2. Create your Feature Branch (git checkout -b feature/AmazingFeature)

3. Commit your Changes (git commit -m 'Add some AmazingFeature')

4. Push to the Branch (git push origin feature/AmazingFeature)

5. Open a Pull Request

📄 License
Distributed under the MIT License. See LICENSE for more information.
<p align="center"> Built with ❤️ by Gaurav Yadav </p>