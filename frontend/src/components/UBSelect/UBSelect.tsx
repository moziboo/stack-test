import { useId, forwardRef } from 'react';
import { Select, Label } from 'radix-ui';
import styles from './UBSelect.module.css';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface UBSelectProps {
  options: SelectOption[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  id?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

const UBSelect = forwardRef<React.ElementRef<typeof Select.Root>, UBSelectProps>(
  (
    {
      options,
      value,
      onValueChange,
      placeholder = 'Select an option...',
      label,
      id,
      disabled = false,
      required = false,
      className,
      ...restProps
    },
    ref
  ) => {
    const generatedId = useId();
    const selectId = id || generatedId;

    const selectElement = (
      <Select.Root
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        required={required}
        {...restProps}
      >
        <Select.Trigger
          ref={ref}
          id={selectId}
          className={`${styles.trigger} ${disabled ? styles.disabled : ''} ${className || ''}`}
          aria-label={label}
        >
          <Select.Value placeholder={placeholder} />
          <Select.Icon className={styles.icon}>
            <span>▼</span>
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content className={styles.content} position="item-aligned" sideOffset={4}>
            <Select.Viewport className={styles.viewport}>
              {options.map(option => (
                <Select.Item
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className={`${styles.item} ${option.disabled ? styles.itemDisabled : ''}`}
                >
                  <Select.ItemText>{option.label}</Select.ItemText>
                  <Select.ItemIndicator className={styles.itemIndicator}>
                    <span>✓</span>
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    );

    // If no label is provided, just render the select (for use with Radix Form)
    if (!label) {
      return selectElement;
    }

    // If label is provided, render with wrapper and label
    return (
      <div className={styles.selectWrapper}>
        <Label.Root
          className={`${styles.label} ${disabled ? styles.disabled : ''}`}
          htmlFor={selectId}
        >
          {label}
          {required && <span className={styles.required}>*</span>}
        </Label.Root>
        {selectElement}
      </div>
    );
  }
);

UBSelect.displayName = 'UBSelect';

export default UBSelect;
export type { UBSelectProps, SelectOption };
