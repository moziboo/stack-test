import { forwardRef } from 'react';
import { Toast } from 'radix-ui';
import styles from './UBToast.module.css';

// Toast Provider Component - wrap your app with this
interface UBToastProviderProps {
  children: React.ReactNode;
  swipeDirection?: 'right' | 'left' | 'up' | 'down';
  duration?: number;
}

const UBToastProvider = ({
  children,
  swipeDirection = 'right',
  duration = 5000,
}: UBToastProviderProps) => {
  return (
    <Toast.Provider swipeDirection={swipeDirection} duration={duration}>
      {children}
      <Toast.Viewport className={styles.viewport} />
    </Toast.Provider>
  );
};

// Toast Root Component
interface UBToastProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  type?: 'foreground' | 'background';
  duration?: number;
  children: React.ReactNode;
}

const UBToastRoot = forwardRef<React.ElementRef<typeof Toast.Root>, UBToastProps>(
  ({ open, onOpenChange, type = 'foreground', duration, children, ...restProps }, ref) => {
    return (
      <Toast.Root
        ref={ref}
        className={styles.root}
        open={open}
        onOpenChange={onOpenChange}
        type={type}
        duration={duration}
        {...restProps}
      >
        {children}
      </Toast.Root>
    );
  }
);

// Toast Content Component
interface UBToastContentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  showIcon?: boolean;
}

const UBToastContent = forwardRef<HTMLDivElement, UBToastContentProps>(
  ({ variant = 'default', showIcon = true, className, children, ...restProps }, ref) => {
    const icons = {
      default: '📋',
      success: '✅',
      warning: '⚠️',
      error: '❌',
      info: 'ℹ️',
    };

    return (
      <div
        ref={ref}
        className={`${styles.content} ${styles[variant]} ${className || ''}`}
        {...restProps}
      >
        {showIcon && (
          <div className={styles.iconContainer}>
            <span className={styles.icon}>{icons[variant]}</span>
          </div>
        )}
        <div className={styles.messageContainer}>{children}</div>
      </div>
    );
  }
);

// Toast Title Component
interface UBToastTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const UBToastTitle = forwardRef<HTMLDivElement, UBToastTitleProps>(
  ({ asChild = false, className, children, ...restProps }, ref) => {
    return (
      <Toast.Title
        asChild={asChild}
        ref={ref}
        className={`${styles.title} ${className || ''}`}
        {...restProps}
      >
        {asChild ? children : <div>{children}</div>}
      </Toast.Title>
    );
  }
);

// Toast Description Component
interface UBToastDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const UBToastDescription = forwardRef<HTMLDivElement, UBToastDescriptionProps>(
  ({ asChild = false, className, children, ...restProps }, ref) => {
    return (
      <Toast.Description
        asChild={asChild}
        ref={ref}
        className={`${styles.description} ${className || ''}`}
        {...restProps}
      >
        {asChild ? children : <div>{children}</div>}
      </Toast.Description>
    );
  }
);

// Toast Action Component
interface UBToastActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  altText: string;
}

const UBToastAction = forwardRef<HTMLButtonElement, UBToastActionProps>(
  ({ asChild = false, altText, className, children, ...restProps }, ref) => {
    return (
      <Toast.Action
        asChild={asChild}
        altText={altText}
        ref={ref}
        className={`${styles.action} ${className || ''}`}
        {...restProps}
      >
        {asChild ? (
          children
        ) : (
          <button className={`${styles.actionButton} ${className || ''}`} {...restProps}>
            {children}
          </button>
        )}
      </Toast.Action>
    );
  }
);

// Toast Close Component
interface UBToastCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const UBToastClose = forwardRef<HTMLButtonElement, UBToastCloseProps>(
  ({ asChild = false, className, children, ...restProps }, ref) => {
    return (
      <Toast.Close
        asChild={asChild}
        ref={ref}
        className={`${styles.close} ${className || ''}`}
        {...restProps}
      >
        {asChild ? (
          children
        ) : (
          <button
            className={`${styles.closeButton} ${className || ''}`}
            aria-label="Close notification"
            {...restProps}
          >
            {children || '×'}
          </button>
        )}
      </Toast.Close>
    );
  }
);

// Compound component with sub-components
const UBToast = Object.assign(UBToastRoot, {
  Provider: UBToastProvider,
  Content: UBToastContent,
  Title: UBToastTitle,
  Description: UBToastDescription,
  Action: UBToastAction,
  Close: UBToastClose,
});

// Set display names
UBToastProvider.displayName = 'UBToast.Provider';
UBToastRoot.displayName = 'UBToast';
UBToastContent.displayName = 'UBToast.Content';
UBToastTitle.displayName = 'UBToast.Title';
UBToastDescription.displayName = 'UBToast.Description';
UBToastAction.displayName = 'UBToast.Action';
UBToastClose.displayName = 'UBToast.Close';

export default UBToast;
export type {
  UBToastProviderProps,
  UBToastProps,
  UBToastContentProps,
  UBToastTitleProps,
  UBToastDescriptionProps,
  UBToastActionProps,
  UBToastCloseProps,
};
