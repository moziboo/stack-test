import styles from './UBLayoutTweaking.module.css';
import { useState } from 'react';
import UBButton from '../UBButton/UBButton';
import UBInput from '../UBInput/UBInput';
import UBSelect from '../UBSelect/UBSelect';
import UBCheckbox from '../UBCheckbox/UBCheckbox';
import UBRadioGroup from '../UBRadioGroup/UBRadioGroup';
import UBDivider from '../UBDivider/UBDivider';
import UBTextarea from '../UBTextarea/UBTextarea';

const UBLayoutTweaking = () => {
  return (
    <div className={styles.container}>
      <h2>Howdy Pardner</h2>
      <UBInput />
      <UBSelect
        options={[
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
          { label: 'Option 3', value: 'option3' },
        ]}
      />
      <UBDivider variant="dashed" />
      <UBCheckbox label="Click me" checked={true} onCheckedChange={() => {}} />
      <UBRadioGroup
        options={[
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
          { label: 'Option 3', value: 'option3' },
          { label: 'Option 4', value: 'option4' },
        ]}
        value={'option3'}
        direction="row"
        onValueChange={() => {}}
      />
      <UBTextarea />
      <UBDivider variant="dashed" />
      <UBButton>Click me</UBButton>
    </div>
  );
};

export default UBLayoutTweaking;
