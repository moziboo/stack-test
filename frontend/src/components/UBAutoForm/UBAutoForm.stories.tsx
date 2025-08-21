import type { Meta, StoryObj } from '@storybook/react-vite';
import { UBAutoForm } from './UBAutoForm';
import type { FieldsConfig } from './UBAutoForm';

const meta: Meta<typeof UBAutoForm> = {
  title: 'ToReview/UBAutoForm',
  component: UBAutoForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A powerful automatic form component that generates forms from field configurations. Uses TanStack React Form for state management and validation.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof UBAutoForm>;

// Sample form data types
interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  country: string;
  newsletter: boolean;
  bio: string;
}

interface LoginFormData {
  username: string;
  password: string;
  rememberMe: boolean;
}

const handleSubmit = async (values: any) => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
  alert(`Form submitted with values:\n${JSON.stringify(values, null, 2)}`);
};

// Basic user registration form
export const UserRegistration: Story = {
  args: {
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      age: '',
      country: '',
      newsletter: false,
      bio: '',
    },
    fields: {
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
      newsletter: {
        type: 'checkbox',
        label: 'Subscribe to newsletter',
      },
      bio: {
        type: 'text',
        label: 'Bio',
        placeholder: 'Tell us about yourself',
      },
    } as FieldsConfig<UserFormData>,
    onSubmit: handleSubmit,
    submitButtonText: 'Create Account',
  },
};

// Simple login form
export const Login: Story = {
  args: {
    defaultValues: {
      username: '',
      password: '',
      rememberMe: false,
    },
    fields: {
      username: {
        type: 'text',
        label: 'Username',
        required: true,
        placeholder: 'Enter your username',
      },
      password: {
        type: 'password',
        label: 'Password',
        required: true,
        placeholder: 'Enter your password',
      },
      rememberMe: {
        type: 'checkbox',
        label: 'Remember me',
      },
    } as FieldsConfig<LoginFormData>,
    onSubmit: handleSubmit,
    submitButtonText: 'Sign In',
  },
};

// Custom field rendering example
export const WithCustomFields: Story = {
  args: {
    defaultValues: {
      name: '',
      priority: '',
      termsAccepted: false,
    },
    fields: {
      name: {
        type: 'text',
        label: 'Project Name',
        required: true,
        placeholder: 'Enter project name',
      },
      priority: {
        label: 'Priority Level',
        required: true,
        render: field => (
          <div>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
              Priority Level *
            </label>
            <div style={{ display: 'flex', gap: 16 }}>
              {['low', 'medium', 'high', 'urgent'].map(priority => (
                <label key={priority} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <input
                    type="radio"
                    name="priority"
                    value={priority}
                    checked={field.state.value === priority}
                    onChange={e => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
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
      termsAccepted: {
        type: 'checkbox',
        label: 'I accept the terms and conditions',
      },
    },
    onSubmit: handleSubmit,
    submitButtonText: 'Create Project',
  },
};

// Disabled form example
export const Disabled: Story = {
  args: {
    ...Login.args,
    disabled: true,
    submitButtonText: 'Loading...',
  },
};

// Form with validation errors
export const WithValidationErrors: Story = {
  args: {
    defaultValues: {
      email: 'invalid-email',
      password: '',
      confirmPassword: 'different',
    },
    fields: {
      email: {
        type: 'email',
        label: 'Email',
        required: true,
        placeholder: 'Enter your email',
      },
      password: {
        type: 'password',
        label: 'Password',
        required: true,
        placeholder: 'Enter password',
      },
      confirmPassword: {
        type: 'password',
        label: 'Confirm Password',
        required: true,
        placeholder: 'Confirm your password',
      },
    },
    onSubmit: handleSubmit,
    submitButtonText: 'Sign Up',
  },
};
