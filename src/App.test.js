import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

test('renders header', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const headerElement = screen.getByText(/header/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders home page on default route', () => {
  render(
    <MemoryRouter initialEntries={[ '/' ]}>
      <App />
    </MemoryRouter>
  );
  const homeElement = screen.getByText(/home/i);
  expect(homeElement).toBeInTheDocument();
});

test('renders error page for unknown route', () => {
  render(
    <MemoryRouter initialEntries={[ '/unknown' ]}>
      <App />
    </MemoryRouter>
  );
  const errorElement = screen.getByText(/error page/i);
  expect(errorElement).toBeInTheDocument();
});