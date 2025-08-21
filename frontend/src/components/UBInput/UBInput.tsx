import { useId, forwardRef } from 'react';
import { Label } from 'radix-ui';
import styles from './UBInput.module.css';

interface UBInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
}

const UBInput = forwardRef<HTMLInputElement, UBInputProps>(
  ({ label, id, type = 'text', className, disabled, readOnly, ...restProps }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    const inputElement = (
      <input
        ref={ref}
        disabled={disabled}
        readOnly={readOnly}
        {...restProps}
        id={inputId}
        type={type}
        className={`${styles.input} ${disabled ? styles.disabled : ''} ${readOnly ? styles.readOnly : ''} ${className || ''}`}
      />
    );

    // If no label is provided, just render the input (for use with Radix Form)
    if (!label) {
      return inputElement;
    }

    // If label is provided, render with our wrapper and label
    return (
      <div className={styles.inputWrapper}>
        <Label.Root
          className={`${styles.label} ${disabled ? styles.disabled : ''}`}
          htmlFor={inputId}
        >
          {label}
        </Label.Root>
        {inputElement}
      </div>
    );
  }
);

UBInput.displayName = 'UBInput';

export default UBInput;
export type { UBInputProps };
