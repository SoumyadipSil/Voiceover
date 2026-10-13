---
name: Obsidian Wave
colors:
  surface: '#121318'
  surface-dim: '#121318'
  surface-bright: '#38393f'
  surface-container-lowest: '#0d0e13'
  surface-container-low: '#1a1b21'
  surface-container: '#1e1f25'
  surface-container-high: '#292a2f'
  surface-container-highest: '#34343a'
  on-surface: '#e3e1e9'
  on-surface-variant: '#bac9cb'
  inverse-surface: '#e3e1e9'
  inverse-on-surface: '#2f3036'
  outline: '#859395'
  outline-variant: '#3b494b'
  surface-tint: '#24dbe8'
  primary: '#48effc'
  on-primary: '#00363a'
  primary-container: '#00d2df'
  on-primary-container: '#00565b'
  inverse-primary: '#006970'
  secondary: '#47fdd0'
  on-secondary: '#00382b'
  secondary-container: '#00e0b4'
  on-secondary-container: '#005e4a'
  tertiary: '#d7d6ff'
  on-tertiary: '#1000a9'
  tertiary-container: '#b6b8ff'
  on-tertiary-container: '#3636c4'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#7cf4ff'
  primary-fixed-dim: '#24dbe8'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#47fdd0'
  secondary-fixed-dim: '#00e0b4'
  on-secondary-fixed: '#002118'
  on-secondary-fixed-variant: '#00513f'
  tertiary-fixed: '#e1e0ff'
  tertiary-fixed-dim: '#c0c1ff'
  on-tertiary-fixed: '#07006c'
  on-tertiary-fixed-variant: '#2f2ebe'
  background: '#121318'
  on-background: '#e3e1e9'
  surface-variant: '#34343a'
  surface-base: '#090A0F'
  surface-subtle: '#0D0F17'
  surface-card: '#131722'
  surface-overlay: '#181D2B'
  border-subtle: '#1E2333'
  border-prominent: '#2A3147'
  text-primary: '#F9FAFB'
  text-secondary: '#94A3B8'
  text-muted: '#64748B'
  accent-glow: rgba(0, 210, 223, 0.15)
  accent-hover: '#00F2FE'
  status-recording: '#EF4444'
  status-rendering: '#F59E0B'
typography:
  display-xl:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.03em
  display-xl-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.025em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 26px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: -0.005em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0em
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
  code-mono:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: -0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system embodies the precision, technical mastery, and developer-grade polish popularized by contemporary digital craft exemplars (Linear, Vercel, Cal.com). Crafted for modern digital creators, voice actors, and media engineers producing studio-fidelity synthetic voice content across South Asian and global languages, the interface prioritizes hyper-efficient production flows, pristine readability, and quiet confidence.

