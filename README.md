# Insper DataViz Saúde

A React application built with Vite for data visualization in healthcare.

## 🚀 Deployment to GitHub Pages

This project is configured for automatic deployment to GitHub Pages with secure environment variable handling.

### Prerequisites

1. **GitHub Repository**: Make sure your code is pushed to a GitHub repository
2. **Mapbox Token**: You'll need a Mapbox access token for the map functionality

### Setup Steps

#### 1. Environment Variables

**For Local Development:**
Create a `.env.local` file in the root directory:
```bash
VITE_MAPBOX_TOKEN=your_mapbox_token_here
```

**For Production (GitHub Secrets):**
1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the following secret:
   - **Name**: `VITE_MAPBOX_TOKEN`
   - **Value**: Your actual Mapbox token

#### 2. Enable GitHub Pages

1. Go to your GitHub repository
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **Deploy from a branch**
4. Choose **gh-pages** branch
5. Click **Save**

#### 3. Automatic Deployment

The app will automatically deploy when you push to the `main` branch. The GitHub Actions workflow will:
- Build the project with your environment secrets
- Deploy to the `gh-pages` branch
- Make it available at `https://yourusername.github.io/insper-dataviz-saude/`

### Manual Deployment

If you prefer to deploy manually:

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Deploy to GitHub Pages
npm run deploy
```

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔒 Security

- Environment variables are kept secure and never exposed in the client-side code
- The `.env.local` file is automatically ignored by Git
- Production secrets are stored securely in GitHub Secrets
- The build process only includes environment variables prefixed with `VITE_`

## 📁 Project Structure

```
src/
├── components/          # React components
├── assets/             # Static assets
├── data/               # Data files
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
└── App.jsx             # Main app component
```

## 🛠️ Technologies

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **GSAP** - Animation library
- **Mapbox GL** - Interactive maps
- **Tailwind CSS** - Styling
- **GitHub Actions** - CI/CD
