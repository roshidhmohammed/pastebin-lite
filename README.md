# Pastebin-Lite
  A minimal Pastebin-like application built with Next.js (App Router) and MongoDB, where users can create text pastes and  share a link to view them.
  The app supports optional expiration (TTL) and view-count limits, and is designed to pass automated tests when deployed on Vercel.

# Instruction to run the project locally

  1. First, run the development server:

```bash
git clone https://github.com/roshidhmohammed/pastebin-lite.git
# 2
cd pastebin-lite
```

   2. Install dependencies:

```bash
npm install
```
   3. Setup Environment variables:
    Create a file named .env.local in the project root:

```bash
NEXT_PUBLIC_BASE_URL=http://localhost:3000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/pastebin  
#mongodb atlas
```

   4. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


# Persistence Layer
MongoDB Atlas is used as the persistence layer.

## Why MongoDB?

- Persistent across serverless requests
- No manual migrations required
- Works well with Vercel
- Simple schema for paste data

## How to create db and cluster on MongoDB Atlas

1. Go to  [https://www.mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Click Sign Up
3. Create an account using email, Google, or GitHub
4. Log in to the MongoDB Atlas dashboard
5. In the Atlas dashboard, click Projects
6. In the Atlas dashboard, click Projects
7. Enter a project name (e.g. pastebin-lite)
8. Click Create Project

## Then Create a cluster:
1. Inside your project, click Build a Database
2. Choose M0 (Free Tier)
3. Select:
    - Cloud Provider: AWS (recommended)
    - Region: choose the closest region
4. Click Create

## After that, create a Databse User:
1. Go to Database Access
2. Click Add New Database User
3. Choose Password authentication
4. Enter:
    - Username (e.g. pastebin_user)
    - Password (save this securely)
5. Click Add User

## Configure Network Access:
1. Configure Network Access
2. Click Add IP Address
3. Choose:
    - Allow Access from Anywhere -  This adds 0.0.0.0/0
4. Click Confirm

## Get the MongoDB Connection String:
1. Go to Database → Connect
2. Choose Connect your application
3. Select:
    - Driver: Any (Recommended compass)
    - Version: latest
4. copy the connection string:

```bash
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

5. Replace:

```bash
<username> → your database username
<password> → your database password
```

## Add Database Name:
Append a database name to the URL (for example pastebin):
```bash
mongodb+srv://pastebin_user:password@cluster0.xxxxx.mongodb.net/pastebin
```

## Configure Environment Variables:
Add the connecion string to the .env.local file of the project

```bash
MONGODB_URI=mongodb+srv://pastebin_user:password@cluster0.xxxxx.mongodb.net/pastebin
```

## Verify the Connection:
Start the app locally using the below command:
```bash
npm run dev
```


