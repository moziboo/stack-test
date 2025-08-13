import { useId, forwardRef } from 'react';
import { Label } from 'radix-ui';
import styles from './UBTextarea.module.css';

interface UBTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
}

const UBTextarea = forwardRef<HTMLTextAreaElement, UBTextareaProps>(
  (
    { label, id, resize = 'vertical', className, disabled, readOnly, rows = 4, ...restProps },
    ref
  ) => {
    const generatedId = useId();
    const textareaId = id || generatedId;

    const textareaElement = (
      <textarea
        ref={ref}
        disabled={disabled}
        readOnly={readOnly}
        rows={rows}
        {...restProps}
        id={textareaId}
        className={`${styles.textarea} ${disabled ? styles.disabled : ''} ${readOnly ? styles.readOnly : ''} ${styles[resize]} ${className || ''}`}
      />
    );

    // If no label is provided, just render the textarea (for use with Radix Form)
    if (!label) {
      return textareaElement;
    }

    // If label is provided, render with our wrapper and label
    return (
      <div className={styles.textareaWrapper}>
        <Label.Root
          className={`${styles.label} ${disabled ? styles.disabled : ''}`}
          htmlFor={textareaId}
        >
          {label}
        </Label.Root>
        {textareaElement}
      </div>
    );
  }
);

UBTextarea.displayName = 'UBTextarea';

export default UBTextarea;
export type { UBTextareaProps };
