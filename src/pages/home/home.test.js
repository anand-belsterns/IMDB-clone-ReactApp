import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Home from './home';

jest.mock('react-responsive-carousel', () => ({
    Carousel: ({ children }) => <div>{children}</div>
}));

global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({ results: [
        { id: 1, backdrop_path: '/path/to/image.jpg', original_title: 'Movie Title', release_date: '2023-01-01', vote_average: 8.5, overview: 'Movie overview' }
    ] }}));

describe('Home Component', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    test('renders popular movies', async () => {
        render(<Home />);

        await waitFor(() => {
            expect(screen.getByText(/Movie Title/i)).toBeInTheDocument();
            expect(screen.getByText(/2023-01-01/i)).toBeInTheDocument();
            expect(screen.getByText(/8.5/i)).toBeInTheDocument();
            expect(screen.getByText(/Movie overview/i)).toBeInTheDocument();
        });
    });
});