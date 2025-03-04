# Twitter AI Agent

A TypeScript-based Twitter bot that automatically generates and posts tweets on a schedule using AI. Built with Hono, TypeScript, and Bun runtime.

## Features

- 🤖 AI-powered tweet generation using ChainGPT
- 📅 Scheduled tweets based on configurable prompts
- 🔒 Secure token storage with encryption
- 🌐 Webhook support for external integrations
- 🔄 Automatic token refresh for Twitter API
- 🚀 Ultra-fast Bun runtime for improved performance
- 📊 TypeScript for type safety and better developer experience

## Prerequisites

- [Bun](https://bun.sh) 1.0+ runtime (faster alternative to Node.js)
- Twitter API credentials (OAuth 2.0)
- ChainGPT API key

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

## Tweet Scheduling

The application uses a schedule defined in `data/schedule.json` to post tweets at specific times. The format is:

```json
{
  "HH:MM": "Prompt for generating tweet content"
}
```

For example:
```json
{
  "09:00": "Create a tweet about the latest crypto news",
  "15:30": "Generate a meme about blockchain technology"
}
```

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

soroojshehryar01@gmail.com

