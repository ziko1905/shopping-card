import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';

describe('App general', () => {
  it('Renders at homepage', () => {
    render(<MemoryRouter initialEntries={["/"]}><App /></MemoryRouter>)

    expect(() => screen.getByRole('heading', {name: "Homepage"})).not.toThrow()
  })
  it('Renders at shopping cart', () => {
    render(<MemoryRouter initialEntries={["/shopping-cart"]}><App /></MemoryRouter>)

    expect(() => screen.getByRole('heading', {name: "Shopping Cart"})).not.toThrow()
    screen.debug()
  })
});