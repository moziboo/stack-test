#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the component name from command line arguments
const componentName = process.argv[2];

if (!componentName) {
  console.error('❌ Error: Please provide a component name');
  console.log('Usage: npm run create-component <ComponentName>');
  console.log('Example: npm run create-component UBButton');
  process.exit(1);
}

// Validate component name
if (!componentName.startsWith('UB')) {
  console.error('❌ Error: Component name must start with "UB"');
  console.log('Example: UBButton, UBInput, UBCard');
  process.exit(1);
}

if (!/^UB[A-Z][a-zA-Z0-9]*$/.test(componentName)) {
  console.error('❌ Error: Component name must be in PascalCase and start with "UB"');
  console.log('Example: UBButton, UBInput, UBCard');
  process.exit(1);
}

const projectRoot = path.resolve(__dirname, '..');
const templateDir = path.join(projectRoot, 'src', 'templates', 'UBComponent');
const componentsDir = path.join(projectRoot, 'src', 'components');
const targetDir = path.join(componentsDir, componentName);

// Check if template exists
if (!fs.existsSync(templateDir)) {
  console.error('❌ Error: Template directory not found at', templateDir);
  process.exit(1);
}

// Check if component already exists
if (fs.existsSync(targetDir)) {
  console.error(`❌ Error: Component "${componentName}" already exists`);
  process.exit(1);
}

console.log(`🚀 Creating component "${componentName}"...`);

// Create the target directory
fs.mkdirSync(targetDir, { recursive: true });

// File mappings: template filename -> target filename
const fileMapping = {
  'UBComponent.tesx': `${componentName}.tsx`,
  'UBComponent.module.css': `${componentName}.module.css`,
  'UBComponent.stories.tesx': `${componentName}.stories.tsx`,
  'UBComponent.test.tesx': `${componentName}.test.tsx`,
  'index.ts': 'index.ts',
};

// Copy and transform each file
Object.entries(fileMapping).forEach(([templateFile, targetFile]) => {
  const templatePath = path.join(templateDir, templateFile);
  const targetPath = path.join(targetDir, targetFile);

  if (!fs.existsSync(templatePath)) {
    console.warn(`⚠️  Warning: Template file ${templateFile} not found, skipping`);
    return;
  }

  // Read the template file
  let content = fs.readFileSync(templatePath, 'utf8');

  // Replace all occurrences of UBComponent with the new component name
  content = content.replace(/UBComponent/g, componentName);

  // Write the transformed content to the target file
  fs.writeFileSync(targetPath, content);
  console.log(`✅ Created ${targetFile}`);
});

console.log(`\n🎉 Component "${componentName}" created successfully!`);
console.log(`📁 Location: src/components/${componentName}/`);
console.log('\n📝 Next steps:');
console.log('1. Implement your component logic');
console.log('2. Add your component styles');
console.log('3. Create Storybook stories');
console.log('4. Write comprehensive tests');
console.log('5. Update component props interface');
console.log('\n🔗 Useful commands:');
console.log('• npm run storybook - View your component in Storybook');
console.log('• npm run test - Run your component tests');
console.log('• npm run lint - Check for linting issues');
