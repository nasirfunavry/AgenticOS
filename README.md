Project Setup Guide
Prerequisites
Node.js (Latest LTS version recommended)
npm (comes with Node.js)

Installation Steps
Install Dependencies:
npm install

Start the Project:
npm run start

Configure Environment Variables:
Create a .env file in the project's root directory.
Add the following fields:
CLIENT_ID=<your_client_id>
CLIENT_SECRET=<your_client_secret>
ENCRYPTION_KEY=<your_encryption_key>
IV=<initialization_vector>
ENCRYPTION_SALT=<encryption_salt>
WEB_URL=https://appapi.chaingpt.dev

Run the Project:
After setting up the .env file, restart the project to load the environment variables.
Your project should now be operational, automating tweet generation and posting based on your configurations.
