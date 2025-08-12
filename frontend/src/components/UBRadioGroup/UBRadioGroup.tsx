import { useId, forwardRef } from 'react';
import { RadioGroup, Label } from 'radix-ui';
import styles from './UBRadioGroup.module.css';

interface RadioOption {
  value: string;
  label: string;
  id?: string;
}

interface UBRadioGroupProps {
  options: RadioOption[];
  value: string;
  onValueChange: (value: string) => void;
  ariaLabel?: string;
  direction?: 'column' | 'row';
  disabled?: boolean;
}

const UBRadioGroup = forwardRef<React.ElementRef<typeof RadioGroup.Root>, UBRadioGroupProps>(
  (
    {
      options,
      value,
      onValueChange,
      ariaLabel,
      direction = 'column',
      disabled = false,
      ...restProps
    },
    ref
  ) => {
    const generatedId = useId();

    return (
      <RadioGroup.Root
        ref={ref}
        className={`${styles.radioGroupRoot} ${styles[direction]}`}
        value={value}
        onValueChange={onValueChange}
        aria-label={ariaLabel}
        disabled={disabled}
        {...restProps}
      >
        {options.map((option, index) => {
          const radioId = option.id || `${generatedId}-${index}`;

          return (
            <div key={option.value} style={{ display: 'flex', alignItems: 'center' }}>
              <RadioGroup.Item
                className={`${styles.radioGroupItem} ${
                  value === option.value ? styles.selected : styles.unselected
                } ${disabled ? styles.disabled : ''}`}
                value={option.value}
                id={radioId}
              >
                <span className={styles.radioGroupItemIndicator}>*</span>
              </RadioGroup.Item>
              <Label.Root
                className={`${styles.label}  ${disabled ? styles.disabled : ''}`}
                htmlFor={radioId}
              >
                {option.label}
              </Label.Root>
            </div>
          );
        })}
      </RadioGroup.Root>
    );
  }
);

UBRadioGroup.displayName = 'UBRadioGroup';

export default UBRadioGroup;
