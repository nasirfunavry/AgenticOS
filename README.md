# AgenticOS – Your AI Agent for Web3 on X (Twitter)

**Built by ChainGPT**

AgenticOS lets you effortlessly create and deploy your own intelligent AI agent on X (formerly Twitter)—purpose-built for the Web3 ecosystem. Automate tasks like real-time market research, breaking crypto news, token analysis, and community engagement, enhancing your digital presence with 24/7 AI-driven insights.

📌 **Live Demo**: <a href="https://x.com/ChainGPTAI" target="_blank" rel="noopener noreferrer">ChainGPT AI on X</a>

---

## 🚀 Overview

AgenticOS is a TypeScript-based AI agent that automates tweet generation and publishing, leveraging ChainGPT's advanced Web3 LLM API and the ultra-fast Bun runtime. Built for ease of integration and secure performance.

### 🔥 Key Features

- **AI-powered Tweet Generation** using ChainGPT's Web3 LLM
- **Scheduled Automated Tweets** via configurable Cron jobs
- **Webhook Integration** with ChainGPT for automatic real-time updates
- **Secure Token Storage** with encryption
- **Automatic Twitter Token Refresh** (OAuth 2.0)
- **TypeScript** for enhanced developer experience and type safety
- **Ultra-fast Bun Runtime** for optimal performance

---

## ⚙️ Requirements

