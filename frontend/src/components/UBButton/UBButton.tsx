import { forwardRef } from 'react';
import styles from './UBButton.module.css';

interface UBButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

const UBButton = forwardRef<HTMLButtonElement, UBButtonProps>(
  ({ label, className, disabled, children, type = 'button', ...restProps }, ref) => {
    const content = children ?? label;

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={`${styles.button} ${disabled ? styles.disabled : ''} ${className || ''}`.trim()}
        {...restProps}
      >
        {content}
      </button>
    );
  }
);

UBButton.displayName = 'UBButton';

export default UBButton;
