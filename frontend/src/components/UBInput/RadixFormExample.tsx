// Example of how to use UBInput with Radix Form
import { Form } from 'radix-ui';
import UBInput from './UBInput';

// Usage with Radix Form - no label conflicts!
export const RadixFormExample = () => (
  <Form.Root>
    <Form.Field name="email">
      <Form.Label>Email Address</Form.Label>
      <Form.Control asChild>
        <UBInput type="email" placeholder="user@example.com" required />
      </Form.Control>
      <Form.Message match="valueMissing">Please enter your email</Form.Message>
      <Form.Message match="typeMismatch">Please provide a valid email</Form.Message>
    </Form.Field>

    <Form.Field name="password">
      <Form.Label>Password</Form.Label>
      <Form.Control asChild>
        <UBInput type="password" placeholder="Enter your password" required />
      </Form.Control>
      <Form.Message match="valueMissing">Please enter a password</Form.Message>
    </Form.Field>

    <Form.Submit asChild>
      <button type="submit">Sign In</button>
    </Form.Submit>
  </Form.Root>
);

// Usage without Radix Form - still works with our built-in labels!
export const StandaloneExample = () => (
  <div>
    <UBInput label="Username" placeholder="Enter username" required />
    <UBInput label="Email" type="email" placeholder="user@example.com" />
  </div>
);
