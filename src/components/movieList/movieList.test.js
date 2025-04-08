import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MovieList from './movieList';

jest.mock('../card/card', () => () => <div>Card</div>);

describe('MovieList Component', () => {
    test('renders MovieList with default type', async () => {
        render(
            <MemoryRouter>
                <MovieList />
            </MemoryRouter>
        );

        const titleElement = await screen.findByText(/POPULAR/i);
        expect(titleElement).toBeInTheDocument();
    });

    test('renders MovieList with specific type', async () => {
        render(
            <MemoryRouter initialEntries={[ '/movie/popular' ]}>
                <MovieList />
            </MemoryRouter>
        );

        const titleElement = await screen.findByText(/POPULAR/i);
        expect(titleElement).toBeInTheDocument();
    });
});