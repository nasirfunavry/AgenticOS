Project Overview
This open-source project provides two key features for automated tweet generation and posting
Scheduled Tweeting with Cron Jobs
Users can define a schedule file containing prompts and specific times for tweet generation.
A cron job will process the schedule, generate a tweet based on the provided prompt, and automatically publish it.
Automated Tweeting via ChainGPT Webhooks
Users can register their webhook with the ChainGPT portal and subscribe to specific news categories.
Whenever ChainGPT publishes news in a subscribed category, the project will receive a relevant tweet and post it automatically.
Requirements
A ChainGPT API key is required for authentication and access to the service.
Each tweet generation consumes 1 credit.
How to generate API key
To use this project, you need a ChainGPT API key. Follow these steps to generate one:
Access the API Dashboard
Go to ChainGPT API Dashboard.
Connect your crypto wallet to authenticate.
Create an API Key
Click on "Create New Key".
Copy and securely store the secret phrase, as it will be required for authentication.
Purchase Credits
Visit ChainGPT Credits.
Buy credits as each tweet generation will consume 1 credit.
Once you have your API key and credits, you can start using the project for automated tweet generation!

Working Steps
Before running the project, follow these steps to set up and execute the workflow.
Load Twitter Access Tokens
Before generating tweets, you need to load your Twitter Access Token and Refresh Token into the project. Use the following API call:
Request:
POST {projectUrl}/api/tokens/
Body:
{
"accessToken": "<your_access_token>",
"refreshToken": "<your_refresh_token>"
}

Once this is done, the project will be able to authenticate and post tweets on your behalf.

Flow 1: Tweet Using Cron Job
In this workflow, tweets are generated based on predefined prompts and times stored in a JSON file.
Step 2: Define Your Schedule
Create a schedule.json file with the following format:
{
"14:30": "The future of AI",
"18:00": "Crypto markets are evolving"
}

time: Must be in UTC format (HH:MM).
prompt: The text that will be used to generate the tweet.
Step 3: Run the Cron Job
The cron job will execute automatically at the specified times, generating tweets using chainGPT tweet generation feature and publishing them to Twitter.

Flow 2: Subscribe to ChainGPT Categories
In this workflow, users can subscribe to specific categories available on ChainGPT. When a news article is published in a subscribed category, the project will automatically generate a tweet and post it to Twitter.
Step 1: Get Available Categories
To see all available categories and your currently subscribed ones, use the following API:
Request:
GET https://appapi.chaingpt.dev/category-subscription/

Headers:
{
"api-key": "<your_api_key>"
}
This will return a list of all categories along with the categories you are currently subscribed to.

Step 2: Subscribe to Categories
To subscribe to one or more categories, send a POST request with the category IDs you want to subscribe to.
Request:
POST https://appapi.chaingpt.dev/category-subscription/subscribe

Headers:
{
"api-key": "<your_api_key>"
}
Body:
{
"categoryIds": [2, 3]
}
Here, 2 and 3 correspond to category id you want to tweet about
Step 3: Register Webhook with ChainGPT
After subscribing to categories, you must register your webhook with ChainGPT. This ensures that whenever a news article is published in a subscribed category, the webhook receives the update and automatically generates a tweet.
Register Webhook
Send a POST request to your project's webhook registration route:
Request:
POST {base_url_of_your_project}/api/webhook/register
Body:
{
"url": "{base_url_of_your_project}/api/webhook/"
}
How It Works:
This registers your webhook URL with ChainGPT.
When ChainGPT publishes news in your subscribed categories, it will send a POST request to your webhook.
The project will process the incoming tweet and post it to Twitter.
With this setup, the entire process is automated, ensuring real-time tweet updates for the latest news in your subscribed categories.

Project Setup Guide 🚀
Prerequisites
Ensure you have the following installed on your system:
Node.js (Latest LTS recommended)
npm (Installed with Node.js)
How to Run the Project
Follow these steps to set up and start the project:

1.  Install Dependencies
    npm install

2.  Start the Project
    Use the following command to start the project:
    npm run start

3.  Configure Environment Variables
    Create a .env file in the project's root directory and add the following fields:
    CLIENT_ID=<your client id>
    CLIENT_SECRET=<your client secret>
    ENCRYPTION_KEY=<your encryption key>
    IV=<characters>
    ENCRYPTION_SALT=<encryption salt>
    WEB_URL=https://appapi.chaingpt.dev

4.  Run the Project
    Once the .env file is set up, restart the project to ensure the environment variables are loaded.
    Now your project should be up and running! 🚀
