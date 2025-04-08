import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import Movie from './movie';

jest.mock('./movie.css', () => ({}));

describe('Movie Component', () => {
    it('renders movie details correctly', async () => {
        const mockMovie = {
            backdrop_path: '/path/to/backdrop.jpg',
            poster_path: '/path/to/poster.jpg',
            original_title: 'Test Movie',
            tagline: 'This is a tagline',
            vote_average: 8.5,
            vote_count: 100,
            runtime: 120,
            release_date: '2023-01-01',
            genres: [{ id: 1, name: 'Action' }, { id: 2, name: 'Adventure' }],
            overview: 'This is a test overview.',
            homepage: 'https://testmovie.com',
            imdb_id: 'tt1234567',
            production_companies: [{ logo_path: '/path/to/logo.jpg', name: 'Test Company' }]
        };

        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve(mockMovie)
        }));

        render(
            <MemoryRouter initialEntries={[ '/movie/1' ]}>
                <Route path='/movie/:id'>
                    <Movie />
                </Route>
            </MemoryRouter>
        );

        expect(await screen.findByText(/Test Movie/i)).toBeInTheDocument();
        expect(screen.getByText(/This is a tagline/i)).toBeInTheDocument();
        expect(screen.getByText(/8.5/i)).toBeInTheDocument();
        expect(screen.getByText(/100 votes/i)).toBeInTheDocument();
        expect(screen.getByText(/120 mins/i)).toBeInTheDocument();
        expect(screen.getByText(/Release date: 2023-01-01/i)).toBeInTheDocument();
        expect(screen.getByText(/Action/i)).toBeInTheDocument();
        expect(screen.getByText(/Adventure/i)).toBeInTheDocument();
        expect(screen.getByText(/This is a test overview./i)).toBeInTheDocument();
        expect(screen.getByText(/Useful Links/i)).toBeInTheDocument();
        expect(screen.getByText(/Homepage/i)).toBeInTheDocument();
        expect(screen.getByText(/IMDb/i)).toBeInTheDocument();
        expect(screen.getByText(/Production companies/i)).toBeInTheDocument();
    });
});