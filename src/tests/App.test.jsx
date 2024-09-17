import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import App from '../App';

describe('App general', () => {
  it('renders headline', () => {
    render(<App title="React" />);

    screen.debug();

    // check if App components renders headline
  });
});