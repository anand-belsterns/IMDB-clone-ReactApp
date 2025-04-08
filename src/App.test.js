import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App Component', () => {
    test('renders Header component', () => {
        render(<MemoryRouter><App /></MemoryRouter>);
        const headerElement = screen.getByText(/header/i);
        expect(headerElement).toBeInTheDocument();
    });

    test('renders Home component on default route', () => {
        render(<MemoryRouter initialEntries={['/']}><App /></MemoryRouter>);
        const homeElement = screen.getByText(/home/i);
        expect(homeElement).toBeInTheDocument();
    });

    test('renders MovieList component on movies/:type route', () => {
        render(<MemoryRouter initialEntries={['/movies/popular']}><App /></MemoryRouter>);
        const movieListElement = screen.getByText(/movie list/i);
        expect(movieListElement).toBeInTheDocument();
    });

    test('renders Movie component on movie/:id route', () => {
        render(<MemoryRouter initialEntries={['/movie/1']}><App /></MemoryRouter>);
        const movieElement = screen.getByText(/movie detail/i);
        expect(movieElement).toBeInTheDocument();
    });

    test('renders Error Page for unknown routes', () => {
        render(<MemoryRouter initialEntries={['/unknown']}><App /></MemoryRouter>);
        const errorElement = screen.getByText(/error page/i);
        expect(errorElement).toBeInTheDocument();
    });
});