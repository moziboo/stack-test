import { forwardRef } from 'react';
import styles from './UBTag.module.css';

interface UBTagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  removable?: boolean;
  onRemove?: () => void;
  children: React.ReactNode;
}

const UBTag = forwardRef<HTMLSpanElement, UBTagProps>(
  ({ size = 'sm', removable = false, onRemove, className, children, ...restProps }, ref) => {
    return (
      <span ref={ref} className={`${styles.tag} ${styles[size]} ${className || ''}`} {...restProps}>
        <span className={styles.content}>{children}</span>
        {removable && onRemove && (
          <button
            type="button"
            className={styles.removeButton}
            onClick={onRemove}
            aria-label={`Remove ${children} tag`}
          >
            <span className={styles.removeIcon}>x</span>
          </button>
        )}
      </span>
    );
  }
);

UBTag.displayName = 'UBTag';

export default UBTag;
export type { UBTagProps };
