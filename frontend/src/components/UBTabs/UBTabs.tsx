import { forwardRef } from 'react';
import { Tabs } from 'radix-ui';
import styles from './UBTabs.module.css';

// Tab Root Component
interface UBTabsProps {
  value?: string;
  onValueChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  activationMode?: 'automatic' | 'manual';
  className?: string;
  children: React.ReactNode;
}

const UBTabsRoot = forwardRef<React.ElementRef<typeof Tabs.Root>, UBTabsProps>(
  (
    {
      value,
      onValueChange,
      orientation = 'horizontal',
      activationMode = 'automatic',
      className,
      children,
      ...restProps
    },
    ref
  ) => {
    return (
      <Tabs.Root
        ref={ref}
        value={value}
        onValueChange={onValueChange}
        orientation={orientation}
        activationMode={activationMode}
        className={`${styles.root} ${styles[orientation]} ${className || ''}`}
        {...restProps}
      >
        {children}
      </Tabs.Root>
    );
  }
);

// Tab List Component
interface UBTabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'pills' | 'underline';
  size?: 'sm' | 'md' | 'lg';
}

const UBTabsList = forwardRef<HTMLDivElement, UBTabsListProps>(
  ({ variant = 'default', size = 'md', className, children, ...restProps }, ref) => {
    return (
      <Tabs.List
        ref={ref}
        className={`${styles.list} ${styles[`list-${variant}`]} ${styles[`list-${size}`]} ${className || ''}`}
        {...restProps}
      >
        {children}
      </Tabs.List>
    );
  }
);

// Tab Trigger Component
interface UBTabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  disabled?: boolean;
}

const UBTabsTrigger = forwardRef<HTMLButtonElement, UBTabsTriggerProps>(
  ({ value, disabled = false, className, children, ...restProps }, ref) => {
    return (
      <Tabs.Trigger
        ref={ref}
        value={value}
        disabled={disabled}
        className={`${styles.trigger} ${disabled ? styles.disabled : ''} ${className || ''}`}
        {...restProps}
      >
        {children}
      </Tabs.Trigger>
    );
  }
);

// Tab Content Component
interface UBTabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  forceMount?: boolean;
}

const UBTabsContent = forwardRef<HTMLDivElement, UBTabsContentProps>(
  ({ value, forceMount, className, children, ...restProps }, ref) => {
    return (
      <Tabs.Content
        ref={ref}
        value={value}
        forceMount={forceMount || undefined}
        className={`${styles.content} ${className || ''}`}
        {...restProps}
      >
        {children}
      </Tabs.Content>
    );
  }
);

// Compound component with sub-components
const UBTabs = Object.assign(UBTabsRoot, {
  List: UBTabsList,
  Trigger: UBTabsTrigger,
  Content: UBTabsContent,
});

// Set display names
UBTabsRoot.displayName = 'UBTabs';
UBTabsList.displayName = 'UBTabs.List';
UBTabsTrigger.displayName = 'UBTabs.Trigger';
UBTabsContent.displayName = 'UBTabs.Content';

export default UBTabs;
export type { UBTabsProps, UBTabsListProps, UBTabsTriggerProps, UBTabsContentProps };
