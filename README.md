# TODO_IETE_REACTOR

A modern, feature-rich To-Do List web application built with **React.js**, **TypeScript**, and **Tailwind CSS**, leveraging **Supabase** for authentication and database management. Hosted on **Netlify**.

## Features

- **User Authentication**: Sign up and login with email/password
- **OAuth Support**: Login using Google/GitHub
- **Task Management**: Add, remove, and edit tasks
- **Priority Setting**: Assign priority levels to tasks
- **Task Organization**: Group tasks into categories
- **Dark Mode**: Toggle between light and dark themes

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

The app is hosted on **Netlify**. To deploy:

1. Push your changes to GitHub.
2. Connect the repository to Netlify.
3. Configure environment variables in Netlify settings.
4. Deploy the site!

