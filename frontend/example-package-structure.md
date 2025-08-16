# Component Library Package Structure

## 📦 Package.json Example

```json
{
  "name": "@yourorg/utility-belt-ui",
  "version": "1.0.0",
  "description": "A modern React component library",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist"
  ],
  "style": "dist/styles.css",
  "exports": {
    ".": {
      "import": "./dist/index.esm.js",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./styles": "./dist/styles.css",
    "./tokens": "./dist/tokens.css"
  },
  "scripts": {
    "build": "rollup -c",
    "dev": "rollup -c --watch",
    "storybook": "storybook dev -p 6006"
  },
  "peerDependencies": {
    "react": ">=16.8.0",
    "react-dom": ">=16.8.0"
  },
  "devDependencies": {
    "@rollup/plugin-typescript": "^11.0.0",
    "rollup": "^4.0.0",
    "rollup-plugin-postcss": "^4.0.0"
  }
}
```

## 🏗️ Build Configuration (Rollup)

```javascript
// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs'
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm'
    }
  ],
  plugins: [
    typescript(),
    postcss({
      extract: 'styles.css',  // Extracts all CSS into one file
      minimize: true
    })
  ],
  external: ['react', 'react-dom']
};
```

## 📁 Distribution Structure

After building, your package would have:

```
dist/
├── index.js              # CommonJS bundle
├── index.esm.js         # ES module bundle  
├── index.d.ts           # TypeScript definitions
├── styles.css           # All component styles
├── tokens.css           # Just design tokens
└── components/          # Individual component files
    ├── UBButton.js
    ├── UBButton.d.ts
    └── ...
```

## 💻 Usage Examples

### Basic Usage
```tsx
// User installs: npm install @yourorg/utility-belt-ui

// Option 1: Import styles automatically (if bundled with components)
import { UBButton, UBCard } from '@yourorg/utility-belt-ui';

// Option 2: Import styles manually
import '@yourorg/utility-belt-ui/dist/styles.css';
import { UBButton, UBCard } from '@yourorg/utility-belt-ui';
```

### Design Token Only Usage
```tsx
// Users who just want your design system
import '@yourorg/utility-belt-ui/tokens';

// Now they can use CSS custom properties
.my-custom-component {
  padding: var(--spacing-md);
  color: var(--color-primary);
}
```

### Tree-Shaking Support
```tsx
// Import only what you need
import { UBButton } from '@yourorg/utility-belt-ui/components/UBButton';
import { UBCard } from '@yourorg/utility-belt-ui/components/UBCard';
```

## 🎨 CSS Architecture for Distribution

### 1. **Component-Scoped CSS**
Each component has its own CSS module:
```css
/* UBButton.module.css */
.button {
  padding: var(--spacing-md);
  background: var(--color-primary);
  border-radius: var(--radius-md);
}
```

### 2. **Global Design Tokens**
```css
/* tokens.css - can be imported separately */
:root {
  --color-primary: #000000;
  --spacing-md: 15px;
  /* ... */
}
```

### 3. **Typography System** 
```css
/* typography.css - optional import */
.text-heading-lg {
  font-size: 1.25rem;
  font-weight: 600;
}
```

## 📝 Documentation Structure

Your component library should include:

```
docs/
├── README.md                # Getting started
├── INSTALLATION.md         # Installation guide
├── STYLING.md              # CSS customization
├── MIGRATION.md            # Version upgrade guides
└── components/
    ├── UBButton.md
    ├── UBCard.md
    └── ...
```

## 🔧 Development vs Production

### Development Mode
```tsx
// During development, CSS modules work normally
import styles from './UBButton.module.css';
```

### Production Build
```css
/* All CSS gets bundled and scoped automatically */
.ub-button-abc123 {
  /* Scoped styles */
}
```

## 🌟 Best Practices

1. **Always include design tokens** - Users love having access to your design system
2. **Provide multiple import options** - CSS bundled AND separate
3. **Support tree-shaking** - Don't force users to import everything
4. **Include TypeScript definitions** - Even if source is JavaScript
5. **Document CSS customization** - Show how to override variables
6. **Version your CSS carefully** - Breaking changes in styles matter too
