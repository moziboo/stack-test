import { forwardRef } from 'react';
import styles from './UBDivider.module.css';

interface UBDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed' | 'dotted';
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  label?: string;
  labelPosition?: 'left' | 'center' | 'right';
}

const UBDivider = forwardRef<HTMLDivElement, UBDividerProps>(
  (
    {
      orientation = 'horizontal',
      variant = 'solid',
      spacing = 'md',
      label,
      labelPosition = 'center',
      className,
      ...restProps
    },
    ref
  ) => {
    if (label && orientation === 'horizontal') {
      return (
        <div
          ref={ref}
          className={`${styles.dividerContainer} ${styles[orientation]} ${styles[`spacing-${spacing}`]} ${className || ''}`}
          {...restProps}
        >
          <div className={`${styles.divider} ${styles[variant]}`} />
          <span className={`${styles.label} ${styles[`label-${labelPosition}`]}`}>{label}</span>
          <div className={`${styles.divider} ${styles[variant]}`} />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role="separator"
        className={`${styles.dividerContainer} ${styles[orientation]} ${styles[`spacing-${spacing}`]} ${className || ''}`}
        {...restProps}
      >
        <div className={`${styles.divider} ${styles[variant]} ${styles.full}`} />
      </div>
    );
  }
);

UBDivider.displayName = 'UBDivider';

export default UBDivider;
export type { UBDividerProps };
