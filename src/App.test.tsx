import React from 'react';
import { render } from '@testing-library/react';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic'
import App from './App';

test('renders App', () => {
  const { container } = render((
    <AlertProvider template={AlertTemplate}>
      <App />
    </AlertProvider>
  ));

  expect(container).toBeTruthy();
});
