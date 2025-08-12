import { forwardRef } from 'react';
import styles from './UBAlert.module.css';

interface UBAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: React.ReactNode;
}

const UBAlert = forwardRef<HTMLDivElement, UBAlertProps>(
  (
    {
      variant = 'info',
      title,
      dismissible = false,
      onDismiss,
      icon,
      className,
      children,
      ...restProps
    },
    ref
  ) => {
    const defaultIcons = {
      info: 'ℹ️',
      success: '✅',
      warning: '⚠️',
      error: '❌',
    };

    const alertIcon = icon || defaultIcons[variant];

    return (
      <div
        ref={ref}
        role="alert"
        className={`${styles.alert} ${styles[variant]} ${className || ''}`}
        {...restProps}
      >
        <div className={styles.content}>
          {alertIcon && (
            <div className={styles.iconContainer}>
              {typeof alertIcon === 'string' ? (
                <span className={styles.icon}>{alertIcon}</span>
              ) : (
                alertIcon
              )}
            </div>
          )}

          <div className={styles.messageContainer}>
            {title && <div className={styles.title}>{title}</div>}
            {children && <div className={styles.message}>{children}</div>}
          </div>
        </div>

        {dismissible && (
          <button
            type="button"
            className={styles.dismissButton}
            onClick={onDismiss}
            aria-label="Dismiss alert"
          >
            <span className={styles.dismissIcon}>×</span>
          </button>
        )}
      </div>
    );
  }
);

UBAlert.displayName = 'UBAlert';

export default UBAlert;
export type { UBAlertProps };
