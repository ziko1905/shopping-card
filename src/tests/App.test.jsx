import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';

// describe('App general', () => {
//   it('renders headline', () => {
//     render(<MemoryRouter><App title="React" /></MemoryRouter>);

//     expect(screen.getByRole('heading').textContent).toMatch("Awesome store")
//   });
// });