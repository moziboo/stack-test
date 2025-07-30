import { Checkbox } from 'radix-ui';
import styles from './UBCheckbox.module.css';

interface UBCheckboxProps {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  id?: string;
  disabled?: boolean;
}

const UBCheckbox = ({ checked, onCheckedChange, label, id = 'c1', disabled }: UBCheckboxProps) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Checkbox.Root
        className={`${styles.checkboxRoot} ${checked ? styles.checked : styles.unchecked}`}
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
      >
        <Checkbox.Indicator className={styles.checkboxIndicator}>*</Checkbox.Indicator>
      </Checkbox.Root>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
    </div>
  );
};

export default UBCheckbox;
