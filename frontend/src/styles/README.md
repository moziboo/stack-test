# UtilityBelt Design System

This directory contains the complete design system for the UtilityBelt component library.

## 📁 File Structure

```
src/styles/
├── index.css          # Main entry point - imports all styles
├── tokens.css         # Design tokens (colors, spacing, typography scales)
├── typography.css     # Typography system and text utilities
└── README.md         # This file
```

## 🎨 How to Use the Typography System

### 1. Display Text (Hero sections, landing pages)
```html
<h1 class="text-display-xl">Hero Headline</h1>
<h2 class="text-display-lg">Large Display</h2>
<h3 class="text-display-md">Medium Display</h3>
<h4 class="text-display-sm">Small Display</h4>
```

### 2. Section Headings (Cards, pages, components)
```html
<h1 class="text-heading-xl">Page Title</h1>
<h2 class="text-heading-lg">Section Title</h2>
<h3 class="text-heading-md">Subsection</h3>
<h4 class="text-heading-sm">Card Title</h4>
<h5 class="text-heading-xs">Small Title</h5>
```

### 3. Body Text
```html
<p class="text-body-xl">Large body text</p>
<p class="text-body-lg">Prominent body text</p>
<p class="text-body-md">Default body text</p>
<p class="text-body-sm">Small body text</p>
<p class="text-body-xs">Fine print</p>
```

### 4. Semantic Text Styles
```html
<label class="text-label">Form Label</label>
<span class="text-caption">Image caption</span>
<span class="text-overline">SECTION OVERLINE</span>
<code class="text-code">inline code</code>
```

### 5. Utility Classes
```html
<!-- Colors -->
<p class="text-primary">Primary text color</p>
<p class="text-secondary">Secondary text color</p>
<p class="text-success">Success message</p>
<p class="text-error">Error message</p>

<!-- Weight -->
<span class="text-weight-bold">Bold text</span>
<span class="text-weight-medium">Medium text</span>

<!-- Alignment -->
<div class="text-center">Centered text</div>
<div class="text-right">Right aligned</div>

<!-- Links -->
<a href="#" class="link">Standard link</a>
<a href="#" class="link-subtle">Subtle link</a>
```

## 📝 Rich Content (Blog posts, documentation)

For rich content areas like articles or documentation, use the `.prose` class:

```html
<article class="prose">
  <h1>Article Title</h1>
  <p>Article content with proper spacing and typography...</p>
  <h2>Section Heading</h2>
  <p>More content...</p>
  <ul>
    <li>List item</li>
    <li>Another item</li>
  </ul>
  <blockquote>
    "A quote with proper styling"
  </blockquote>
  <code>inline code</code>
  <pre><code>code block</code></pre>
</article>
```

## 🎯 Common Patterns

### Card with Typography
```html
<div class="card">
  <div class="card-header">
    <h3 class="text-heading-md">Card Title</h3>
    <span class="text-caption text-secondary">Subtitle</span>
  </div>
  <div class="card-body">
    <p class="text-body-md">Card content goes here...</p>
    <span class="text-body-sm text-muted">Additional details</span>
  </div>
</div>
```

### Form Section
```html
<div>
  <label class="text-label text-primary">Email Address</label>
  <input type="email" />
  <span class="text-caption text-error">Error message</span>
</div>
```

### Status Indicators
```html
<div>
  <span class="text-overline text-secondary">STATUS</span>
  <span class="text-body-sm text-success">Active</span>
</div>
```

## 🚀 Best Practices

### 1. **Use Semantic Classes**
- Prefer semantic classes like `text-heading-lg` over generic ones
- Use the appropriate scale for your content hierarchy

### 2. **Combine with Utility Classes**
```html
<h2 class="text-heading-lg text-center text-primary">
  Centered Primary Heading
</h2>
```

### 3. **Responsive Design**
- Display text automatically scales down on mobile
- Test your typography on different screen sizes

### 4. **Accessibility**
- Maintain proper heading hierarchy (h1 → h2 → h3)
- Use sufficient color contrast
- Don't rely solely on color to convey meaning

### 5. **Consistency**
- Stick to the defined scale rather than custom font sizes
- Use the design tokens consistently across your application

## 🎨 Customization

To customize the typography system:

1. **Modify tokens.css** for base sizes and spacing
2. **Extend typography.css** for new utility classes
3. **Use CSS custom properties** for theme-specific adjustments

Example:
```css
/* In your component CSS */
.my-component .special-title {
  font-size: var(--font-size-xl);
  color: var(--color-primary);
  margin-bottom: var(--spacing-md);
}
```

## 📱 Mobile Considerations

The typography system includes responsive adjustments:
- Display text scales down automatically on mobile
- Spacing adjusts appropriately for smaller screens
- Touch targets remain accessible

Remember: This system works seamlessly with your component library and maintains consistency across your entire application!
