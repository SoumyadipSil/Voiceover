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
- pnpm

## Getting Started

### Requirements

- Node.js
- pnpm

### Installation

```bash
pnpm install
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

This is a front-end prototype. Authentication, voice generation, downloads, billing, and account actions currently use local state and sample data. A backend, database, and production voice-generation service are not connected yet.

## Design References

The project includes inactive Stitch/Figma design exports under `src/imports`. They are excluded from Git through `.gitignore`; the maintained implementation lives in `src/pages` and `src/components`.
