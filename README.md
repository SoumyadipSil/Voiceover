# Voiceover

AI voiceover studio for creators producing narration in English, Hindi, and Bengali.

Voiceover turns a script into polished narration with a focused creator workflow: choose a voice, tune the delivery, preview the waveform, and export the result.

## Features

- Landing page with animated WebGL shader background
- Script-to-voiceover studio interface
- English, Hindi, and Bengali voice options
- Voice style and emotion controls
- Audio waveform preview and playback controls
- Generation history
- Billing plans and upgrade flow
- Account settings
- Responsive dark audio-studio interface

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- WebGL shader background
- Client-side routing with React Router
- pnpm

## Getting Started

### Requirements

- Node.js
- pnpm

### Installation

```bash
pnpm install
```

### Supabase Configuration

Copy `.env.example` to `.env.local` and add the public URL and anon key from your Supabase project:

```bash
cp .env.example .env.local
```

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Server-only TTS keys. Never expose these with a VITE_ prefix.
NVIDIA_API_KEY=your-nvidia-api-key
OPENROUTER_API_KEY=your-openrouter-api-key
# Optional for self-hosted NVIDIA NIM:
# NVIDIA_TTS_URL=https://ai.api.nvidia.com/v1/audio/speech
```

For Vercel, add the Supabase variables in **Project Settings > Environment Variables** for Preview and Production deployments. Add the NVIDIA and OpenRouter keys there as server-only variables. Never expose a provider key or Supabase service-role key in this frontend application.

In Supabase Authentication settings, configure the site URL and add these redirect URLs:

```text
http://localhost:8443/**
https://your-production-domain.vercel.app/**
```

### Development

```bash
pnpm dev
```

Open [http://localhost:8443](http://localhost:8443) in your browser.

### Production Build

```bash
pnpm build
```

### Preview the Production Build

```bash
pnpm preview
```

### Formatting

```bash
pnpm format
```

## Project Structure

```text
src/
├── main.tsx                 # Application entrypoint
├── App.tsx                  # Page state and authenticated app shell
├── index.css                # Global styles and design tokens
├── components/
│   ├── PaywallModal.tsx     # Upgrade modal
│   ├── ShaderBackground.tsx # WebGL hero background
│   └── Sidebar.tsx          # Authenticated navigation
├── pages/
│   ├── Landing.tsx          # Public landing page
│   ├── Auth.tsx             # Login and signup UI
│   ├── Dashboard.tsx        # Voiceover workspace
│   ├── History.tsx          # Generation history
│   ├── Billing.tsx          # Plans and usage
│   └── Settings.tsx         # Account settings
└── imports/
    └── DESIGN.md            # Visual design reference
```

## Current Status

Supabase email/password authentication and session persistence are wired in when environment variables are configured. Speech generation now uses the server-side `/api/speech` proxy with NVIDIA Magpie Zero-Shot as the primary model and OpenRouter Fish Audio and Deepgram Flux as alternatives. History persistence, billing, and account actions still require a production application database and billing integration.

### Speech Provider Setup

- NVIDIA Magpie Zero-Shot requires NVIDIA API access and a short clean reference audio sample. The browser sends the sample to `/api/speech`; the provider key remains server-side.
- OpenRouter Fish Audio uses its provider voice identifier and accepts text-only MP3 generation.
- OpenRouter Deepgram Flux exposes the supported `flux-*-en` voice identifiers in the voice picker.
- The provider endpoint returns raw audio bytes. The client creates a temporary browser audio URL for playback.
- For local Vercel API testing, use `vercel dev` so `/api/speech` is available alongside the Vite app. `npm run dev` alone only serves the frontend.

## Routes

The app currently exposes these client-side routes:

| Route | Description |
| --- | --- |
| `/` | Public landing page |
| `/login` | Login screen |
| `/signup` | Signup screen |
| `/dashboard` | Voiceover workspace |
| `/history` | Generation history |
| `/billing` | Plans and usage |
| `/settings` | Account settings |

Dashboard routes use the demo authentication state. Complete the signup or login flow first, then open the authenticated route.

When deploying to a static host, configure a rewrite so unknown paths serve `index.html`. This is required for browser refreshes on routes such as `/dashboard` and `/settings`.

## Design References

The project includes inactive Stitch/Figma design exports under `src/imports`. They are excluded from Git through `.gitignore`; the maintained implementation lives in `src/pages` and `src/components`.
