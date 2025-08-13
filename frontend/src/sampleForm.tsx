import { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { UBAutoForm } from './components/UBAutoForm';
import type { FieldsConfig } from './components/UBAutoForm';

// Original simple form for comparison
function SimpleForm() {
  const form = useForm({
    defaultValues: { firstName: '', email: '' },
    onSubmit: async ({ value }) => alert(JSON.stringify(value, null, 2)),
  });

  return (
    <div
      style={{
        marginBottom: '2rem',
        padding: '1rem',
        border: '1px solid #ddd',
        borderRadius: '8px',
      }}
    >
      <h3>Original TanStack Form (for comparison)</h3>
      <form
        noValidate
        onSubmit={e => {
          e.preventDefault();
          form.handleSubmit();
        }}
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 300 }}
      >
        <form.Field
          name="firstName"
          validators={{ onChange: ({ value }) => (!value ? 'First name is required' : undefined) }}
        >
          {field => (
            <div>
              <label>
                First Name:
                <input
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Enter first name"
                  style={{ display: 'block', padding: 4, width: '100%' }}
                />
              </label>
              {field.state.meta.errors?.[0] && (
                <span style={{ color: 'red' }}>{field.state.meta.errors[0]}</span>
              )}
            </div>
          )}
        </form.Field>

        <form.Field
          name="email"
          validators={{
            onChange: ({ value }) => {
              if (!value) return 'Email is required';
              if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) return 'Invalid email address';
              return undefined;
            },
          }}
        >
          {field => (
            <div>
              <label>
                Email:
                <input
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Enter email"
                  style={{ display: 'block', padding: 4, width: '100%' }}
                />
              </label>
              {field.state.meta.errors?.[0] && (
                <span style={{ color: 'red' }}>{field.state.meta.errors[0]}</span>
              )}
            </div>
          )}
        </form.Field>

        <button type="submit" style={{ padding: '6px 12px' }} disabled={!form.state.canSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

// User registration form using UBAutoForm
interface UserFormData extends Record<string, unknown> {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  country: string;
  notifications: boolean;
  bio: string;
}

function UserRegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues: UserFormData = {
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    country: '',
    notifications: false,
    bio: '',
  };

  const fields: FieldsConfig<UserFormData> = {
    firstName: {
      type: 'text',
      label: 'First Name',
      required: true,
      placeholder: 'Enter your first name',
    },
    lastName: {
      type: 'text',
      label: 'Last Name',
      required: true,
      placeholder: 'Enter your last name',
    },
    email: {
      type: 'email',
      label: 'Email Address',
      required: true,
      placeholder: 'Enter your email',
    },
    age: {
      type: 'number',
      label: 'Age',
      placeholder: 'Enter your age',
    },
    country: {
      type: 'select',
      label: 'Country',
      required: true,
      options: [
        { label: 'United States', value: 'us' },
        { label: 'Canada', value: 'ca' },
        { label: 'United Kingdom', value: 'uk' },
        { label: 'Germany', value: 'de' },
        { label: 'France', value: 'fr' },
        { label: 'Japan', value: 'jp' },
        { label: 'Australia', value: 'au' },
      ],
      placeholder: 'Select your country',
    },
    notifications: {
      type: 'checkbox',
      label: 'Send me email notifications',
    },
    bio: {
      type: 'text',
      label: 'Bio (Optional)',
      placeholder: 'Tell us about yourself',
    },
  };

  const handleSubmit = async (values: UserFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert(`✅ Account created successfully!\n\n${JSON.stringify(values, null, 2)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h3>UBAutoForm - User Registration</h3>
      <UBAutoForm
        defaultValues={defaultValues}
        fields={fields}
        onSubmit={handleSubmit}
        submitButtonText={isSubmitting ? 'Creating Account...' : 'Create Account'}
        disabled={isSubmitting}
      />
    </div>
  );
}

// Contact form with custom field rendering
interface ContactFormData extends Record<string, unknown> {
  name: string;
  email: string;
  subject: string;
  priority: string;
  message: string;
}

function ContactForm() {
  const defaultValues: ContactFormData = {
    name: '',
    email: '',
    subject: '',
    priority: '',
    message: '',
  };

  const fields: FieldsConfig<ContactFormData> = {
    name: {
      type: 'text',
      label: 'Your Name',
      required: true,
      placeholder: 'Enter your full name',
    },
    email: {
      type: 'email',
      label: 'Email Address',
      required: true,
      placeholder: 'Enter your email',
    },
    subject: {
      type: 'select',
      label: 'Subject',
      required: true,
      options: [
        { label: 'General Inquiry', value: 'general' },
        { label: 'Technical Support', value: 'support' },
        { label: 'Bug Report', value: 'bug' },
        { label: 'Feature Request', value: 'feature' },
        { label: 'Business Partnership', value: 'partnership' },
      ],
      placeholder: 'Select a subject',
    },
    priority: {
      label: 'Priority Level',
      required: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (field: any) => (
        <div>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
            Priority Level *
          </label>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {[
              { value: 'low', label: 'Low', color: '#28a745' },
              { value: 'medium', label: 'Medium', color: '#ffc107' },
              { value: 'high', label: 'High', color: '#fd7e14' },
              { value: 'urgent', label: 'Urgent', color: '#dc3545' },
            ].map(priority => (
              <label
                key={priority.value}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  padding: '8px 12px',
                  border:
                    field.state.value === priority.value
                      ? `2px solid ${priority.color}`
                      : '1px solid #ccc',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  backgroundColor:
                    field.state.value === priority.value ? `${priority.color}20` : 'transparent',
                }}
              >
                <input
                  type="radio"
                  name="priority"
                  value={priority.value}
                  checked={field.state.value === priority.value}
                  onChange={e => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  style={{ margin: 0 }}
                />
                <span style={{ color: priority.color, fontWeight: 500 }}>{priority.label}</span>
              </label>
            ))}
          </div>
          {field.state.meta.errors[0] && (
            <span style={{ fontSize: 12, color: '#dc3545', marginTop: 4, display: 'block' }}>
              {field.state.meta.errors[0]}
            </span>
          )}
        </div>
      ),
    },
    message: {
      label: 'Message',
      required: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (field: any) => (
        <div>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Message *</label>
          <textarea
            value={String(field.state.value || '')}
            onChange={e => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            placeholder="Enter your message here..."
            rows={5}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px',
              fontFamily: 'inherit',
              resize: 'vertical',
            }}
          />
          {field.state.meta.errors[0] && (
            <span style={{ fontSize: 12, color: '#dc3545', marginTop: 4, display: 'block' }}>
              {field.state.meta.errors[0]}
            </span>
          )}
        </div>
      ),
    },
  };

  const handleSubmit = async (values: ContactFormData) => {
    alert(`📧 Message sent!\n\n${JSON.stringify(values, null, 2)}`);
  };

  return (
    <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h3>UBAutoForm - Contact Form (with custom fields)</h3>
      <UBAutoForm
        defaultValues={defaultValues}
        fields={fields}
        onSubmit={handleSubmit}
        submitButtonText="Send Message"
      />
    </div>
  );
}

// Main demo component
export default function FormDemo() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        padding: '2rem',
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      <div>
        <h1>Form Component Examples</h1>
        <p>
          Comparing the original TanStack Form implementation with the new UBAutoForm component.
        </p>
      </div>

      <SimpleForm />
      <UserRegistrationForm />
      <ContactForm />
    </div>
  );
}
