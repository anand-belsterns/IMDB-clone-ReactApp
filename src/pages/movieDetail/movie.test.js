import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import Movie from './movie';

jest.mock('./movie.css', () => ({}));

describe('Movie Component', () => {
    test('renders movie details', async () => {
        const mockMovie = {
            original_title: 'Inception',
            tagline: 'Your mind is the scene of the crime.',
            vote_average: 8.8,
            vote_count: 20000,
            runtime: 148,
            release_date: '2010-07-16',
            genres: [{ id: 1, name: 'Action' }, { id: 2, name: 'Sci-Fi' }],
            overview: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.',
            homepage: 'http://inceptionmovie.warnerbros.com/',
            imdb_id: 'tt1375666',
            backdrop_path: '/s3T1g7bY4h6c7q5g9g5g5g5g5g5g5g5g.jpg',
            poster_path: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
            production_companies: [{ logo_path: '/logo.png', name: 'Warner Bros.' }]
        };

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockMovie),
            })
        );

        render(
            <MemoryRouter initialEntries={[ '/movie/1' ]}>
                <Route path='/movie/:id'>
                    <Movie />
                </Route>
            </MemoryRouter>
        );

        expect(await screen.findByText(/Inception/i)).toBeInTheDocument();
        expect(screen.getByText(/Your mind is the scene of the crime./i)).toBeInTheDocument();
        expect(screen.getByText(/8.8/i)).toBeInTheDocument();
        expect(screen.getByText(/148 mins/i)).toBeInTheDocument();
        expect(screen.getByText(/Release date: 2010-07-16/i)).toBeInTheDocument();
        expect(screen.getByText(/Action/i)).toBeInTheDocument();
        expect(screen.getByText(/Sci-Fi/i)).toBeInTheDocument();
        expect(screen.getByText(/A thief who steals corporate secrets/i)).toBeInTheDocument();
        expect(screen.getByText(/Homepage/i)).toBeInTheDocument();
        expect(screen.getByText(/IMDb/i)).toBeInTheDocument();
    });
});