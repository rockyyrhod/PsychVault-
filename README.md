🧠 PsychVault - Neural Research Registry
PsychVault is a high-performance, full-stack research repository designed for the PUP Biñan Campus community. It serves as a centralized "Neural Vault" for archiving psychological theories and student-led research studies, bridging the gap between student contributors and academic resources.

📸 Updated App Preview
✨ Core Features
Full-Stack Integration: Real-time data persistence using Supabase (PostgreSQL).

Search & Filter Engine: Dynamic filtering by research type (Student Research vs. Classical Theory), publication year, and keyword matching.

Researcher Dashboard: Personalized profile views including institutional details, publication counts, and customizable profile pictures.

Cloud Document Management: Secure PDF hosting via Supabase Storage, allowing users to either view manuscripts online or download them for offline peer review.

Secure Contributions: Row Level Security (RLS) policies ensuring only authenticated students can catalog new research.

Dynamic UI: High-fidelity Glassmorphism interface with smooth tab-navigation animations.

🛠️ Tech Stack
Frontend: React 18, TypeScript, Vite

Backend-as-a-Service: Supabase (Database, Auth, and Storage)

Styling: Tailwind CSS (Custom Dark Mode & Glassmorphism)

Security: PostgreSQL Row Level Security (RLS) & Environment Variable Masking

📂 Project Structure
/FrontEnd: The core React application and asset library.

.env: (Ignored) Secure storage for Supabase API keys.

supabaseClient.ts: The bridge for direct database communication.

Developed with ⚖️ and 💻 by Rhodcille Jhon M. Borja | Association of Computer Engineering Students (ACES) - 2026