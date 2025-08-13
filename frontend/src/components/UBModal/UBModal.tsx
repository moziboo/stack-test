import { forwardRef } from 'react';
import { Dialog } from 'radix-ui';
import styles from './UBModal.module.css';

// Modal Root Component
interface UBModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

const UBModalRoot = ({ open, onOpenChange, children }: UBModalProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog.Root>
  );
};

// Modal Trigger Component
interface UBModalTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const UBModalTrigger = forwardRef<HTMLButtonElement, UBModalTriggerProps>(
  ({ asChild = false, className, children, ...restProps }, ref) => {
    return (
      <Dialog.Trigger asChild={asChild} ref={ref} className={className} {...restProps}>
        {asChild ? (
          children
        ) : (
          <button className={className} {...restProps}>
            {children}
          </button>
        )}
      </Dialog.Trigger>
    );
  }
);

// Modal Content Component
interface UBModalContentProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
}

const UBModalContent = forwardRef<HTMLDivElement, UBModalContentProps>(
  ({ size = 'md', showCloseButton = true, className, children, ...restProps }, ref) => {
    return (
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content
          ref={ref}
          className={`${styles.content} ${styles[size]} ${className || ''}`}
          {...restProps}
        >
          {children}
          {showCloseButton && (
            <Dialog.Close className={styles.closeButton} aria-label="Close modal">
              <span className={styles.closeIcon}>×</span>
            </Dialog.Close>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    );
  }
);

// Modal Header Component
interface UBModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const UBModalHeader = forwardRef<HTMLDivElement, UBModalHeaderProps>(
  ({ className, children, ...restProps }, ref) => {
    return (
      <div ref={ref} className={`${styles.header} ${className || ''}`} {...restProps}>
        {children}
      </div>
    );
  }
);

// Modal Title Component
interface UBModalTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  asChild?: boolean;
}

const UBModalTitle = forwardRef<HTMLHeadingElement, UBModalTitleProps>(
  ({ asChild = false, className, children, ...restProps }, ref) => {
    return (
      <Dialog.Title
        asChild={asChild}
        ref={ref}
        className={`${styles.title} ${className || ''}`}
        {...restProps}
      >
        {asChild ? children : <h2>{children}</h2>}
      </Dialog.Title>
    );
  }
);

// Modal Description Component
interface UBModalDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  asChild?: boolean;
}

const UBModalDescription = forwardRef<HTMLParagraphElement, UBModalDescriptionProps>(
  ({ asChild = false, className, children, ...restProps }, ref) => {
    return (
      <Dialog.Description
        asChild={asChild}
        ref={ref}
        className={`${styles.description} ${className || ''}`}
        {...restProps}
      >
        {asChild ? children : <p>{children}</p>}
      </Dialog.Description>
    );
  }
);

// Modal Body Component
interface UBModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

const UBModalBody = forwardRef<HTMLDivElement, UBModalBodyProps>(
  ({ className, children, ...restProps }, ref) => {
    return (
      <div ref={ref} className={`${styles.body} ${className || ''}`} {...restProps}>
        {children}
      </div>
    );
  }
);

// Modal Footer Component
interface UBModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const UBModalFooter = forwardRef<HTMLDivElement, UBModalFooterProps>(
  ({ className, children, ...restProps }, ref) => {
    return (
      <div ref={ref} className={`${styles.footer} ${className || ''}`} {...restProps}>
        {children}
      </div>
    );
  }
);

// Modal Close Component (for custom close buttons)
interface UBModalCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const UBModalClose = forwardRef<HTMLButtonElement, UBModalCloseProps>(
  ({ asChild = false, className, children, ...restProps }, ref) => {
    return (
      <Dialog.Close asChild={asChild} ref={ref} className={className} {...restProps}>
        {asChild ? (
          children
        ) : (
          <button className={className} {...restProps}>
            {children}
          </button>
        )}
      </Dialog.Close>
    );
  }
);

// Compound component with sub-components
const UBModal = Object.assign(UBModalRoot, {
  Trigger: UBModalTrigger,
  Content: UBModalContent,
  Header: UBModalHeader,
  Title: UBModalTitle,
  Description: UBModalDescription,
  Body: UBModalBody,
  Footer: UBModalFooter,
  Close: UBModalClose,
});

// Set display names
UBModalRoot.displayName = 'UBModal';
UBModalTrigger.displayName = 'UBModal.Trigger';
UBModalContent.displayName = 'UBModal.Content';
UBModalHeader.displayName = 'UBModal.Header';
UBModalTitle.displayName = 'UBModal.Title';
UBModalDescription.displayName = 'UBModal.Description';
UBModalBody.displayName = 'UBModal.Body';
UBModalFooter.displayName = 'UBModal.Footer';
UBModalClose.displayName = 'UBModal.Close';

export default UBModal;
export type {
  UBModalProps,
  UBModalTriggerProps,
  UBModalContentProps,
  UBModalHeaderProps,
  UBModalTitleProps,
  UBModalDescriptionProps,
  UBModalBodyProps,
  UBModalFooterProps,
  UBModalCloseProps,
};
