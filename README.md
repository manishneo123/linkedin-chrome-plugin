# AI Copilot for LinkedIn

**Chrome extension for LinkedIn:** sales outreach (profile analysis + messages), **warm intros from connections** (crawl connections list, AI-score for buyers/influencers/evangelists), **create content** (posts, articles, carousels, scripts), **write comments** on feed posts (analyze multiple posts, get “should you comment?” + suggested comments), and job applications (job analysis, CV optimization, interview prep). Powered by AI; works with **your own OpenAI API key** or with an optional backend for credits.

### Download

**[Install from Chrome Web Store](https://chromewebstore.google.com/detail/ai-copilot-for-linkedin/khgklonoehpkpklolblfabajepgpgbic?hl=en&authuser=0)** — one-click install. No build step required.

---

## Table of contents

- [Download](#download)
- [Features](#features)
- [Use your own API key](#use-your-own-api-key)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Code structure](#code-structure)
- [Backend (optional)](#backend-optional)
- [Support](#support)

---

## Features

### 📊 Marketing

Two features: **Outreach** (Compose + Results) and **Connections** (warm intro list).

| Area | What it does |
|------|----------------|
| **Outreach – Compose** | Set outreach goal, ICP (ideal customer profile), seller config (offer, proof points), risk level, offer type. Capture your LinkedIn profile. Analyze a prospect’s profile from their LinkedIn page. |
| **Outreach – Results** | Fit score, influence score, role mapping. Shared context (connections, geography, experience). Recommended approach and timing. Drafts: connection request, cold email, message variants, follow-up sequence. Analysis details (fit reasons, triggers, mismatches, do’s/don’ts). Related prospects from “People also viewed”. |

| **Connections** | **Warm intro list:** Open your LinkedIn Connections page (or "connections of" search). Set who to find (what you sell, target profile, goal). Crawl up to 10 pages; AI scores each connection as Buyer, Influencer, or Evangelist with relevance score and reason. See per-page stats and a list of matches to ask your connection to introduce. Uses connection-specific matching criteria (or falls back to Outreach settings). |

### ✍️ Content

Two clear modes in the UI: **Create content** or **Write comments**.

| Mode | What it does |
|------|----------------|
| **Create content** | Set content goal and target audience (Setup). Get inspiration by analyzing a profile’s posts (Inspire). Generate LinkedIn **posts**, **articles**, **carousels**, **video scripts**, **polls** (Create). Custom topics, tone (Professional / Friendly / Conversational / Authoritative). Content library and history (History). |
| **Write comments** | On a LinkedIn **feed** or **post** page: analyze **multiple visible posts** in one go. For each post: short summary, **whether you should comment** (yes/no + reason), and a **suggested comment** to copy. Uses your Marketing settings (goal, ICP, offer) so comments stay on-brand. Falls back to AI parsing of page text when DOM selectors don’t find posts. |

Content tabs: **Setup** → **Inspire** → **Create** → **Comment** → **History**.

### 💼 Job

| Area | What it does |
|------|----------------|
| **Analyze Job** | Extract and analyze a LinkedIn job posting (title, company, description, requirements, etc.). |
| **CV Analysis** | Upload your CV (PDF, DOCX, or TXT). Get match score and improvement suggestions. |
| **Interview Prep** | Generate interview questions and suggested answers from a saved job analysis. |
| **Results** | List of saved job analyses and interview question sets. |

### ⚙️ Settings

- **Use Backend Credits** (checkbox): when **unchecked**, the extension uses **your own OpenAI API key** (see below). When checked, it uses the backend’s credit system.
- **API key**: Enter your OpenAI API key when not using backend credits.
- **Billing & credits**: View balance and buy credits when using the backend.
- **User ID**, documentation link, support contact.

---

## Use your own API key

You can run the extension **without any backend** by using your own OpenAI API key:

1. Open the extension → **Settings**.
2. **Uncheck** “Use Backend Credits”.
3. Enter your **OpenAI API key** in the API key field.
4. Save. All AI features (profile analysis, content generation, post comment suggestions, job/CV/interview) will use your key and you pay OpenAI directly.

No server, no credits system, no Stripe. Your key is stored locally in the browser. For backend credits, optional payments, and stored analyses, you need the separate backend (see [Backend (optional)](#backend-optional)).

---

## Installation

1. **Clone this repo**
   ```bash
   git clone https://github.com/manishneo123/linkedin-chrome-plugin.git
   cd linkedin-chrome-plugin
   ```

2. **Load the extension in Chrome**
   - Open `chrome://extensions/`.
   - Turn on **Developer mode** (top right).
   - Click **Load unpacked** and select the `linkedin-chrome-plugin` folder.

3. **Configure** (see [Configuration](#configuration)): set backend URL if you use the backend, or add your OpenAI API key in Settings to use your own key.

4. **Optional:** Run the backend from the [linkedin](https://github.com/YOUR_ORG/linkedin) repo if you want credits and payments (see [README_BACKEND.md](./README_BACKEND.md)).

---

## Configuration

- **Backend URL**  
  If you use the backend (credits, payments), set the API base URL in `popup/popup.js`:
  ```javascript
  const BACKEND_URL = 'https://your-backend-domain.com';  // or http://localhost:3000
  ```

- **Own API key**  
  In the extension UI: **Settings** → uncheck “Use Backend Credits” → enter your OpenAI API key. No backend required.

---

## Usage

- **Marketing:** Open a prospect’s LinkedIn profile → choose **Outreach** → in **Compose** set goal/ICP/offer → click **Analyze Profile** → see **Results** and copy drafts.
- **Marketing – Connections:** Choose **Connections** → set who to find (offer, target profile, goal) → open your LinkedIn Connections page → click **Crawl & score connections** → see scored list (Buyer/Influencer/Evangelist) with reasons; use for warm intros.
- **Content – Create:** In **Content**, use **Setup** (goal, audience) → optionally **Inspire** (analyze a profile’s posts) → **Create** (pick topic and type) → generate and copy.
- **Content – Write comments:** Open LinkedIn feed or a post → **Content** → **Comment** (or use “Write comments” in the mode bar) → **Analyze posts & suggest comments** → see per-post summary, “Should you comment?”, and suggested comment; copy as needed.
- **Job:** Open a LinkedIn job page → **Job** → **Analyze Job** → optionally **CV Analysis** and **Interview Prep** from the same section.

---

## Code structure

```
linkedin-chrome-plugin/
├── manifest.json          # Extension manifest (v3): name, permissions, content_scripts, side_panel, action
├── popup/
│   ├── popup.html         # Main UI: product tabs (Marketing, Content, Job), Settings; all views
│   ├── popup.css          # Styles for popup (cards, forms, content-mode bar, post-comment cards, etc.)
│   ├── popup.js           # All popup logic: product/tab switching, API calls, Marketing/Content/Job flows,
│   │                      # credit display, post-comment analysis rendering, copy handlers
│   ├── documentation.html # In-extension docs (linked from Settings)
│   └── onboarding-modal.html
├── scripts/
│   ├── content.js         # Injected on LinkedIn. Message handlers: SCRAPE_PROFILE, SCRAPE_JOB,
│   │                      # SCRAPE_VISIBLE_POST (multiple posts + rawPageExcerpt), FETCH_POST_CONTENT,
│   │                      # LOAD_RECENT_ACTIVITY. Helpers: extractVisiblePost(), getRawPageExcerpt(),
│   │                      # extractRecentActivity(), extractCompanyInfo(), extractRelatedProfiles(), etc.
│   └── background.js      # Service worker: open side panel on icon click, set side panel for tabs
├── images/                # Extension icons (16–128px)
├── README.md              # This file
├── README_BACKEND.md      # Backend setup, credits, Stripe, API key vs credits
├── CHROME_STORE_DESCRIPTION.md
├── PRODUCT_DESCRIPTION.txt
└── *.md                   # Feature docs (CV, job analysis, etc.)
```

**Data flow (high level):**

- **Popup** talks to **content script** via `chrome.tabs.sendMessage` (e.g. `SCRAPE_PROFILE`, `SCRAPE_VISIBLE_POST`) when the active tab is LinkedIn.
- **Popup** either calls **OpenAI** directly (when using your own API key) or your **backend** (e.g. `/api/openai-proxy`, `/api/post-comment-suggestion`) when using backend credits.
- **Content script** only runs on `linkedin.com`; it reads the DOM and returns structured data (profile text, activity, posts array, raw page excerpt for comment flow, job details).

---

## Backend (optional)

If you want credits, payments, and server-side storage (e.g. analyses, content library), use the backend from the **linkedin** repo:

- **Backend repo (this backend):** [linkedin](https://github.com/YOUR_ORG/linkedin) — Node/Express/MySQL API, credits, Stripe, OpenAI proxy.

Replace `YOUR_ORG` with the actual GitHub org or username. See **[README_BACKEND.md](./README_BACKEND.md)** for:

- Backend setup (Node, env, Stripe, OpenAI).
- Credits vs **own API key**: extension supports both; backend is optional.
- Endpoints used by the extension: auth, credits, OpenAI proxy, **post-comment-suggestion** (multi-post analysis), job/content analyses, etc.
- Production deployment and `BACKEND_URL` in `popup/popup.js`.

**Related:** The backend README ([linkedin](https://github.com/YOUR_ORG/linkedin) repo, `backend/README.md`) links back to this Chrome extension and the [Chrome Web Store](https://chromewebstore.google.com/detail/ai-copilot-for-linkedin/khgklonoehpkpklolblfabajepgpgbic?hl=en&authuser=0).

---

## Support

- **Documentation:** Open the extension → **Settings** → link to in-extension docs.
- **Email:** manish.neo@gmail.com (or your preferred support contact).

---

## License

See repository license file (if present). Use of this extension and any backend is subject to OpenAI’s and LinkedIn’s terms of use.
