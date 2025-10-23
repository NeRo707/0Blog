# Installation Guide

This guide will help you set up **0blog** on your local development environment.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **pnpm** (v8.0.0 or higher) - Package manager
- **Git** - Version control
- **Appwrite** account - Backend services
- **Clerk** account - Authentication

### Check Your Installation

```bash
node --version  # Should be 18.0.0+
pnpm --version  # Should be 8.0.0+
git --version
```

### Install pnpm (if needed)

```bash
npm install -g pnpm
```

## Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd Project0
```

## Step 2: Install Dependencies

Using pnpm (recommended):

```bash
pnpm install
```

This will install all dependencies defined in `package.json` and generate a `pnpm-lock.yaml` file.

## Step 3: Set Up Appwrite Backend

### 3.1 Create Appwrite Project

1. Go to [Appwrite Console](https://cloud.appwrite.io/)
2. Create a new project
3. Note down your:
   - Endpoint URL (usually `https://cloud.appwrite.io/v1`)
   - Project ID

### 3.2 Create Database and Collection

1. Navigate to **Databases** → Create new database
2. Note the **Database ID**
3. Create a collection named "blogs" with the following attributes:

| Attribute   | Type    | Size | Required | Array | Default |
|-------------|---------|------|----------|-------|---------|
| title       | String  | 255  | Yes      | No    | -       |
| excerpt     | String  | 500  | Yes      | No    | -       |
| content     | String  | 10000| No       | No    | -       |
| image       | String  | 500  | Yes      | No    | -       |
| author      | String  | 100  | Yes      | No    | -       |
| authorId    | String  | 100  | Yes      | No    | -       |
| date        | String  | 50   | Yes      | No    | -       |
| category    | String  | 50   | Yes      | No    | -       |
| readTime    | String  | 20   | Yes      | No    | -       |

4. Note the **Collection ID**

### 3.3 Create Storage Bucket

1. Navigate to **Storage** → Create bucket
2. Name it "blog-images" (or your preference)
3. Configure permissions:
   - Read access: `Any`
   - Create access: `Users` (authenticated users)
   - Update/Delete: `Users` (authenticated users)
4. Set file size limit (e.g., 5MB for images)
5. Allowed file extensions: `jpg, jpeg, png, gif, webp`
6. Note the **Bucket ID**

### 3.4 Configure Permissions

For the blogs collection, set these permissions:

- **Create:** `role:all` (anyone can create)
- **Read:** `role:all` (anyone can read)
- **Update:** `document.authorId` (only author can update)
- **Delete:** `document.authorId` (only author can delete)

## Step 4: Set Up Clerk Authentication

### 4.1 Create Clerk Application

1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Create a new application
3. Choose authentication methods (Email, Google, GitHub, etc.)
4. Note your **Publishable Key**

### 4.2 Configure Clerk Settings

1. Enable the authentication providers you want
2. Configure redirect URLs:
   - Sign-in URL: `http://localhost:5173/sign-in`
   - Sign-up URL: `http://localhost:5173/sign-up`
   - After sign-in: `http://localhost:5173/dashboard`
   - After sign-up: `http://localhost:5173/dashboard`

## Step 5: Environment Variables

Create a `.env` file in the project root:

```bash
# Copy the example file
cp .env.example .env
```

Or create manually with the following content:

```env
# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_key_here

# Appwrite Configuration
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id_here
VITE_APPWRITE_DATABASE_ID=your_database_id_here
VITE_APPWRITE_BLOGS_COLLECTION_ID=your_collection_id_here
VITE_APPWRITE_BUCKET_ID=your_bucket_id_here
```

**Important:** 
- All environment variables must be prefixed with `VITE_` to be accessible in the client
- Never commit `.env` to version control
- Create `.env.example` with placeholder values for team members

## Step 6: Verify Installation

Run the type checker:

```bash
pnpm run build
```

This runs TypeScript compiler and Vite build. If successful, you're ready to develop!

## Step 7: Start Development Server

```bash
pnpm dev
```

The application will start at `http://localhost:5173`

You should see:
```
VITE v7.1.7  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

## Verification Checklist

- [ ] Node.js and pnpm installed
- [ ] Dependencies installed successfully
- [ ] Appwrite project created
- [ ] Database and collection configured
- [ ] Storage bucket created
- [ ] Clerk application set up
- [ ] `.env` file configured with all keys
- [ ] `pnpm dev` runs without errors
- [ ] Can access app at `http://localhost:5173`
- [ ] Can sign up/sign in with Clerk
- [ ] Can create a test blog post

## Common Installation Issues

### pnpm install fails

```bash
# Clear cache and retry
pnpm store prune
pnpm install
```

### Type errors during build

```bash
# Ensure TypeScript is installed
pnpm add -D typescript@~5.9.3

# Clean and rebuild
rm -rf node_modules/.vite
pnpm run build
```

### Environment variables not loading

- Ensure all variables are prefixed with `VITE_`
- Restart the dev server after changing `.env`
- Check for typos in variable names

### Appwrite connection errors

- Verify endpoint URL is correct
- Check project ID matches your Appwrite project
- Ensure your Appwrite project is active

## Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [Appwrite Documentation](https://appwrite.io/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [pnpm Documentation](https://pnpm.io/)
