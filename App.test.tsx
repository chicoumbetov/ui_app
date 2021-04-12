// import React from 'react';
// import renderer from 'react-test-renderer';

import { addNumbers } from './src/mathUtils';
import App from './App';

test('add numbers', () => {
  expect(addNumbers(1, 2)).toEqual(3);
});

it('<App />', () => {
  expect(App);
});
