import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductOverview from '../components/ProductOverview/ProductOverview.jsx';

afterEach(() => {
  cleanup();
});

test('loads and displays Carousel component', () => {
  render(<ProductOverview />);
  const Carousel = screen.getByTestId('Carousel');

  expect(Carousel).toBeInTheDocument();
});
