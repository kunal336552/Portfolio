export interface ThemePreset {
  id: string;
  name: string;
  hex: string;
  colors: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
  };
  glowRgba: string;
}

export const THEME_PRESETS: Record<string, ThemePreset> = {
  emerald: {
    id: 'emerald',
    name: 'Emerald Mint',
    hex: '#10b981',
    colors: {
      50: '#ecfdf5',
      100: '#d1fae5',
      200: '#a7f3d0',
      300: '#6ee7b7',
      400: '#34d399',
      500: '#10b981',
      600: '#059669',
      700: '#047857',
      800: '#065f46',
      900: '#064e3b',
      950: '#022c22',
    },
    glowRgba: 'rgba(16, 185, 129, 0.4)',
  },
  cobalt: {
    id: 'cobalt',
    name: 'Electric Cobalt',
    hex: '#3b82f6',
    colors: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554',
    },
    glowRgba: 'rgba(59, 130, 246, 0.4)',
  },
  violet: {
    id: 'violet',
    name: 'Modern Violet',
    hex: '#8b5cf6',
    colors: {
      50: '#f5f3ff',
      100: '#ede9fe',
      200: '#ddd6fe',
      300: '#c4b5fd',
      400: '#a78bfa',
      500: '#8b5cf6',
      600: '#7c3aed',
      700: '#6d28d9',
      800: '#5b21b6',
      900: '#4c1d95',
      950: '#2e1065',
    },
    glowRgba: 'rgba(139, 92, 246, 0.4)',
  },
  amber: {
    id: 'amber',
    name: 'Amber Gold',
    hex: '#f59e0b',
    colors: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
      950: '#451a03',
    },
    glowRgba: 'rgba(245, 158, 11, 0.4)',
  },
  cyan: {
    id: 'cyan',
    name: 'Cyan Neon',
    hex: '#06b6d4',
    colors: {
      50: '#ecfeff',
      100: '#cffafe',
      200: '#a5f3fc',
      300: '#67e8f9',
      400: '#22d3ee',
      500: '#06b6d4',
      600: '#0891b2',
      700: '#0e7490',
      800: '#155e75',
      900: '#164e63',
      950: '#083344',
    },
    glowRgba: 'rgba(6, 182, 212, 0.4)',
  },
  rose: {
    id: 'rose',
    name: 'Cinnabar Rose',
    hex: '#f43f5e',
    colors: {
      50: '#fff1f2',
      100: '#ffe4e6',
      200: '#fecdd3',
      300: '#fda4af',
      400: '#fb7185',
      500: '#f43f5e',
      600: '#e11d48',
      700: '#be123c',
      800: '#9f1239',
      900: '#881337',
      950: '#4c0519',
    },
    glowRgba: 'rgba(244, 63, 94, 0.4)',
  }
};

export function findThemePreset(input: string | undefined): ThemePreset {
  if (!input) return THEME_PRESETS.emerald;
  const lower = input.toLowerCase();

  // Check by ID
  if (THEME_PRESETS[lower]) return THEME_PRESETS[lower];

  // Check by HEX
  for (const preset of Object.values(THEME_PRESETS)) {
    if (preset.hex.toLowerCase() === lower) return preset;
  }

  // Check by Name
  for (const preset of Object.values(THEME_PRESETS)) {
    if (preset.name.toLowerCase().includes(lower) || lower.includes(preset.id)) {
      return preset;
    }
  }

  // Fallback to emerald
  return THEME_PRESETS.emerald;
}

export function applyThemeToDOM(themeIdentifier: string | undefined) {
  if (typeof document === 'undefined') return;
  const preset = findThemePreset(themeIdentifier);
  const root = document.documentElement;

  root.setAttribute('data-theme', preset.id);

  // Set CSS variables for Tailwind @theme mapping
  root.style.setProperty('--theme-50', preset.colors[50]);
  root.style.setProperty('--theme-100', preset.colors[100]);
  root.style.setProperty('--theme-200', preset.colors[200]);
  root.style.setProperty('--theme-300', preset.colors[300]);
  root.style.setProperty('--theme-400', preset.colors[400]);
  root.style.setProperty('--theme-500', preset.colors[500]);
  root.style.setProperty('--theme-600', preset.colors[600]);
  root.style.setProperty('--theme-700', preset.colors[700]);
  root.style.setProperty('--theme-800', preset.colors[800]);
  root.style.setProperty('--theme-900', preset.colors[900]);
  root.style.setProperty('--theme-950', preset.colors[950]);

  // Set generic accent variables
  root.style.setProperty('--accent-primary', preset.hex);
  root.style.setProperty('--accent-glow', preset.glowRgba);
}
