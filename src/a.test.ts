import {expect, test} from 'bun:test';

import {a} from './a';

test('a is "Hello World"', () => {
  expect(a).toBe('Hello World');
});
