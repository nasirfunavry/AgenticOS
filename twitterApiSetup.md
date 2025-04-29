## 🔑 Twitter API Setup Guide (OAuth 2.0)

To run this application, you’ll need to obtain Twitter API credentials using **OAuth 2.0**. Follow the steps below to generate your **Client ID** and **Client Secret**.

---

### 🔗 Twitter Developer Portal

➡ **Link:** [https://developer.twitter.com/en/portal/dashboard](https://developer.twitter.com/en/portal/dashboard)

---

### ✅ Step-by-Step Instructions

1. **Log in to the Twitter Developer Portal**

   Go to the [Twitter Developer Dashboard](https://developer.twitter.com/en/portal/dashboard) and sign in with your Twitter account.

2. **Create a New Project & App**

   - Navigate to: `Projects & Apps > Overview`
   - Click **"Create App"**
   - Provide an app name and select **OAuth 2.0** as the authentication method

3. **Configure OAuth 2.0 Settings**

   - Go to your app's **Settings** tab
   - Under **OAuth 2.0**, configure:
   - **Callback URL:**  
      `https://your-domain.com/api/callback` — *Replace `your-domain.com` with your actual domain. It must match exactly as configured in the Twitter Developer Portal.*
     - **Website URL:**  
       `https://your-deployment-url.com`
     - **Client Type:** Confidential
     - **Scopes (Permissions):**
       - `tweet.read`
       - `tweet.write`
       - `users.read`
       - `offline.access` *(required for refresh tokens)*

   - Save the changes.

4. **Generate OAuth 2.0 Credentials**

   - Navigate to the **Keys and Tokens** tab
   - Click **"Generate"** under **OAuth 2.0 Client ID and Client Secret**
   - Copy and store the credentials securely.

---

### 🧪 Add to Environment Variables

- Paste your credentials in the `.env` file like you      
- During one-click deployment, you'll be asked to enter these credentials as environment variables.



below:

```env
TWITTER_CLIENT_ID=your_client_id_here
TWITTER_CLIENT_SECRET=your_client_secret_here

