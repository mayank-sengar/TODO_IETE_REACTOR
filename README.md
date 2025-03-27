# TODO_IETE_REACTOR

A modern, feature-rich To-Do List web application built with **React.js**, **TypeScript**, and **Tailwind CSS**, leveraging **Supabase** for authentication and database management. Hosted on **Netlify**.

## Features

- **User Authentication**: Sign up and login with email/password using Supabase.  
- **OAuth Support**: Login using Google and GitHub for seamless authentication.  
- **Task Management**: Add, remove, edit, and mark tasks as completed or active.  
- **Priority Setting**: Assign priority levels (low, medium, high) to tasks for better organization.  
- **Task Organization**: Group tasks into customizable categories (e.g., personal, work, shopping).  
- **Dark Mode**: Toggle between light and dark themes for a personalized user experience.  
- **Offline Support**: Access tasks offline with IndexedDB integration.  
- **Real-Time Updates**: Automatically sync tasks across devices using Supabase's real-time capabilities.  


## Tech Stack

- **Frontend**: React.js, TypeScript, Tailwind CSS
- **Backend & Database**: Supabase
- **Hosting**: Netlify
- **Version Control**: Git & GitHub

## Project Setup

### Prerequisites

- **Node.js** and **npm** installed
- Supabase project setup with API keys

### Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following keys:

```env
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
VITE_SUPABASE_URL=your_supabase_url_here

VITE_REDIRECT_URL=http://localhost:5173

VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
VITE_GOOGLE_CLIENT_SECRET=your_google_client_secret_here
```

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the development server:
   ```sh
   npm run dev
   ```

## Deployment


### Deploying to Netlify

1. **Fork or Clone the Repository**:  
   Ensure you have the repository cloned locally or forked to your GitHub account.

2. **Connect GitHub Repository to Netlify**:

   - Log in to [Netlify](https://www.netlify.com/).
   - Click on "New site from Git".
   - Select your GitHub repository.
   - Choose the branch you want to deploy (e.g., `main`).

3. **Set Environment Variables**:  
   In the Netlify dashboard:

   - Go to "Site Settings" > "Environment Variables".
   - Add the following variables:
     ```
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
     VITE_SUPABASE_URL=your_supabase_url_here
     VITE_REDIRECT_URL=https://your-netlify-site-url/dashboard
     VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
     VITE_GOOGLE_CLIENT_SECRET=your_google_client_secret_here
     ```

4. **Build Settings**:

   - Set the build command to `npm run build`.
   - Set the publish directory to `dist`.

5. **Deploy**:

   - Click "Deploy Site" to start the deployment process.

6. **Verify Deployment**:
   - Once deployed, visit your Netlify site URL to verify the app is working as expected.

### Notes

- Ensure the `VITE_REDIRECT_URL` matches the redirect URL configured in your Supabase project.
- For local development, use `http://localhost:5173` as the `VITE_REDIRECT_URL`.