- [Bun Runtime](https://bun.sh) (v1.0 or newer)
- Twitter API credentials (OAuth 2.0) [Generation Guide](./twitterApiSetup.md).
- ChainGPT API Key ([Get one here](https://app.chaingpt.org/apidashboard))
- ChainGPT Credits ([Purchase credits](https://app.chaingpt.org/addcredits))

Each generated tweet consumes 1 ChainGPT credit.

---

## 🔑 Quick Start

### Step 1: Clone and Set Up

```bash
git clone https://github.com/ChainGPT-org/AgenticOS.git
cd AgenticOS

# Install Bun runtime
curl -fsSL https://bun.sh/install | bash

# Install project dependencies
bun install

# Configure your environment
cp .env.example .env
```

### Step 2: Configure `.env`

Update `.env` with your details:

```bash
PORT=8000
NODE_ENV=development

TWITTER_CLIENT_ID=your_twitter_client_id  # generated from Twitter developer portal
TWITTER_CLIENT_SECRET=your_twitter_client_secret # generated from Twitter developer portal

ENCRYPTION_KEY=your_32_character_encryption_key # set a value and keep it secure
ENCRYPTION_SALT=your_hex_encryption_salt # set a value and keep it secure
ENCRYPTION_IV=your_hex_initialization_vector # set a value and keep it secure

CHAINGPT_API_KEY=your_chaingpt_api_key

PASSWORD_AUTH=your_secure_password # API Authentication Password - Required for managing tokens and secure endpoints

```

---

## 🚩 Usage

### Production Mode

```bash
bun build
bun start
```

## Provide Twitter Access and Refresh Tokens

<!-- ### Generate access and refresh tokens

- You can generate Twitter access and refresh tokens using the OAuth 2.0 flow. For detailed instructions, please refer to [Twitter Token Generation Guide](./twitterTokenGeneration.md). then set with

```bash
# Add Twitter tokens to the application
POST <https://your-domain.com>/api/tokens

# Request body
{
  "accessToken": "your_access_token",
  "refreshToken": "your_refresh_token",
  "PASSWORD_AUTH": "your_auth_password_set_in_env"
}
```

# **OR** -->

# 🔐 Obtain Access and Refresh Tokens via Login API

To generate your Access Token and Refresh Token, open the following URL in your browser:

```bash
# Access token Refresh Token Generator
   https://your-domain.com/api/login

```

    ⚠️ Make sure to replace your-domain.com with your actual deployed domain (to deploy you can refer to "One-Click Deployment on Render" section).

## 📅 Automated Tweeting Workflows

### Workflow 1: Scheduled Tweeting (Cron)

there are two methods to schedule tweets

1. Define your schedule in `data/schedule.json`:

```json
{
  "05:10": {
    "type": "market_insight",
    "instruction": "{{persona}} and excellent at spotting key market movements. Create a tweet (less than {{maxLength}} characters) that's a meme about crypto."
  },
  "05:30": {
    "type": "meme",
    "instruction": "{{persona}} and excellent at spotting key market movements. Create a tweet (less than {{maxLength}} characters) that's a meme about crypto."
  }
}
```

2. Edit scheular in dashboard. You can find dashboard at <your_domain>/

   ![Schedule Interface](images/image.png)

Tweets are auto-generated and posted according to this schedule (UTC).

### Workflow 2: ChainGPT Webhook for Live News

**Subscribe to Categories:**

- Get available categories:

```bash
GET https://webapi.chaingpt.org/category-subscription/
Headers:
{
    "api-key": "<your_chainGPT_api_key>"
}
```

- Subscribe to categories:
  you can subscribe to desired categories using their ids

```bash
POST https://webapi.chaingpt.org/category-subscription/subscribe
Headers:
{
    "api-key": "<your_chainGPT_api_key>"
}
Body: { "categoryIds": [2, 3] }
```

**Register Webhook:**

Register your webhook to automatically receive and post updates:

```bash
POST https://your-domain.com}/api/webhook/register
Headers:
{
    "api-key": "<your_chainGPT_api_key>"
}
Body: { "url": "{https://your-domain.com}/api/webhook/" }
```

AgenticOS will automatically post tweets from ChainGPT news updates.

## 🚀 One-Click Deployment on Render

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/nasirfunavry/AgenticOS&branch=dev)

Deploy your Twitter automation app instantly on Render without needing to clone the code manually. Here's how it works:

- **Instant Setup**: Click the deployment button to launch the app — no need to clone the code locally.
- **Schedule Starts Automatically**: Once deployed, the app will begin executing the default `schedule.json` for posting tweets based on preset events.
- **Environment Variables Required**:
  - Set the required `.env` variables (see `.env.example`).
  - These will be prompted during one-click deployment.
- **API Ready**: The app exposes APIs for:
  - Twitter OAuth login ({your_domain/api/login})
  - Access & refresh token management (after login you can save token after verifying password entered during setting env)
  - Webhook registration ({your_domain/api/webhook/})
  - Category subscription (ChainGPT)

## 🔧 Customizing Scheduled Tweets (Optional)

Want to change the timing or tweet content?

1. **Clone the Auto-Created Repo**: After deployment, Render creates a linked GitHub repo under your account.
2. **Update `schedule.json`**:
   - Use UTC time.
   - Provide your desired prompt and timing.
3. **Push Changes**: Commit and push updates to the repo.
4. **Auto-Redeploy**: Wait 1–2 minutes — Render will redeploy automatically.
5. **Reset Access Token**: Call the token API again to reapply your OAuth tokens.

---

## 📚 Project Structure

```
twitter-ai-agent/
├── data/
│   └── schedule.json
├── src/
│   ├── config/
│   ├── controllers/
│   ├── jobs/
│   ├── routes/
│   ├── services/
│   ├── types/
│   ├── utils/
│   └── index.ts
├── .env.example
├── package.json
└── tsconfig.json
```

---

## 🌐 Why Choose Bun?

- 🚀 **Superior Performance**: Faster execution & startup
- 🛠 **Built-in TypeScript & ESM Support**
- 🎯 **Simplified Development**: Integrated tools for testing & bundling
- 📦 **Compatible with npm packages**

---

## 🔐 Security

- Secure encryption of Twitter tokens
- Environment variable validation
- Robust error handling

---

## 🤝 Contributing

Contributions are welcome! Follow these steps:

1. Fork this repository.
2. Create a branch: `git checkout -b feature/my-new-feature`
3. Commit changes: `git commit -am 'Add feature'`
4. Push changes: `git push origin feature/my-new-feature`
5. Open a Pull Request.

---

## 📜 License

**ISC**

## 🧑‍💻 Author

**ChainGPT**

## 📧 Support

Report issues via [GitHub Issues](https://github.com/yourusername/twitter-ai-agent/issues).

🚀 **Happy Coding!**
