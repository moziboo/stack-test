import { forwardRef } from 'react';
import styles from './UBTag.module.css';

interface UBTagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  removable?: boolean;
  onRemove?: () => void;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const UBTag = forwardRef<HTMLSpanElement, UBTagProps>(
  (
    {
      variant = 'default',
      size = 'md',
      removable = false,
      onRemove,
      icon,
      className,
      children,
      ...restProps
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={`${styles.tag} ${styles[variant]} ${styles[size]} ${className || ''}`}
        {...restProps}
      >
        {icon && <span className={styles.icon}>{icon}</span>}
        <span className={styles.content}>{children}</span>
        {removable && onRemove && (
          <button
            type="button"
            className={styles.removeButton}
            onClick={onRemove}
            aria-label={`Remove ${children} tag`}
          >
            <span className={styles.removeIcon}>×</span>
          </button>
        )}
      </span>
    );
  }
);

UBTag.displayName = 'UBTag';

export default UBTag;
export type { UBTagProps };
