// Design Tokens TypeScript Interface
// This provides autocomplete and type safety when using design tokens in JS/TS

export const tokens = {
  colors: {
    primary: 'var(--color-primary)',
    primaryContrast: 'var(--color-primary-contrast)',
    background: 'var(--color-background)',
    backgroundSecondary: 'var(--color-background-secondary)',
    border: 'var(--color-border)',
    textPrimary: 'var(--color-text-primary)',
    textSecondary: 'var(--color-text-secondary)',
    disabled: 'var(--color-disabled)',
    disabledText: 'var(--color-disabled-text)',
  },
  spacing: {
    xs: 'var(--spacing-xs)',
    sm: 'var(--spacing-sm)',
    md: 'var(--spacing-md)',
    lg: 'var(--spacing-lg)',
    xl: 'var(--spacing-xl)',
  },
  fontSize: {
    sm: 'var(--font-size-sm)',
    md: 'var(--font-size-md)',
    lg: 'var(--font-size-lg)',
    xl: 'var(--font-size-xl)',
  },
  radius: {
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
  },
  shadows: {
    sm: 'var(--shadow-sm)',
    md: 'var(--shadow-md)',
    lg: 'var(--shadow-lg)',
  },
  transitions: {
    fast: 'var(--transition-fast)',
    normal: 'var(--transition-normal)',
    slow: 'var(--transition-slow)',
  },
} as const;

// Helper function for inline styles
export const getToken = (path: string): string => {
  return `var(--${path.replace(/\./g, '-')})`;
};

// Type-safe token paths
export type TokenPath =
  | 'color.primary'
  | 'color.background'
  | 'spacing.md'
  | 'fontSize.md'
  | 'radius.md';
// Add more as needed
