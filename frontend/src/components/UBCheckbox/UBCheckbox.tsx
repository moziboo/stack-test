import { useId } from 'react';
import { Checkbox } from 'radix-ui';
import styles from './UBCheckbox.module.css';

interface UBCheckboxProps {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  id?: string;
  disabled?: boolean;
}

const UBCheckbox = ({ checked, onCheckedChange, label, id, disabled }: UBCheckboxProps) => {
  const generatedId = useId();
  const checkboxId = id || generatedId;

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Checkbox.Root
        className={`${styles.checkboxRoot} ${checked ? styles.checked : styles.unchecked} ${disabled ? styles.disabled : ''}`}
        id={checkboxId}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
      >
        <Checkbox.Indicator className={styles.checkboxIndicator}>*</Checkbox.Indicator>
      </Checkbox.Root>
      {label && (
        <label
          className={`${styles.label} ${disabled ? styles.disabled : ''}`}
          htmlFor={checkboxId}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default UBCheckbox;
