# LinkedIn AI Sales Copilot – Chrome Extension

AI-powered Chrome extension for LinkedIn: sales outreach (profile analysis, messages), content creation, **post comment suggestions**, and job application support (CV analysis, interview prep). Uses your backend for credits and optional API key.

---

## Features

### 📊 Marketing
- **Compose** – Set outreach goal, ICP, seller config (offer, proof), risk level, and offer type. Capture your profile and analyze a prospect’s LinkedIn profile.
- **Results** – Fit/influence scores, shared context, outreach strategy, connection request and email drafts, analysis details, related prospects.

### ✍️ Content
Two main modes (clearly separated in the UI):

- **Create content** – Generate LinkedIn posts, articles, carousels, or video scripts from your content goal, ICP, and topics. Use inspiration from analyzed profiles. View history and content library.
- **Write comments** – On a LinkedIn feed or post page: analyze **multiple visible posts**, get for each post:
  - Whether it makes sense to comment (yes/no and reason)
  - A suggested comment you can copy

Content section also includes:
- **Setup** – Content goal, target audience (ICP), expertise, proof points.
- **Inspire** – Analyze a profile’s posts for style and topics; save and reuse.
- **Create** – Topic selection, content type, tone; generate and copy content.
- **Comment** – “Analyze posts & suggest comments” using visible feed/post content (DOM or AI parsing when needed). Uses Marketing Compose settings (goal, ICP, offer) to decide relevance and draft comments.
- **History** – Generated content and content library.

### 💼 Job
- **Analyze Job** – Extract and analyze a LinkedIn job posting.
- **CV Analysis** – Upload CV (DOCX/PDF/TXT); get analysis and suggestions.
- **Interview Prep** – Generate interview questions and suggested answers from a saved job analysis.
- **Results** – Saved job analyses and interview question sets.

### ⚙️ Settings
- API key (optional when using backend credits).
- Billing & credits (when using backend).
- User ID and support links.

---

## Requirements

- Chrome (or Chromium-based browser) with the extension loaded.
- Backend running for credits, storage, and AI (see [README_BACKEND.md](./README_BACKEND.md) and the `linkedin` repo backend).

---

## Installation

1. Clone this repo and the backend (`linkedin`).
2. In Chrome: **Extensions** → **Manage extensions** → **Load unpacked** → select the `linkedin-chrome-plugin` folder.
3. Configure the backend URL in the extension (e.g. in popup/settings or in code; default may be `http://localhost:3000`).
4. Start the backend and ensure the extension can reach it (CORS, URL).

---

## Usage (high level)

- **Marketing**: Open a prospect’s LinkedIn profile → set goal/ICP/offer in Compose → **Analyze Profile** → see Results and drafts.
- **Content – Create**: Set content goal and ICP in Setup → use Inspire (optional) → in Create, pick topic and type → generate and copy.
- **Content – Write comments**: Open LinkedIn feed or a post → in Content, choose **Write comments** (or open Comment tab) → **Analyze posts & suggest comments** → see per-post “should you comment?” and suggested comment; copy as needed.
- **Job**: Open a job page → Analyze Job → optionally run CV Analysis and Interview Prep from the Job section.

---

## Project structure

- `popup/` – Popup UI (HTML, CSS, JS): product tabs (Marketing, Content, Job), Compose/Results, Content (Create + Comment + Setup/Inspire/History), Job tabs, Settings.
- `scripts/content.js` – Injected on LinkedIn: profile scrape, job scrape, **visible posts extraction** (multiple posts or raw page excerpt for AI).
- `scripts/background.js` – Service worker.
- `manifest.json` – Permissions, content scripts (LinkedIn), host permissions.

---

## Backend

The extension expects a backend that provides (among others):

- Auth/API key and credits.
- **POST /api/post-comment-suggestion** – Body: `posts` (array), `profile` (seller goal, offer, ICP, proof), optional `rawPageExcerpt`. Returns `analyses` (per-post summary, shouldComment, reason, suggestedComment), `posts` (previews), credits used/remaining. When DOM posts are missing, the backend can use AI to parse multiple posts from `rawPageExcerpt`.

See the main backend repo and `README_BACKEND.md` for full API and setup.
