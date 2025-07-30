import { RadioGroup } from 'radix-ui';
import styles from './UBRadioGroup.module.css';

interface RadioOption {
  value: string;
  label: string;
  id?: string;
}

interface UBRadioGroupProps {
  options: RadioOption[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  ariaLabel?: string;
  direction?: 'column' | 'row';
}

const UBRadioGroup = ({
  options,
  defaultValue,
  value,
  onValueChange,
  ariaLabel,
  direction = 'column',
}: UBRadioGroupProps) => (
  <RadioGroup.Root
    className={`${styles.radioGroupRoot} ${styles[direction]}`}
    defaultValue={defaultValue}
    value={value}
    onValueChange={onValueChange}
    aria-label={ariaLabel}
  >
    {options.map((option, index) => (
      <div key={option.value} style={{ display: 'flex', alignItems: 'center' }}>
        <RadioGroup.Item
          className={`${styles.radioGroupItem} ${
            value === option.value ? styles.selected : styles.unselected
          }`}
          value={option.value}
          id={option.id || `radio-${option.value}-${index}`}
        >
          <div className={styles.radioGroupIndicator}>*</div>
        </RadioGroup.Item>
        <label className={styles.label} htmlFor={option.id || `radio-${option.value}-${index}`}>
          {option.label}
        </label>
      </div>
    ))}
  </RadioGroup.Root>
);

export default UBRadioGroup;
