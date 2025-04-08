import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';

describe('Header Component', () => {
    test('renders Header component', () => {
        const { getByText } = render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );
        expect(getByText(/Popular/i)).toBeInTheDocument();
        expect(getByText(/Top Rated/i)).toBeInTheDocument();
        expect(getByText(/Upcoming/i)).toBeInTheDocument();
    });
});