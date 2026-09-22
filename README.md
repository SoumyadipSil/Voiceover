# Voiceover SaaS

A React + Vite + Tailwind CSS voiceover studio prototype. The app lets a visitor explore the product, sign up or log in through a local demo flow, generate a sample voiceover in the studio UI, view history, manage billing, and edit settings.

## Run Locally

This repository uses pnpm because it includes `pnpm-lock.yaml`.

```powershell
pnpm install
pnpm dev
```

Open `http://localhost:8443/` in a browser.

Useful commands:

```powershell
pnpm build       # production build and type-check through Vite
pnpm preview     # serve the production build locally
pnpm format      # format files with oxfmt
```

## Project Structure

```text
.
├── index.html                 # Vite HTML shell; mounts the React app at #root
├── package.json               # scripts and dependencies
├── pnpm-lock.yaml             # locked dependency versions
├── vite.config.ts             # Vite, React, Tailwind, and Figma Make configuration
├── .figma/make/site.json      # Figma Make site metadata used during build
└── src/
    ├── main.tsx               # React entrypoint
    ├── App.tsx                # top-level page state and authenticated app shell
    ├── index.css              # Tailwind import, theme tokens, global styles, animations
    ├── components/
    │   ├── PaywallModal.tsx   # upgrade modal shown when the free limit is reached
    │   ├── ShaderBackground.tsx # WebGL animated background used by the landing hero
    │   └── Sidebar.tsx        # authenticated navigation and usage meter
    ├── pages/
    │   ├── Landing.tsx        # public marketing/home page
    │   ├── Auth.tsx           # local login and signup form
    │   ├── Dashboard.tsx      # voiceover generation workspace
    │   ├── History.tsx        # generated audio history list
    │   ├── Billing.tsx        # plan comparison and usage display
    │   └── Settings.tsx       # profile, password, email, and account settings
    └── imports/
        ├── code.html          # standalone SVG logo asset saved with an HTML extension
        ├── code-1.html        # large landing-page design export
        ├── code-2.html        # large studio/dashboard design export
        ├── code-3.html        # standalone full-screen shader demo
        └── DESIGN.md          # visual design system and component guidance
```

## How the App Starts

1. `index.html` provides the `#root` element and loads `src/main.tsx`.
2. `src/main.tsx` imports global styles and renders `<App />` inside `React.StrictMode`.
3. `src/App.tsx` owns the top-level `page` and `authed` state. There is no React Router yet; navigation is a state switch.
4. New visitors start on `Landing`.
5. The landing page calls `onGetStarted` or `onLogin`, which changes the page state to `signup` or `login`.
6. `Auth` currently simulates a successful request with a short timeout. On success, `App` marks the user authenticated and opens the dashboard.
7. Authenticated pages render inside `AppShell`, which adds the sidebar, header, search field, avatar, and page content.
8. `Sidebar` changes the current authenticated page between dashboard, history, billing, and settings.
9. `Dashboard` and the sidebar can open `PaywallModal`. The modal can send the user to `Billing`.

This is currently a front-end prototype. Forms, generation, downloads, billing, and account actions use local state or demo data; there is no backend or persistent database connected.

## What Each Active Page Does

### `Landing.tsx`

The public first page. It contains the hero copy and calls to action, the animated WebGL shader background, the dashboard-style audio preview, the statistics band, feature steps, voice showcase, pricing cards, and FAQ sections.

### `Auth.tsx`

A shared login/signup screen. It stores form fields locally and uses a timeout to imitate a request. Any submitted form currently succeeds and calls back to `App`.

### `Dashboard.tsx`

The main voiceover workspace. It contains the script editor, voice selection, emotion and generation controls, waveform/player UI, and sample output. It can show the paywall when the one-minute free preview limit is reached.

### `History.tsx`

Displays hard-coded generation records. The search field filters entries by script text or voice name.

### `Billing.tsx`

Displays the Free, Creator, and Studio plans. Selecting an upgrade calls the parent callback, which opens the existing paywall flow.

### `Settings.tsx`

Provides local profile fields, password fields, email notification toggles, and a delete-account presentation. Changes are not persisted to a server.

## What the Four Large HTML Files Are

The files in `src/imports` are design/source exports from the earlier Figma Make or Stitch workflow. They are not imported by `main.tsx`, `App.tsx`, or any active React page, so Vite does not render them as application routes. They remain useful as visual references and as a source for design ideas.

### `code.html`

Despite the `.html` extension, this file contains only an inline SVG logo. It is an exported logo mark, not a page and not an active dependency.

### `code-1.html`

A complete static landing-page export. It includes:

- page-level Tailwind CDN configuration and Google font links
- the hero section and calls to action
- a WebGL shader canvas marked `STITCH_SHADER_START:ANIMATION_2`
- an audio waveform/player mockup
- trust statistics
- how-it-works cards
- voice showcase cards
- feature and workflow sections
- pricing cards and billing controls
- FAQ content
- large inline JavaScript handlers for the static interactions

It is huge because the entire page, styling, inline SVGs, content, and interaction scripts were exported into one HTML document. The current React `Landing.tsx` is the maintained implementation of this idea.

### `code-2.html`

A complete static studio/dashboard export. It contains the larger workstation concept, including:

- a studio action bar and project metadata
- script editor area
- neural voice model cards
- language filters
- generation controls
- audio inspector and waveform controls
- paywall modal markup
- inline event handlers and static demo data

The current React equivalents are mainly `Dashboard.tsx`, `Sidebar.tsx`, and `PaywallModal.tsx`.

### `code-3.html`

A minimal standalone shader test page. It has almost no product UI: it fills the viewport with a `<canvas>` and runs the WebGL shader animation from the exported design. The shader creates animated radial harmonics with dark obsidian, cyan, and teal colors and tracks pointer position.

That shader was adapted into the active React component `src/components/ShaderBackground.tsx`, which is mounted behind the hero in `Landing.tsx`.

## Active vs Reference Code

The active runtime path is:

```text
index.html
  -> src/main.tsx
    -> src/App.tsx
      -> Landing / Auth / AppShell
        -> Dashboard / History / Billing / Settings
        -> Sidebar / PaywallModal
      -> ShaderBackground (inside Landing)
```

The `src/imports/*.html` files are reference exports. Keeping them does not make them run, and removing them is not required for the current app. They can be converted into React pieces later if a specific design or interaction from them is needed.

## Styling

`src/index.css` contains the Tailwind CSS v4 import, design tokens, typography, colors, reusable button/input classes, grid background utility, shader-era glow styles, and animation keyframes. Most page-specific layout is written directly in JSX with Tailwind classes and inline style objects.

The visual system uses a dark audio-studio palette with electric cyan and mint accents. The current landing hero uses the shader background rather than the older CSS grid background; the grid utility still exists for other screens such as authentication.
