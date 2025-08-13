import * as React from 'react';
import { useForm } from '@tanstack/react-form';
import UBInput from '../UBInput/UBInput';
import UBSelect from '../UBSelect/UBSelect';
import UBCheckbox from '../UBCheckbox/UBCheckbox';
import UBButton from '../UBButton/UBButton';
import styles from './UBAutoForm.module.css';
import type { SelectOption } from '../UBSelect/UBSelect';

// ===========================
// AutoForm Types
// ===========================

// The config for a default-supported field type
type DefaultFieldConfig =
  | {
      type: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';
      label: string;
      required?: boolean;
      placeholder?: string;
    }
  | {
      type: 'select';
      label: string;
      options: SelectOption[];
      required?: boolean;
      placeholder?: string;
    }
  | { type: 'checkbox'; label: string };

// The config for a custom-rendered field
type CustomFieldConfig = {
  label: string;
  render: (field: unknown) => React.ReactNode;
  required?: boolean;
};

// Combined field config type
type FieldConfig = DefaultFieldConfig | CustomFieldConfig;

// Map of form field names to configs
type FieldsConfig<TFormValues> = {
  [K in keyof TFormValues]: FieldConfig;
};

interface UBAutoFormProps<TFormValues extends Record<string, unknown>> {
  defaultValues: TFormValues;
  fields: FieldsConfig<TFormValues>;
  onSubmit: (values: TFormValues) => Promise<void> | void;
  submitButtonText?: string;
  className?: string;
  disabled?: boolean;
}

// ===========================
// UBAutoForm Implementation
// ===========================
export function UBAutoForm<TFormValues extends Record<string, unknown>>({
  defaultValues,
  fields,
  onSubmit,
  submitButtonText = 'Submit',
  className,
  disabled = false,
}: UBAutoFormProps<TFormValues>) {
  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }: { value: TFormValues }) => {
      await onSubmit(value);
    },
  });

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className={`${styles.form} ${className || ''}`}
      >
        {(Object.entries(fields) as [keyof TFormValues, FieldConfig][]).map(([name, config]) => {
          const validators =
            'required' in config &&
            config.required &&
            (!('type' in config) || (config as DefaultFieldConfig).type !== 'checkbox')
              ? {
                  onChange: (value: unknown) =>
                    !value ? `${config.label} is required` : undefined,
                }
              : undefined;

          return (
            <form.Field key={String(name)} name={String(name)} validators={validators}>
              {field => {
                // 🎯 CUSTOM RENDER ESCAPE HATCH
                if ('render' in config && typeof config.render === 'function') {
                  return <div className={styles.fieldWrapper}>{config.render(field)}</div>;
                }

                // 🎯 DEFAULT TYPE MAPPING - Cast to any to avoid complex type issues
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const fieldApi = field as any;
                const fieldConfig = config as DefaultFieldConfig;

                switch (fieldConfig.type) {
                  case 'text':
                  case 'password':
                  case 'email':
                  case 'number':
                  case 'tel':
                  case 'url':
                  case 'search':
                    return (
                      <div className={styles.fieldWrapper}>
                        <UBInput
                          label={fieldConfig.label}
                          type={fieldConfig.type}
                          placeholder={fieldConfig.placeholder}
                          value={String(fieldApi.state.value || '')}
                          onChange={e => fieldApi.handleChange(e.target.value)}
                          onBlur={fieldApi.handleBlur}
                          disabled={disabled}
                        />
                        {fieldApi.state.meta.errors?.[0] && (
                          <span className={styles.errorText}>{fieldApi.state.meta.errors[0]}</span>
                        )}
                      </div>
                    );
                  case 'select':
                    return (
                      <div className={styles.fieldWrapper}>
                        <UBSelect
                          label={fieldConfig.label}
                          placeholder={fieldConfig.placeholder}
                          value={String(fieldApi.state.value || '')}
                          onChange={e => fieldApi.handleChange(e.target.value)}
                          onBlur={fieldApi.handleBlur}
                          options={fieldConfig.options}
                          disabled={disabled}
                        />
                        {fieldApi.state.meta.errors?.[0] && (
                          <span className={styles.errorText}>{fieldApi.state.meta.errors[0]}</span>
                        )}
                      </div>
                    );
                  case 'checkbox':
                    return (
                      <div className={styles.fieldWrapper}>
                        <UBCheckbox
                          label={fieldConfig.label}
                          checked={Boolean(fieldApi.state.value)}
                          onCheckedChange={checked => fieldApi.handleChange(checked)}
                          disabled={disabled}
                        />
                        {fieldApi.state.meta.errors?.[0] && (
                          <span className={styles.errorText}>{fieldApi.state.meta.errors[0]}</span>
                        )}
                      </div>
                    );
                  default:
                    return null;
                }
              }}
            </form.Field>
          );
        })}

        <div className={styles.submitWrapper}>
          <UBButton type="submit" disabled={disabled || !form.state.canSubmit}>
            {submitButtonText}
          </UBButton>
        </div>
      </form>
    </div>
  );
}

export default UBAutoForm;

// Export types for consumers
export type { DefaultFieldConfig, CustomFieldConfig, FieldConfig, FieldsConfig, UBAutoFormProps };
