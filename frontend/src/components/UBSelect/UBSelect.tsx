import { useId, forwardRef } from 'react';
import { Label } from 'radix-ui';
import styles from './UBSelect.module.css';

export interface SelectOption {
  label: string;
  value: string;
}

interface UBSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
}

const UBSelect = forwardRef<HTMLSelectElement, UBSelectProps>(
  (
    { label, options, placeholder = 'Select...', error, id, className, disabled, ...restProps },
    ref
  ) => {
    const generatedId = useId();
    const selectId = id || generatedId;

    const selectElement = (
      <>
        <select
          ref={ref}
          disabled={disabled}
          {...restProps}
          id={selectId}
          className={`${styles.select} ${disabled ? styles.disabled : ''} ${error ? styles.error : ''} ${className || ''}`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <span className={styles.errorText}>{error}</span>}
      </>
    );

    // If no label is provided, just render the select (for use with forms)
    if (!label) {
      return <div className={styles.selectWrapper}>{selectElement}</div>;
    }

    // If label is provided, render with our wrapper and label
    return (
      <div className={styles.selectWrapper}>
        <Label.Root
          className={`${styles.label} ${disabled ? styles.disabled : ''}`}
          htmlFor={selectId}
        >
          {label}
        </Label.Root>
        {selectElement}
      </div>
    );
  }
);

UBSelect.displayName = 'UBSelect';

export default UBSelect;
