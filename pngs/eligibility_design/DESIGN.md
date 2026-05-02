---
name: Sketch-Play Narrative
colors:
  surface: '#faf8ff'
  surface-dim: '#d9d9e1'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3fb'
  surface-container: '#ededf5'
  surface-container-high: '#e8e7f0'
  surface-container-highest: '#e2e2ea'
  on-surface: '#1a1b21'
  on-surface-variant: '#434752'
  inverse-surface: '#2e3036'
  inverse-on-surface: '#f0f0f8'
  outline: '#737783'
  outline-variant: '#c3c6d4'
  surface-tint: '#2a5bb3'
  primary: '#003781'
  on-primary: '#ffffff'
  primary-container: '#174ea6'
  on-primary-container: '#adc5ff'
  inverse-primary: '#afc6ff'
  secondary: '#b41d18'
  on-secondary: '#ffffff'
  secondary-container: '#d8382d'
  on-secondary-container: '#fffbff'
  tertiary: '#602d00'
  on-tertiary: '#ffffff'
  tertiary-container: '#824000'
  on-tertiary-container: '#ffb582'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d9e2ff'
  primary-fixed-dim: '#afc6ff'
  on-primary-fixed: '#001944'
  on-primary-fixed-variant: '#004299'
  secondary-fixed: '#ffdad5'
  secondary-fixed-dim: '#ffb4aa'
  on-secondary-fixed: '#410001'
  on-secondary-fixed-variant: '#930006'
  tertiary-fixed: '#ffdcc6'
  tertiary-fixed-dim: '#ffb785'
  on-tertiary-fixed: '#301400'
  on-tertiary-fixed-variant: '#713700'
  background: '#faf8ff'
  on-background: '#1a1b21'
  surface-variant: '#e2e2ea'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '500'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '500'
    lineHeight: '1.5'
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: '1.0'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  gutter: 24px
  margin: 32px
---

## Brand & Style

This design system is built on a "Doodle-Brutalism" aesthetic. It merges the high-energy logic of professional productivity tools with the uninhibited creativity of a sketchbook. The target audience includes creative teams, educators, and community-driven platforms looking to break away from sterile corporate interfaces.

The personality is intentionally unpolished but highly functional. It leverages a "sketchy" hand-drawn aesthetic to lower the barrier to entry, making the UI feel approachable and forgiving. By using bold outlines and vibrant hits of color, the system maintains high legibility and an energetic rhythm that feels alive and human.

## Colors

The palette is anchored by a vibrant, Google-inspired primary set, utilized with high-contrast intent. 

- **Primary Blue (#174EA6):** Used for main actions and structural branding.
- **Secondary Red (#A50E0E):** Reserved for destructive actions or high-priority alerts.
- **Tertiary Orange (#E37400):** Used for warnings, highlights, and playful accents.
- **Quaternary Green (#0D652D):** Used for success states and growth indicators.
- **Surface & Background:** Instead of pure white, use a warm "Paper" tone (#FFFBF2) to reinforce the sketchbook theme.
- **Ink Black (#1A1A1A):** All outlines, text, and shadows use this deep off-black to mimic heavy marker ink.

## Typography

This design system utilizes **Plus Jakarta Sans** for its friendly, rounded terminals and high legibility. The typographic scale is exaggerated to maintain the "cartoon" energy. 

Headlines should be set with tight leading and heavy weights to act as anchors against the sketchy linework of the UI. Body text remains spacious to ensure readability. For an added artistic touch, use "Sentence case" for most headers to keep the tone conversational rather than formal.

## Layout & Spacing

The design system employs a **Fluid Grid** with intentional "wiggle room." While elements align to a standard 12-column grid for structural integrity, the internal spacing should feel loose.

Avoid perfect symmetry. Use generous margins (#xl) between major sections to let the hand-drawn elements "breathe." Gutters are fixed at 24px to ensure that bold outlines do not touch or bleed into each other, maintaining clear visual separation.

## Elevation & Depth

This system rejects soft, ambient shadows in favor of **Hard-Edge Offset Shadows**. 

Depth is communicated through "Hard-Shadowing" (or "Pop-Out" effects). Elevated elements (like buttons or cards) should have a solid Ink Black (#1A1A1A) shadow offset by 4px or 8px. This mimics a 2D cutout aesthetic. Surfaces do not use blurs or gradients; instead, hierarchy is created by the thickness of the border and the presence of these solid offsets.

## Shapes

The shape language is the core of the design system's identity. 

1.  **Irregular Outlines:** Every container must have a stroke. Use SVG `border-image` or `clip-path` to create "wobbly" lines that look hand-drawn.
2.  **Corner Radius:** Use a base roundedness of 0.5rem (Level 2), but apply slight variations (e.g., top-left 12px, bottom-right 8px) to break the geometric perfection.
3.  **Bold Strokes:** All interactive elements feature a 3px "Ink Black" border. Internal dividers use a 1.5px stroke.

## Components

- **Buttons:** Large, bold containers with 3px outlines and 4px offset hard shadows. On hover, the shadow disappears and the button moves 4px down/right to simulate a physical "click."
- **Cards:** White or tinted background (#FFFBF2) with a wobbly outline. Use a "paper-clip" or "tape" visual metaphor for headers to lean into the sketchbook vibe.
- **Input Fields:** Thick outlines that "vibrate" (slight stroke-width change) when focused. Use the Primary Blue for the focus ring.
- **Chips & Tags:** Small, pill-shaped blobs with hand-drawn strokes. Use vibrant background fills with white text for high contrast.
- **Checkboxes:** Hand-drawn squares; the "check" mark should look like a literal pen-stroke 'X' or tick.
- **Tooltips:** Styled like speech bubbles with a small "tail," utilizing the Tertiary Orange background to draw immediate attention.