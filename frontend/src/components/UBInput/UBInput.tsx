import { useId, forwardRef } from 'react';
import { Label } from 'radix-ui';
import styles from './UBInput.module.css';

interface UBInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
}

const UBInput = forwardRef<HTMLInputElement, UBInputProps>(
  (
    {
      label,
      id,
      type = 'text',
      placeholder,
      disabled = false,
      required = false,
      value,
      defaultValue,
      onChange,
      onBlur,
      onFocus,
      autoComplete,
      maxLength,
      minLength,
      pattern,
      readOnly = false,
      name,
      className,
      ...restProps
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event);
    };

    // If no label is provided, just render the input (for use with Radix Form)
    if (!label) {
      return (
        <input
          ref={ref}
          id={inputId}
          name={name}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          onBlur={onBlur}
          onFocus={onFocus}
          autoComplete={autoComplete}
          maxLength={maxLength}
          minLength={minLength}
          pattern={pattern}
          readOnly={readOnly}
          className={`${styles.input} ${disabled ? styles.disabled : ''} ${readOnly ? styles.readOnly : ''} ${className || ''}`}
          {...restProps}
        />
      );
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
        <input
          ref={ref}
          id={inputId}
          name={name}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          onBlur={onBlur}
          onFocus={onFocus}
          autoComplete={autoComplete}
          maxLength={maxLength}
          minLength={minLength}
          pattern={pattern}
          readOnly={readOnly}
          className={`${styles.input} ${disabled ? styles.disabled : ''} ${readOnly ? styles.readOnly : ''} ${className || ''}`}
          {...restProps}
        />
      </div>
    );
  }
);

UBInput.displayName = 'UBInput';

export default UBInput;
