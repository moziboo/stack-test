import { Checkbox } from 'radix-ui';
import styles from './Checkbox.module.css';
import { useState } from 'react';

const CheckboxDemo = () => {
  const [checked, setChecked] = useState(false);

  const handleCheckedChange = (isChecked: boolean) => {
    console.log('clicked');
    setChecked(isChecked);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid red' }}>
      <Checkbox.Root
        checked={checked}
        onCheckedChange={handleCheckedChange}
        className={styles.Root}
        defaultChecked
        id="c1"
      >
        <Checkbox.Indicator className={styles.Indicator}>X</Checkbox.Indicator>
      </Checkbox.Root>
      <label className={styles.Label} htmlFor="c1">
        Accept terms and conditions.
      </label>
    </div>
  );
};

export default CheckboxDemo;
