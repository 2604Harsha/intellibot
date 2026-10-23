<div align="center">

# 🤖 IntelliBot PRO

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-3.9+-yellow?style=for-the-badge&logo=python)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-Backend-black?style=for-the-badge&logo=flask)](https://flask.palletsprojects.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-1B222D?style=for-the-badge&logo=prisma)](https://www.prisma.io/)

**An enterprise-grade conversational AI platform blending stunning UI engineering with robust machine learning capabilities.**

[Explore Features](#-core-features) • [Architecture](#-system-architecture) • [Quick Start](#-quick-start) • [Documentation](#-documentation)

<br/>
<img src="https://via.placeholder.com/1200x400/05060A/00E5FF?text=IntelliBot+Nexus" alt="IntelliBot Nexus Banner" style="border-radius: 12px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.4);">
</div>

---

## 🎯 Overview

IntelliBot PRO represents the intersection of cutting-edge design systems and advanced Natural Language Processing (NLP). Designed for high-performance, real-time contextual interactions, the platform empowers users to query knowledge bases, parse unstructured document data, and maintain persistent, organized chat sessions—all encapsulated within a meticulously crafted, zero-latency frontend.

## ✨ Core Features

*   **Cinematic, Glassmorphic UI:** A deeply considered user experience powered by **Framer Motion** and **Tailwind CSS**. Features dynamic, hardware-accelerated ambient backgrounds, micro-interactions, and a responsive spatial design system.
*   **Decoupled Dual-Stack Architecture:** Strict separation of concerns between the high-throughput Node.js rendering layer and the compute-heavy Python AI processing cluster.
*   **Advanced Document Intelligence:** In-memory streaming and parsing of multi-modal files (PDFs, CSVs, TXT) via the `/api/upload` ingestion pipeline.
*   **Contextual Memory & State Management:** Chats are isolated, threaded, and securely persisted via **Prisma ORM**. Includes real-time Folder organization for optimal workspace management.
*   **Zero-Trust Security Model:** Cryptographically secure authentication via **NextAuth.js**, bcrypt password hashing, and stateless JWT session management.

## 🏗 System Architecture

IntelliBot PRO utilizes a microservice-inspired monorepo structure. The frontend handles state, authentication, and layout rendering, proxying inference requests to the internal Python inference engine.

```mermaid
graph TD
    Client[Web Client / Browser]
    
    subgraph Frontend ["Next.js Cluster (Port 3000)"]
        UI[App Router & Server Components]
        API_Gateway[Next.js API Routes]
        Auth[NextAuth Authentication]
    end
    
    subgraph Storage ["Persistence Layer"]
        DB[(SQLite / PostgreSQL)]
        Prisma[Prisma ORM]
    end
    
    subgraph Backend ["AI Inference Engine (Port 5001)"]
        Flask[Python Flask Server]
        NLP[Custom NLP / LLM Models]
        Memory[Vector / Context Memory]
    end

    Client <-->|HTTPS / WSS| UI
    UI <--> API_Gateway
    API_Gateway <--> Auth
    API_Gateway <--> Prisma
    Prisma <--> DB
    API_Gateway <-->|REST| Flask
    Flask <--> NLP
    NLP <--> Memory
```

---

## 📂 Directory Structure

```text
intellibot-main/
├── backend/                   # 🧠 AI Inference Engine
│   ├── app.py                 # Core Flask application entry point
│   ├── intellibot.py          # LLM orchestration and logic layer
│   ├── chatbot_core/          # Intent detection & parsing modules
│   ├── model/                 # Serialized weights and ML artifacts
│   ├── data/                  # Curated datasets & training pipelines
│   └── requirements.txt       # Python dependency manifest
│
├── frontend/                  # 💻 Presentation & API Layer
│   ├── app/                   # Next.js App Router (Pages & API)
│   ├── features/              # Feature-sliced domain logic (Chat, Auth)
│   ├── components/            # Reusable UI primitives & layouts
│   ├── prisma/                # Schema definitions & migrations
│   ├── lib/                   # Utility functions & singleton clients
│   └── store/                 # Zustand global state management
│
└── start.bat                  # 🚀 Local development orchestration script
```

---

## 🚀 Quick Start

### 1. Prerequisites
Ensure your local environment meets the following specifications:
- **Node.js**: `v18.17.0` or higher
- **Python**: `v3.9.0` or higher
- **Git**: For version control

### 2. Clone & Install
```bash
# Clone the repository
git clone https://github.com/vikassaini77/intellibot.git
cd intellibot

# 1. Setup the Next.js Frontend
cd frontend
npm install

# Initialize the Database
npx prisma generate
npx prisma db push

# 2. Setup the Python Backend
cd ../backend
python -m venv venv
source venv/bin/activate  # Or `venv\Scripts\activate` on Windows
pip install -r requirements.txt
cd ..
```

### 3. Launch Development Servers

For **Windows** users, simply execute the orchestrator script:
```cmd
.\start.bat
```
*(This concurrently spins up both the Next.js UI on `localhost:3000` and the Flask Engine on `127.0.0.1:5001`)*

For **Mac/Linux**, run these in separate terminal windows:
```bash
# Terminal 1: Frontend
cd frontend && npm run dev

# Terminal 2: Backend
cd backend && python app.py
```

---

## 🛠 Tech Stack Details

| Domain | Technologies |
| :--- | :--- |
| **Frontend Framework** | Next.js 14 (App Router), React 18, TypeScript |
| **Styling & Motion** | Tailwind CSS, Framer Motion, Lucide Icons |
| **State Management** | React Hooks, Zustand (Background Store) |
| **Authentication** | NextAuth.js, bcryptjs |
| **Database & ORM** | Prisma Client, SQLite (Configurable to PostgreSQL) |
| **AI / Backend** | Python 3, Flask, Custom NLP pipelines |
| **Data Processing** | pdf-parse, native JS File APIs |

---

## 🤝 Contributing

We adhere to rigorous software engineering standards. To contribute:
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Ensure strict TypeScript typings and PEP-8 Python compliance.
4. Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
5. Push to the Branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

## 🛡️ License

Distributed under the MIT License. See `LICENSE` for more information.

<div align="center">
  <br/>
  <p>Engineered with precision. Built for the future.</p>
</div>
