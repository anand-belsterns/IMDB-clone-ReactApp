import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Home from './home';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('react-responsive-carousel', () => ({
    Carousel: ({ children }) => <div>{children}</div>
}));

describe('Home Component', () => {
    test('renders popular movies', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ results: [{
                    id: 1,
                    backdrop_path: '/path/to/image.jpg',
                    original_title: 'Movie Title',
                    release_date: '2023-01-01',
                    vote_average: 8.5,
                    overview: 'Movie overview'
                }] })
            })
        );

        render(
            <Router>
                <Home />
            </Router>
        );

        await waitFor(() => {
            expect(screen.getByText('Movie Title')).toBeInTheDocument();
            expect(screen.getByText('2023-01-01')).toBeInTheDocument();
            expect(screen.getByText('8.5')).toBeInTheDocument();
            expect(screen.getByText('Movie overview')).toBeInTheDocument();
        });
    });
});