import '@testing-library/jest-dom';
import { server } from './mocks/server';
import { beforeAll, afterEach, afterAll } from 'vitest';

// Mock PointerEvent for Radix UI components
// JSDOM doesn't implement PointerEvent, so we need to mock our own implementation
// Default to mouse left click interaction
class MockPointerEvent extends Event {
  button: number;
  ctrlKey: boolean;
  pointerType: string;

  constructor(type: string, props: PointerEventInit) {
    super(type, props);
    this.button = props.button || 0;
    this.ctrlKey = props.ctrlKey || false;
    this.pointerType = props.pointerType || 'mouse';
  }
}

//eslint-disable-next-line @typescript-eslint/no-explicit-any
window.PointerEvent = MockPointerEvent as any;

// Mock hasPointerCapture and other pointer-related methods for JSDOM
Object.defineProperty(window.Element.prototype, 'hasPointerCapture', {
  value: () => false,
});

Object.defineProperty(window.Element.prototype, 'setPointerCapture', {
  value: () => {},
});

Object.defineProperty(window.Element.prototype, 'releasePointerCapture', {
  value: () => {},
});

// Mock scrollIntoView for JSDOM
Object.defineProperty(window.Element.prototype, 'scrollIntoView', {
  value: () => {},
});

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
