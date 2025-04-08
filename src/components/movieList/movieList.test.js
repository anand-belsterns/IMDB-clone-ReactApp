import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MovieList from './movieList';

jest.mock('../card/card', () => () => <div>Card</div>);

describe('MovieList Component', () => {
    test('renders MovieList with default title', () => {
        render(
            <MemoryRouter>
                <MovieList />
            </MemoryRouter>
        );
        const titleElement = screen.getByText(/POPULAR/i);
        expect(titleElement).toBeInTheDocument();
    });

    test('renders MovieList with specific type title', () => {
        render(
            <MemoryRouter initialEntries={[ '/movies/top-rated' ]}>
                <MovieList />
            </MemoryRouter>
        );
        const titleElement = screen.getByText(/TOP-RATED/i);
        expect(titleElement).toBeInTheDocument();
    });
});