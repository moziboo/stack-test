import { forwardRef } from 'react';
import styles from './UBCard.module.css';

// Card Root Component
interface UBCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const UBCardRoot = forwardRef<HTMLDivElement, UBCardProps>(
  ({ variant = 'default', padding = 'md', className, children, ...restProps }, ref) => {
    return (
      <div
        ref={ref}
        className={`${styles.card} ${styles[variant]} ${styles[`padding-${padding}`]} ${className || ''}`}
        {...restProps}
      >
        {children}
      </div>
    );
  }
);

// Card Header Component
interface UBCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  divider?: boolean;
}

const UBCardHeader = forwardRef<HTMLDivElement, UBCardHeaderProps>(
  ({ divider = false, className, children, ...restProps }, ref) => {
    return (
      <div
        ref={ref}
        className={`${styles.header} ${divider ? styles.headerDivider : ''} ${className || ''}`}
        {...restProps}
      >
        {children}
      </div>
    );
  }
);

// Card Body Component
interface UBCardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const UBCardBody = forwardRef<HTMLDivElement, UBCardBodyProps>(
  ({ padding = 'inherit', className, children, ...restProps }, ref) => {
    return (
      <div
        ref={ref}
        className={`${styles.body} ${padding !== 'inherit' ? styles[`padding-${padding}`] : ''} ${className || ''}`}
        {...restProps}
      >
        {children}
      </div>
    );
  }
);

// Card Footer Component
interface UBCardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  divider?: boolean;
  justify?: 'start' | 'center' | 'end' | 'between';
}

const UBCardFooter = forwardRef<HTMLDivElement, UBCardFooterProps>(
  ({ divider = false, justify = 'end', className, children, ...restProps }, ref) => {
    return (
      <div
        ref={ref}
        className={`${styles.footer} ${divider ? styles.footerDivider : ''} ${styles[`justify-${justify}`]} ${className || ''}`}
        {...restProps}
      >
        {children}
      </div>
    );
  }
);

// Compound component with sub-components
const UBCard = Object.assign(UBCardRoot, {
  Header: UBCardHeader,
  Body: UBCardBody,
  Footer: UBCardFooter,
});

// Set display names
UBCardRoot.displayName = 'UBCard';
UBCardHeader.displayName = 'UBCard.Header';
UBCardBody.displayName = 'UBCard.Body';
UBCardFooter.displayName = 'UBCard.Footer';

export default UBCard;
export type { UBCardProps, UBCardHeaderProps, UBCardBodyProps, UBCardFooterProps };
