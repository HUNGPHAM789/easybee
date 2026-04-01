// ── Design Tokens ─────────────────────────────────────────────
// Single source of truth for colors, typography, and spacing.
// All values are WCAG AA compliant against their intended backgrounds.

export const colors = {
  // Text — all pass 4.5:1 contrast on white
  text: '#0a0a0a',          // primary text
  textSecondary: '#555555',  // secondary text (was #8a8a8a → failed AA)
  textMuted: '#767676',      // muted/tertiary (was #b0b0b0 → failed AA, now 4.5:1 exact)
  textDisabled: '#9a9a9a',   // disabled state only (not for readable text)

  // Surfaces
  bg: '#ffffff',
  bgSurface: '#f2f2f2',
  bgSurfaceHover: '#eaeaea',
  bgSubtle: '#fafafa',

  // Borders
  border: '#d4d4d4',         // was #e0e0e0 → slightly stronger for visibility
  borderStrong: '#0a0a0a',

  // Accent (monochrome)
  accent: '#0a0a0a',
  accentFg: '#ffffff',

  // Semantic
  error: '#dc2626',
} as const;

export const fontSizes = {
  xs: '12px',    // minimum readable size (was 10-11px)
  sm: '13px',
  base: '14px',
  md: '15px',
  lg: '16px',
  xl: '20px',
  '2xl': '22px',
  '3xl': '28px',
  '4xl': '32px',
} as const;

export const radii = {
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
} as const;

export const shadows = {
  sm: '0 1px 3px rgba(0,0,0,0.06)',
  md: '0 2px 8px rgba(0,0,0,0.06)',
  lg: '0 2px 12px rgba(10,10,10,0.15)',
  button: '0 2px 12px rgba(10,10,10,0.15)',
} as const;
