# 📢 Automated Tweeting with ChainGPT

## 🚀 Project Overview
This open-source project provides two key features for automated tweet generation and posting:

### 🕒 Scheduled Tweeting with Cron Jobs
- Users define a schedule file containing prompts and specific times for tweet generation.
- A cron job processes the schedule, generates tweets based on the provided prompt, and automatically publishes them.

### 🔗 Automated Tweeting via ChainGPT Webhooks
- Users register their webhook with the ChainGPT portal and subscribe to specific news categories.
- When ChainGPT publishes news in a subscribed category, the project receives a relevant tweet and posts it automatically.

---
## 🛠 Requirements
- A **ChainGPT API key** is required for authentication and access to the service.
- **Each tweet generation consumes 1 credit.**

---
## 🔑 How to Generate a ChainGPT API Key
To use this project, follow these steps:

### 1️⃣ Access the API Dashboard
- Go to the **[ChainGPT API Dashboard](https://app.chaingpt.org/apidashboard)**.
- Connect your crypto wallet to authenticate.

### 2️⃣ Create an API Key
- Click **"Create New Key"**.
- Copy and securely store the secret phrase (required for authentication).

### 3️⃣ Purchase Credits
- Visit **[ChainGPT Credits](https://app.chaingpt.org/addcredits)**.
- Buy credits as **each tweet generation consumes 1 credit**.

Once you have your API key and credits, you're ready to start! 🚀

---
## 🔄 Working Steps
Before running the project, follow these setup steps.

### 🔑 Load Twitter Access Tokens
Before generating tweets, you need to load your Twitter Access Token and Refresh Token into the project.

**Request:**
```http
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

---
## 🔁 Tweeting Workflows
### 📅 Flow 1: Scheduled Tweeting via Cron Job
#### 1️⃣ Define Your Schedule
Create a `schedule.json` file in the following format:
```json
{
  "14:30": "The future of AI",
  "18:00": "Crypto markets are evolving"
}
```
- **Time:** Must be in **UTC format** (`HH:MM`).
- **Prompt:** The text used to generate the tweet.

#### 2️⃣ Run the Cron Job
The cron job executes automatically at the scheduled times, generating tweets using ChainGPT's tweet generation feature and publishing them.

---
### 🔔 Flow 2: Tweeting via ChainGPT News Categories
#### 1️⃣ Get Available Categories
Retrieve all available categories and your subscribed ones.

**Request:**
```http
GET https://webapi.chaingpt.org/category-subscription/
```
**Headers:**
```json
{
  "api-key": "<your_api_key>"
}
```
This returns a list of categories along with your current subscriptions.

#### 2️⃣ Subscribe to Categories
To subscribe, send a `POST` request with the category IDs.

**Request:**
```http
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
*(IDs 2 and 3 correspond to the categories you want to tweet about.)*

#### 3️⃣ Register Webhook with ChainGPT
Register your webhook with ChainGPT to receive updates.

**Request:**
```http
POST {base_url_of_your_project}/api/webhook/register
```
**Body:**
```json
{
  "url": "{base_url_of_your_project}/api/webhook/"
}
```
#### 🔹 How It Works:
- This registers your webhook URL with ChainGPT.
- When ChainGPT publishes news in your subscribed categories, it sends a `POST` request to your webhook.
- The project processes the tweet and posts it to Twitter.

🔹 *With this setup, the entire process is automated, ensuring real-time tweet updates for the latest news in your subscribed categories!*

---
## 📌 Project Setup Guide
### ✅ Prerequisites
Ensure the following are installed on your system:
- **Node.js** (Latest LTS recommended)
- **npm** (Installed with Node.js)

### 📥 How to Run the Project
#### 1️⃣ Install Dependencies
```bash
npm install
```
#### 2️⃣ Start the Project
```bash
npm run start
```
#### 3️⃣ Configure Environment Variables
Create a `.env` file in the project's root directory and add the following fields:
```ini
CLIENT_ID=<your_client_id>
CLIENT_SECRET=<your_client_secret>
ENCRYPTION_KEY=<your_encryption_key>
IV=<characters>
ENCRYPTION_SALT=<encryption_salt>
WEB_URL=https://webapi.chaingpt.org
```
#### 4️⃣ Run the Project
Once the `.env` file is set up, restart the project to load environment variables.

🎉 **Now your project is up and running!** 🚀

## 📧 Support
If you encounter any issues or need assistance, feel free to reach out via GitHub issues.

👨‍💻 **Happy Coding!** 🚀

