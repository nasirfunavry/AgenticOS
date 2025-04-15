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

TWITTER_CLIENT_ID=your_twitter_client_id
TWITTER_CLIENT_SECRET=your_twitter_client_secret

ENCRYPTION_KEY=your_32_character_encryption_key
ENCRYPTION_SALT=your_hex_encryption_salt
ENCRYPTION_IV=your_hex_initialization_vector

CHAINGPT_API_KEY=your_chaingpt_api_key
```

---

## 🚩 Usage

### Production Mode

```bash
bun build
bun start
```

---

## Provide Twitter Access and Refresh Tokens

### Add tokens to app

```bash
# Add Twitter tokens to the application
POST <your_project_url>/api/tokens

# Request body
{
  "accessToken": "your_access_token",
  "refreshToken": "your_refresh_token"
}
```

### Generate access and refresh tokens

If you require quick code to generate twitter tokens then use below code

```bash
# Imports
import express from "express";
import axios from "axios";
import crypto from "crypto";
import querystring from "querystring";
import session from "express-session";
import { Buffer } from "buffer";
```

after downloading and importing packages we need to make some necessary configurations

```bash
# congigurations
type Request = express.Request;
type Response = express.Response;

declare module "express-session" {
  interface Session {
    codeVerifier: string;
  }
}

interface TwitterTokens {
  access_token: string;
  refresh_token: string;
}

# Configuration
const config = {
  clientId: "your client id",
  clientSecret: "your client secret",
  redirectUri: "redirect url",
  port: 8000,
  sessionSecret: "session secret",
};

# Initialize Express app
const app = express();

# Session middleware
app.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true,
  })
);

```

Now we setup generatePKCE

```bash
# Generate PKCE code verifier and challenge
const generatePKCE = (): { codeVerifier: string; codeChallenge: string } => {
  const codeVerifier = crypto.randomBytes(32).toString("base64url");
  const codeChallenge = crypto
    .createHash("sha256")
    .update(codeVerifier)
    .digest("base64url");
  return { codeVerifier, codeChallenge };
};
```

Following login endpoint can be used to login to twitter, after that login tokens will be generated in callcaback endpoint

```bash
# Login route - initiates OAuth flow
app.get("/login", (req: Request, res: Response): void => {
  const { codeVerifier, codeChallenge } = generatePKCE();
  const state = crypto.randomBytes(16).toString("hex");

  # Store code verifier in session
  req.session.codeVerifier = codeVerifier;

  const authorizationUrl = `https://twitter.com/i/oauth2/authorize?${querystring.stringify(
    {
      response_type: "code",
      client_id: config.clientId,
      redirect_uri: config.redirectUri,
      scope: "tweet.read users.read tweet.write offline.access",
      state,
      code_challenge: codeChallenge,
      code_challenge_method: "S256",
    }
  )}`;

  res.redirect(authorizationUrl);
});
```

follwoing callback will be called after /login

```bash
app.get("/callback", async (req: Request, res: Response): Promise<void> => {
  const code = req.query.code as string;
  const codeVerifier = req.session.codeVerifier;

  if (!code || !codeVerifier) {
    res.status(400).send("Authorization failed: Missing code or verifier");
    return;
  }

  const basicAuth = Buffer.from(
    `${config.clientId}:${config.clientSecret}`
  ).toString("base64");

  try {
    const response = await axios.post<TwitterTokens>(
      "https://api.twitter.com/2/oauth2/token",
      querystring.stringify({
        code,
        client_id: config.clientId,
        redirect_uri: config.redirectUri,
        code_verifier: codeVerifier,
        grant_type: "authorization_code",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${basicAuth}`,
        },
      }
    );

    const { access_token, refresh_token } = response.data;
    console.log(
      `Access and refresh tokens received: ${JSON.stringify(
        { access_token, refresh_token },
        null,
        2
      )}`
    );
    res.send(
      `Access and refresh tokens received: ${JSON.stringify(
        { access_token, refresh_token },
        null,
        2
      )}`
    );
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      res
        .status(500)
        .send(
          `Error during the token exchange: ${JSON.stringify(
            error.response?.data || error.message
          )}`
        );
    } else {
      res.status(500).send("An unexpected error occurred");
    }
  }
});
```

Starting server

```bash
# Start the server
app.listen(config.port, () => {
  console.log(
    `Access and Refresh Token Generator listening on port ${config.port}`
  );
});
```

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
