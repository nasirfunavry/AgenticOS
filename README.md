# ChainGPT Twitter AI Agent

A TypeScript-based Twitter Agent that automatically generates and posts tweets on a schedule using AI. Built with Hono, TypeScript, and Bun runtime.

## 🚀 Project Overview

This open-source project provides two key features for automated tweet generation and posting:

- 🕒 **Scheduled Tweeting with Cron Jobs**: Define a schedule file containing prompts and specific times for tweet generation. A cron job processes the schedule, generates tweets based on the provided prompt, and automatically publishes them.
- 🔗 **Automated Tweeting via ChainGPT Webhooks**: Register your webhook with the ChainGPT portal and subscribe to specific news categories. When ChainGPT publishes news in a subscribed category, the project receives a relevant tweet and posts it automatically.

## Features

- 🤖 AI-powered tweet generation using ChainGPT
- 📅 Scheduled tweets based on configurable prompts
- 🔒 Secure token storage with encryption
- 🌐 Webhook support for external integrations
- 🔄 Automatic token refresh for Twitter API
- 🚀 Ultra-fast Bun runtime for improved performance
- 📊 TypeScript for type safety and better developer experience

## 🛠 Requirements

- [Bun](https://bun.sh) 1.0+ runtime (faster alternative to Node.js)
- Twitter API credentials (OAuth 2.0)
- A ChainGPT API key for authentication and access to the service
- Credits for tweet generation (each tweet consumes 1 credit)

## 🔑 How to Generate a ChainGPT API Key

To use this project, follow these steps:

1. **Access the API Dashboard**
   - Go to the [ChainGPT API Dashboard](https://app.chaingpt.org/apidashboard)
   - Connect your crypto wallet to authenticate

2. **Create an API Key**
   - Click "Create New Key"
   - Copy and securely store the secret phrase (required for authentication)

3. **Purchase Credits**
   - Visit [ChainGPT Credits](https://app.chaingpt.org/addcredits)
   - Buy credits as each tweet generation consumes 1 credit

Once you have your API key and credits, you're ready to start! 🚀

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/twitter-ai-agent.git
   cd twitter-ai-agent
   ```

2. Install Bun if you don't have it already:
   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```

3. Install dependencies with Bun:
   ```bash
   bun install
   ```

4. Create a `.env` file based on the example:
   ```bash
   cp .env.example .env
   ```

5. Fill in your environment variables in the `.env` file:
   ```
   # Server Configuration
   PORT=8000
   NODE_ENV=development

   # Twitter API Credentials
   CLIENT_ID=your_twitter_client_id
   CLIENT_SECRET=your_twitter_client_secret

   # Encryption Settings
   ENCRYPTION_KEY=your_32_character_encryption_key
   ENCRYPTION_SALT=your_hex_encryption_salt
   IV=your_hex_initialization_vector

   # ChainGPT API
   CHAINGPT_API_KEY=your_chaingpt_api_key
   ```

## 🔄 Working Steps

Before running the project, follow these setup steps.

### 🔑 Load Twitter Access Tokens

Before generating tweets, you need to load your Twitter Access Token and Refresh Token into the project.

**Request:**
```
POST {projectUrl}/api/tokens/
```

**Body:**
```json
{
  "accessToken": "<your_access_token>",
  "refreshToken": "<your_refresh_token>"
}
```

Once done, the project can authenticate and post tweets on your behalf.

### 🔁 Tweeting Workflows

#### 📅 Flow 1: Scheduled Tweeting via Cron Job

1. **Define Your Schedule**
   Create a `schedule.json` file in the following format:

   ```json
   {
     "14:30": "The future of AI",
     "18:00": "Crypto markets are evolving"
   }
   ```
   - Time: Must be in UTC format (HH:MM)
   - Prompt: The text used to generate the tweet

2. **Run the Cron Job**
   The cron job executes automatically at the scheduled times, generating tweets using ChainGPT's tweet generation feature and publishing them.

#### 🔔 Flow 2: Tweeting via ChainGPT News Categories

1. **Get Available Categories**
   Retrieve all available categories and your subscribed ones.

   **Request:**
   ```
   GET https://webapi.chaingpt.org/category-subscription/
   ```

   **Headers:**
   ```json
   {
     "api-key": "<your_api_key>"
   }
   ```
   This returns a list of categories along with your current subscriptions.

2. **Subscribe to Categories**
   To subscribe, send a POST request with the category IDs.

   **Request:**
   ```
   POST https://webapi.chaingpt.org/category-subscription/subscribe
   ```

   **Headers:**
   ```json
   {
     "api-key": "<your_api_key>"
   }
   ```

   **Body:**
   ```json
   {
     "categoryIds": [2, 3]
   }
   ```
   (IDs 2 and 3 correspond to the categories you want to tweet about.)

3. **Register Webhook with ChainGPT**
   Register your webhook with ChainGPT to receive updates.

   **Request:**
   ```
   POST {base_url_of_your_project}/api/webhook/register
   ```

   **Body:**
   ```json
   {
     "url": "{base_url_of_your_project}/api/webhook/"
   }
   ```

   **How It Works:**
   - This registers your webhook URL with ChainGPT
   - When ChainGPT publishes news in your subscribed categories, it sends a POST request to your webhook
   - The project processes the tweet and posts it to Twitter

With this setup, the entire process is automated, ensuring real-time tweet updates for the latest news in your subscribed categories!

## Usage

### Development Mode

```bash
bun dev
```

### Production Mode

```bash
bun build
bun start
```

## API Endpoints

### Token Management

- **POST /api/tokens**
  - Load Twitter API tokens
  - Body: `{ "accessToken": "your_access_token", "refreshToken": "your_refresh_token" }`

### Webhook Management

- **POST /api/webhook/register**
  - Register a webhook with ChainGPT
  - Body: `{ "url": "https://your-webhook-url.com" }`

- **POST /api/webhook**
  - Receive a tweet from a webhook and post it
  - Body: `{ "tweet": "Your tweet content" }`

## Project Structure

```
twitter-ai-agent/
├── data/                  # Data storage
│   └── schedule.json      # Tweet schedule configuration
├── src/                   # Source code
│   ├── config/            # Configuration
│   │   └── env.ts         # Environment variables validation
│   ├── controllers/       # API controllers
│   │   ├── token.controller.ts
│   │   └── webhook.controller.ts
│   ├── jobs/              # Scheduled jobs
│   │   └── tweet.job.ts   # Tweet scheduling
│   ├── routes/            # API routes
│   │   ├── index.ts       # Main router
│   │   ├── token.routes.ts
│   │   └── webhook.routes.ts
│   ├── services/          # Business logic
│   │   └── twitter.service.ts
│   ├── types/             # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/             # Utility functions
│   │   └── encryption.ts  # Token encryption
│   └── index.ts           # Application entry point
├── .env                   # Environment variables
├── .env.example           # Example environment variables
├── package.json           # Dependencies and scripts
└── tsconfig.json          # TypeScript configuration
```

## Why Bun?

This project uses Bun instead of Node.js for several key benefits:

- **Improved Performance**: Significantly faster startup and execution times
- **Built-in TypeScript Support**: No need for separate compilation steps
- **Modern JavaScript Features**: First-class support for ESM and top-level await
- **Simplified Development**: Built-in tools for testing, bundling, and running
- **Compatible with Node.js**: Works with most npm packages

## Security

- All Twitter tokens are encrypted using Web Crypto API
- Environment variables are validated at startup
- Proper error handling throughout the application

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

## License

ISC

## Author

ChainGPT 

## 📧 Support

If you encounter any issues or need assistance, feel free to reach out via GitHub issues.

👨‍💻 Happy Coding! 🚀

