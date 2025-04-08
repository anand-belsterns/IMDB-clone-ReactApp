import React from 'react';
import { render, screen } from '@testing-library/react';
import Cards from './card';

const mockMovie = {
    id: 1,
    poster_path: '/path/to/poster.jpg',
    original_title: 'Test Movie',
    release_date: '2023-01-01',
    vote_average: 8.5,
    overview: 'This is a test overview for the movie.'
};

describe('Cards Component', () => {
    test('renders loading skeleton initially', () => {
        render(<Cards movie={mockMovie} />);
        const skeleton = screen.getByRole('img');
        expect(skeleton).toBeInTheDocument();
    });

    test('renders movie details after loading', async () => {
        jest.useFakeTimers();
        render(<Cards movie={mockMovie} />);
        jest.advanceTimersByTime(1500);
        const title = await screen.findByText(/Test Movie/i);
        expect(title).toBeInTheDocument();
        const description = screen.getByText(/This is a test overview for the movie./i);
        expect(description).toBeInTheDocument();
    });
});