The visual style merges structured minimalism with subtle high-tech tactile glassmorphism. Deep obsidian and void-black surfaces (#090A0F, #0D0F17) construct a zero-distraction acoustic studio environment, while razor-sharp, low-opacity borders define architectural structure. Electric cyan (#00D2DF) acts as an intentional photon pulse—reserved exclusively for active audio generation states, critical CTAs, active waveforms, and key performance indicators. The resulting aesthetic balances ruthless operational efficiency with bespoke audio workstation refinement.

## Colors

The color system operates on an acoustic studio dark-mode foundation where luminance is distributed strictly by functional elevation.

### Architectural Canvas & Neutral Surfaces
- `surface-base` (`#090A0F`): The infinite ground plane. Used exclusively for application viewport backdrops and master shells.
- `surface-subtle` (`#0D0F17`): Recessed canvas for sidebars, secondary drawers, and audio track timelines.
- `surface-card` (`#131722`): Elevating content groupings, speech-to-text script panels, and parameter modules.
- `surface-overlay` (`#181D2B`): Elevated popovers, command palettes, model pickers, and tooltips.
- `border-subtle` (`#1E2333`): Standard 1px architectural divider throughout all standard cards and structural grids.
- `border-prominent` (`#2A3147`): Hover state boundaries and active structural frames.

### Intentional Accents & Textures
- `primary_color_hex` (`#00D2DF`): Electric Cyan. Reserved for primary operational actions (e.g., "Generate Voiceover", "Export Audio"), live audio playhead states, and active language pills.
- `secondary_color_hex` (`#05E2B6`): Spring Mint. Utilized for audio mastering passes, high-bitrate outputs, and successful voice model synthesis confirmations.
- `tertiary_color_hex` (`#6366F1`): Deep Iris. Represents South Asian phoneme processing engines and multi-language acoustic tagging.
- `accent-glow`: Radial soft luminescence utilized underneath active waveforms and hero synthesis cards to impart atmospheric depth without visual clutter.

## Typography

Typography adheres strictly to a monolithic Inter hierarchy. The objective is neutral, crisp, and distraction-free information delivery mirroring top-tier developer platforms and linear workstations.

- **Tracking Philosophy**: Negative tracking is applied systematically to all display and headline sizes (`-0.03em` down to `-0.01em`) to create a tight, engineered editorial presence. Small utility labels feature expanded tracking (`0.04em`) with medium or semi-bold weights for rapid legibility during timeline scrubbing and voice generation parameter changes.
- **Multilingual Support**: Inter is combined with standard OpenType features (`ss01`, `cv05`) for English, while South Asian scripts (Bengali and Hindi) leverage native variable fallbacks rendered at matched optical heights without line-height distortion.
- **Micro-Copy**: Studio metadata (sample rates like 48kHz / 24-bit, audio timestamps, phoneme pauses, character counters) renders in `label-sm` or `body-sm` using tabular numeric alignment (`font-variant-numeric: tabular-nums`) to prevent horizontal jitter during real-time playback.

## Layout & Spacing

Layout geometry follows a strict 4px base spatial unit engineered for high-density workstation efficiency.

### Layout Model
- **Workstation Viewport**: Fixed-height, no-scroll master workspace for the script-to-speech studio, using a 3-column architecture: Voice & Dialect Library (280px fixed), Script Input & Phoneme Editor (flex fluid), and Audio Inspector & Waveform Rack (340px fixed).
- **Public & Management Views**: 12-column responsive fluid grid with maximum container width clamped to 1280px for analytics and creator dashboards.
- **Gutters & Canvas Margins**: 24px (`gutter`) across desktop breakpoints downscaling to 12px (`gutter-mobile`) on viewport dimensions below 768px. Edge margins maintain a rigid 32px frame on desktop, anchoring the app interface like hardware audio gear.

### Responsive Breakpoints & Adaptive Reflow
- **Desktop (1200px+)**: Tri-pane layout active. Timeline spans bottom docking bay.
- **Tablet (768px - 1199px)**: Voice Library collapses into a slide-over drawer; Script and Timeline view share the vertical viewport.
- **Mobile (< 768px)**: Tabbed segment control switches between "Script Editor", "Audio Playback", and "Voice Settings". Modals snap to bottom action sheets.

## Elevation & Depth

Visual hierarchy is conveyed through calibrated structural layering rather than heavy natural lighting. Depth is articulated via a blend of tonal elevation, 1px low-contrast boundary frames, and subtle frosted transmission.

### The Elevation Stack
1. **Canvas Level 0 (`surface-base`)**: Absolute zero elevation. Pure dark `#090A0F`. No shadows.
2. **Structural Level 1 (`surface-subtle`)**: Side navigation rails, timeline backdrops. Delineated by a continuous 1px border (`#1E2333`).
3. **Interactive Level 2 (`surface-card`)**: Script blocks, voice cards, preset containers. Glassmorphism enabled: `background: rgba(19, 23, 34, 0.75); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.07);`.
4. **Floating Level 3 (`surface-overlay`)**: Command menus, context popovers, audio track dropdowns. Shadow: `0px 12px 32px -4px rgba(0, 0, 0, 0.65), 0px 0px 0px 1px #2A3147`.

### Ambient Waveform Illumination
When audio generation or timeline scrubbing is active, surfaces beneath the waveform renderer emit an ambient soft glow: `box-shadow: 0 0 40px -10px rgba(0, 210, 223, 0.12)`. This creates a living studio atmosphere while preserving the technical integrity of the tool.

## Shapes

The design system standardizes on **Roundedness Level 2**. This specifies a baseline curvature of `0.5rem` (8px) for interactive elements, `1rem` (16px) for cards, dialogs, and workspace containers (`rounded-lg`), and `1.5rem` (24px) for expansive hero audio containers (`rounded-xl`).

- **Utility Controls & Inputs**: 8px (`0.5rem`). Applied to buttons, text inputs, voice slider thumbs, and dropdown selectors to maintain structured ergonomic precision.
- **Cards & Workspace Modules**: 16px (`1rem`). Mirrors contemporary engineering tools (e.g., Cal.com, Linear modal dialogs), softening the technical density without appearing playful or bubbly.
- **Audio Scrubber Badges & Chips**: Pill-shaped styling is limited strictly to status tags (e.g., `Hindi - Neural V2`, `96kHz`) and transport duration markers.

## Components

### Buttons & Transport Triggers
- **Primary CTA**: High-energy Electric Cyan (`#00D2DF`) background, dark obsidian text (`#090A0F`), font weight `600`, radius `8px`. Hover: `#00F2FE` with subtle ambient spread `box-shadow: 0 0 16px rgba(0, 210, 223, 0.35)`.
- **Secondary Workstation Button**: Background `rgba(255, 255, 255, 0.03)`, border `1px solid #1E2333`, text `#F9FAFB`. Hover: border `#2A3147`, background `rgba(255, 255, 255, 0.06)`.
- **Icon / Transport Actions (Play/Pause/Scrub)**: Circular or 8px rounded bounding box with centered SVG icons. Active play state triggers a subtle `#00D2DF` icon glow.

### Script & Text Input Fields
- **Voiceover Script Editor Area**: Borderless or faint 1px divider, deep obsidian ground (`#0D0F17`), high typographic readability (`fontSize: 16px`, `lineHeight: 28px`). Selected sentences highlight with `background: rgba(0, 210, 223, 0.08); border-left: 2px solid #00D2DF`.
- **Parameter Inputs (Pitch, Speed, Stability)**: Sleek, custom-styled horizontal slider rails (`height: 4px`, background `#1E2333`) with active fill in `#00D2DF` and an 8px circular thumb with subtle glow on drag.

### Voice Model Cards & Chips
- **Voice Selector Card**: Semi-translucent card (`rgba(19, 23, 34, 0.8)`), 16px rounded corners, 1px border (`#1E2333`). Includes avatar thumbnail, language indicator badge (e.g., `Bengali (IN)`), sample audio trigger, and performance metrics. Hover shifts border to `#2A3147`. Active selected card border snaps to `#00D2DF` with an internal soft radial glow.
- **Language & Accent Chips**: Height `24px`, padding `0 8px`, border radius `9999px`, font `label-sm`. Non-active: text `#94A3B8`, border `1px solid #1E2333`. Active: text `#00D2DF`, background `rgba(0, 210, 223, 0.1)`, border `1px solid rgba(0, 210, 223, 0.4)`.

### Audio Waveform Display
- Visualized as a series of vertical rounded bars (2px width, 2px gap). Inactive segments use `#1E2333`; played audio transitions in real time to `#00D2DF` with a hairline 1px vertical playhead scrubber `#FFFFFF` capped with a glowing cyan coordinate pip.

### Checkboxes & Toggle Switches
- **Toggle Switches**: Compact dimensions (`36px x 20px`), background `#1E2333`, smooth slide thumb (`16px x 16px`, white). Active state track shifts to `#00D2DF` with thumb sliding right.
- **Checkboxes**: 16px square, radius `4px`, border `1px solid #2A3147`. Checked state triggers `#00D2DF` fill with an obsidian checkmark.