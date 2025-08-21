import { useId, forwardRef } from 'react';
import { Checkbox, Label } from 'radix-ui';
import styles from './UBCheckbox.module.css';

interface UBCheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  id?: string;
  disabled?: boolean;
}

const UBCheckbox = forwardRef<React.ElementRef<typeof Checkbox.Root>, UBCheckboxProps>(
  ({ checked, onCheckedChange, label, id, disabled, ...restProps }, ref) => {
    const generatedId = useId();
    const checkboxId = id || generatedId;

    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Checkbox.Root
          ref={ref}
          className={`${styles.checkboxRoot} ${checked ? styles.checked : styles.unchecked} ${disabled ? styles.disabled : ''}`}
          id={checkboxId}
          checked={checked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
          {...restProps}
        >
          <Checkbox.Indicator className={styles.checkboxIndicator}>*</Checkbox.Indicator>
        </Checkbox.Root>
        {label && (
          <Label.Root
            className={`${styles.label} ${disabled ? styles.disabled : ''}`}
            htmlFor={checkboxId}
          >
            {label}
          </Label.Root>
        )}
      </div>
    );
  }
);

UBCheckbox.displayName = 'UBCheckbox';

export default UBCheckbox;
export type { UBCheckboxProps };
