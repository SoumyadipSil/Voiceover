GN.md
DESIGN
name: Vocal Studio Design System
colors:
surface: '#f7f9fb'
surface-dim: '#d8dadc'
surface-bright: '#f7f9fb'
surface-container-lowest: '#ffffff'
surface-container-low: '#f2f4f6'
surface-container: '#eceef0'
surface-container-high: '#e6e8ea'
surface-container-highest: '#e0e3e5'
on-surface: '#191c1e'
on-surface-variant: '#434655'
inverse-surface: '#2d3133'
inverse-on-surface: '#eff1f3'
outline: '#737686'
outline-variant: '#c3c6d7'
surface-tint: '#0053db'
primary: '#004ac6'
on-primary: '#ffffff'
primary-container: '#2563eb'
on-primary-container: '#eeefff'
inverse-primary: '#b4c5ff'
secondary: '#565e74'
on-secondary: '#ffffff'
secondary-container: '#dae2fd'
on-secondary-container: '#5c647a'
tertiary: '#943700'
on-tertiary: '#ffffff'
tertiary-container: '#bc4800'
on-tertiary-container: '#ffede6'
error: '#ba1a1a'
on-error: '#ffffff'
error-container: '#ffdad6'
on-error-container: '#93000a'
primary-fixed: '#dbe1ff'
primary-fixed-dim: '#b4c5ff'
on-primary-fixed: '#00174b'
on-primary-fixed-variant: '#003ea8'
secondary-fixed: '#dae2fd'
secondary-fixed-dim: '#bec6e0'
on-secondary-fixed: '#131b2e'
on-secondary-fixed-variant: '#3f465c'
tertiary-fixed: '#ffdbcd'
tertiary-fixed-dim: '#ffb596'
on-tertiary-fixed: '#360f00'
on-tertiary-fixed-variant: '#7d2d00'
background: '#f7f9fb'
on-background: '#191c1e'
surface-variant: '#e0e3e5'
typography:
display-lg:
fontFamily: Inter
fontSize: 40px
fontWeight: '700'
lineHeight: 48px
letterSpacing: -0.02em
display-lg-mobile:
fontFamily: Inter
fontSize: 30px
fontWeight: '700'
lineHeight: 38px
letterSpacing: -0.015em
headline-lg:
fontFamily: Inter
fontSize: 28px
fontWeight: '600'
lineHeight: 36px
letterSpacing: -0.015em
headline-lg-mobile:
fontFamily: Inter
fontSize: 22px
fontWeight: '600'
lineHeight: 30px
letterSpacing: -0.01em
headline-md:
fontFamily: Inter
fontSize: 20px
fontWeight: '600'
lineHeight: 28px
letterSpacing: -0.01em
title-sm:
fontFamily: Inter
fontSize: 16px
fontWeight: '600'
lineHeight: 24px
letterSpacing: -0.005em
body-lg:
fontFamily: Inter
fontSize: 16px
fontWeight: '400'
lineHeight: 26px
letterSpacing: 0em
body-md:
fontFamily: Inter
fontSize: 14px
fontWeight: '400'
lineHeight: 22px
letterSpacing: 0em
body-sm:
fontFamily: Inter
fontSize: 13px
fontWeight: '400'
lineHeight: 18px
letterSpacing: 0.005em
label-md:
fontFamily: Inter
fontSize: 13px
fontWeight: '500'
lineHeight: 18px
letterSpacing: 0.01em
label-sm:
fontFamily: Inter
fontSize: 11px
fontWeight: '600'
lineHeight: 16px
letterSpacing: 0.03em
code-sm:
fontFamily: Inter
fontSize: 12px
fontWeight: '500'
lineHeight: 16px
letterSpacing: 0.02em
rounded:
sm: 0.25rem
DEFAULT: 0.5rem
md: 0.75rem
lg: 1rem
xl: 1.5rem
full: 9999px
spacing:
gutter: 1.5rem
margin: 2rem
space-xs: 0.25rem
space-sm: 0.5rem
space-md: 1rem
space-lg: 1.5rem
space-xl: 2.5rem
Brand & Style
This design system delivers a high-precision, modern SaaS environment engineered specifically for synthetic voice generation, audio editing, and speech synthesis. The aesthetic channels clinical clarity and effortless productivity, evoking absolute trust, speed, and acoustic accuracy.
Drawing from contemporary Corporate Minimalist interface paradigms, the visual architecture relies on a pure white workspace layered over subtle off-white backdrops, framed by hairline structural borders. Visual noise is aggressively eliminated so waveforms, script editors, voice model cards, and audio controls remain the primary focus. Tactile, vibrant royal blue accents command immediate attention for interactive states, primary executions, and real-time audio playback indicators.
Colors
The color palette establishes an uncompromising light-mode experience optimized for multi-hour creative sessions without visual fatigue.
Primary (#2563eb): Electric royal blue used intentionally for primary CTAs, active audio waveforms, slider track fills, selected voice tokens, and active tab indicators. Hover states shift downward into #1d4ed8.
Secondary (#0f172a): Deep slate commanding text hierarchies, dark structural toolbars, and high-emphasis display headings. Secondary action elements utilize a slightly softened tone (#1e293b).
Neutral Surface Hierarchy:
Base Canvas (#f8fafc): Cool off-white canvas providing soft contrast behind panels.
Workspace & Cards (#ffffff): Pure white surfaces for the text editor, voice cards, settings sidebars, and audio player docks.
Subtle Fill (#f1f5f9): Inactive scrubber rails, disabled chips, and secondary hover regions.
Border & Hairline (#e2e8f0): Uniform 1px boundaries separating tools, sidebars, and card groups.
Muted Typography (#64748b): Cool slate applied to metadata, input labels, timestamps, and audio attribute tags (e.g., pitch, speed, emphasis values).
Typography
Inter governs the entire typographic structure. The typographic rhythm prioritizes functional readability, character density, and strict baseline alignment across complex audio workbench panels.
Headings & Titles: Dense, low negative letter spacing (0.01em to 0.02em) with semi-bold to bold weights, providing structure to voice category sections and studio document headings.
Body & Script Input: Normal tracking with open line-heights (1.6 for long-form speech text generation) to ensure effortless proofreading and prosody markup placement.
Parametric Labels & Timestamps: Form labels, pitch/speed slider readouts, decibel badges, and audio duration metadata use compact 11px and 13px variants with medium-to-semibold weights and positive tracking to preserve legibility at micro scales.
Layout & Spacing
The layout model is constructed on an 8-point base grid using a fluid multi-panel studio architecture.
Desktop (1280px and above): Employs a sticky three-pane fixed/fluid layout:
Left navigation/voice selector column: fixed 320px width.
Central synthesis editor/timeline: fluid flex container with minimum width of 640px.
Right voice modulation & audio parameter panel: fixed 360px width.
Tablet (768px - 1279px): Collapses the modulation panel into a sliding drawer or tabbed sub-view; the script editor assumes full width with an anchored floating player dock.
Mobile (< 768px): Fluid 4-column container with dynamic padding (1rem outer margins). Controls collapse into bottom-sheet overlays.
Spacing Rhythm: All margins, component paddings, tool clusters, and card gaps adhere strictly to the 4px/8px scale tokens, maintaining rigorous structural alignment between waveform scrubber rulers and script lines.
Elevation & Depth
Visual depth is achieved through an interplay of hairline borders and soft ambient diffusion rather than heavy physical drops:
Level 0 (Flat Canvas): Neutral canvas background (#f8fafc) with no shadow.
Level 1 (Panels & Cards): Pure white #ffffff surfaces bounded by a crisp 1px solid #e2e8f0 border, paired with an ambient diffuse shadow: 0 1px 3px rgba(15, 23, 42, 0.04), 0 4px 12px rgba(15, 23, 42, 0.03).
Level 2 (Dropdowns, Menus & Tooltips): Elevated popovers and floating context menus use 0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.03) combined with the standard 1px solid #e2e8f0 boundary.
Level 3 (Modal Overlays & Docked Players): Floating bottom playback bar and critical modal dialogs leverage a pronounced soft shadow: 0 20px 35px -10px rgba(15, 23, 42, 0.12) with a 1px border.
Shapes
The design system employs a geometric, approachable roundedness philosophy with structured variance based on component scale:
Structural Cards & Workspaces (rounded-lg / 12px - 16px): Panels, waveform display modules, audio preview cards, and voice selection containers feature unified 12px to 16px corner radii.
Inputs & Standard Selectors (rounded / 8px): Script editor containers, parameter inputs, and metadata fields utilize a tighter 8px radius.
Pill Elements (rounded-full / 9999px): Play/Pause toggles, primary CTA action buttons ("Generate Audio", "Export"), voice accent tags, and status badges utilize full pill contours for immediate tactile recognition.
Components
Buttons & Interactive Controls
Primary Button: Pill-shaped (rounded-full), #2563eb fill with white #ffffff text, subtle elevation. Hover transitions to #1d4ed8 with a micro-transform elevation lift.
Secondary Button: Pill-shaped (rounded-full), #ffffff background with 1px #e2e8f0 border and #0f172a text. Hover shifts to #f8fafc surface and #cbd5e1 border.
Icon Action Buttons: 36px/40px circles (rounded-full) or 8px rounded squares for secondary studio tools (undo, redo, insert pause, SSML tags).
Voice & Audio Cards
Voice Selector Tile: Pure white card with 12px border radius, 1px #e2e8f0 border, and Level 1 ambient shadow. Features voice avatar/waveform preview, language pill chip, and gender tags. Active state renders a 2px #2563eb outline with an ultra-light #eff6ff blue wash.
Sliders & Scrubbers (Voice Pitch, Speed, Volume)
Track: 4px height, background #e2e8f0 with active left fill in #2563eb.
Thumb: 16px pure white circle with a 2px #2563eb border and 0 2px 4px rgba(0,0,0,0.1) shadow. Scales to 18px on active drag.
Input Fields & Editor Surface
Textarea / Script Editor: Clean white canvas framed in 1px #e2e8f0, focusing to 1px #2563eb accompanied by an electric blue focus ring (0 0 0 3px rgba(37, 99, 235, 0.12)).
Text Selection: Tinted with #dbeafe for high clarity during prosody tagging.
Chips & Badges
Pill Chips: 6px vertical by 12px horizontal padding, pill-rounded (rounded-full). Default state is #f1f5f9 fill with #64748b typography. Selected state transitions to #eff6ff background with #2563eb text and #bfdbfe hairline border.
Checkboxes & Radios
18px rounded squares (checkbox: 4px radius) or circles (radio). Unchecked state uses #ffffff with a 1.5px #cbd5e1 border; checked state fills with #2563eb and displays a crisp white check or dot.
Bottom Docked Audio Player
Floating pill-styled bar or full-width docked dock anchored at screen bottom. 16px radius on top corners (or fully floating with 20px radius), Level 3 shadow, white background with integrated waveform track, playhead controls, export pill buttons, and real-time audio scrubbing.