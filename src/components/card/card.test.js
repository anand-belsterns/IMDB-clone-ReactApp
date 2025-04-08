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
        render(<Cards movie={null} />);
        const skeletonElement = screen.getByText(/loading/i);
        expect(skeletonElement).toBeInTheDocument();
    });

    test('renders movie details after loading', async () => {
        jest.useFakeTimers();
        render(<Cards movie={mockMovie} />);
        jest.advanceTimersByTime(1500);

        const titleElement = await screen.findByText(/Test Movie/i);
        expect(titleElement).toBeInTheDocument();
        const ratingElement = screen.getByText(/8.5/i);
        expect(ratingElement).toBeInTheDocument();
        const descriptionElement = screen.getByText(/This is a test overview for the movie./i);
        expect(descriptionElement).toBeInTheDocument();
    });
});