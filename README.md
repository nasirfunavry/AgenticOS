# AgenticOS – Your AI Agent for Web3 on X (Twitter)

**Built by ChainGPT**

AgenticOS lets you effortlessly create and deploy your own intelligent AI agent on X (formerly Twitter)—purpose-built for the Web3 ecosystem. Automate tasks like real-time market research, breaking crypto news, token analysis, and community engagement, enhancing your digital presence with 24/7 AI-driven insights.

📌 **Live Demo**: [ChainGPT AI on X](https://x.com/ChainGPTAI)

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
- Twitter API credentials (OAuth 2.0)
- ChainGPT API Key ([Get one here](https://app.chaingpt.org/apidashboard))
- ChainGPT Credits ([Purchase credits](https://app.chaingpt.org/addcredits))

Each generated tweet consumes 1 ChainGPT credit.

---

## 🔑 Quick Start

### Step 1: Clone and Set Up
```bash
git clone https://github.com/yourusername/twitter-ai-agent.git
cd twitter-ai-agent

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

CLIENT_ID=your_twitter_client_id
CLIENT_SECRET=your_twitter_client_secret

ENCRYPTION_KEY=your_32_character_encryption_key
ENCRYPTION_SALT=your_hex_encryption_salt
IV=your_hex_initialization_vector

CHAINGPT_API_KEY=your_chaingpt_api_key
```

---

## 🚩 Usage

### Development Mode
```bash
bun dev
```

### Production Mode
```bash
bun build
bun start
```

---

## 📅 Automated Tweeting Workflows

### Workflow 1: Scheduled Tweeting (Cron)

Define your schedule in `data/schedule.json`:
```json
{
  "14:30": "The future of AI in Web3",
  "18:00": "Crypto markets update"
}
```

Tweets are auto-generated and posted according to this schedule (UTC).

### Workflow 2: ChainGPT Webhook for Live News

**Subscribe to Categories:**
- Get available categories:
```bash
GET https://webapi.chaingpt.org/category-subscription/
```

- Subscribe to categories:
```bash
POST https://webapi.chaingpt.org/category-subscription/subscribe

Body: { "categoryIds": [2, 3] }
```

**Register Webhook:**

Register your webhook to automatically post updates:
```bash
POST {your_project_url}/api/webhook/register

Body: { "url": "{your_project_url}/api/webhook/" }
```

AgenticOS will automatically post tweets from ChainGPT news updates.

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
