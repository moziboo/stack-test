import { forwardRef } from 'react';
import styles from './UBDivider.module.css';

interface UBDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed' | 'dotted';
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

const UBDivider = forwardRef<HTMLDivElement, UBDividerProps>(
  (
    { orientation = 'horizontal', variant = 'solid', spacing = 'md', className, ...restProps },
    ref
  ) => {
    return (
      <div
        ref={ref}
        role="separator"
        className={`${styles.dividerContainer} ${styles[orientation]} ${styles[`spacing-${spacing}`]} ${className || ''}`}
        {...restProps}
      >
        <div
          className={`${styles.divider} ${styles[variant]} ${styles.full}`}
          role="presentation"
        />
      </div>
    );
  }
);

UBDivider.displayName = 'UBDivider';

export default UBDivider;
export type { UBDividerProps };
