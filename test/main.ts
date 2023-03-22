import test from 'ava';
import extractPureJson from '../src';

test('extractPureJson', (t) => {
  const text = 'hello world { "name": "test" }';
  const result = extractPureJson(text);
  t.deepEqual(result, { name: 'test' });
});

test('extractPureJson with multiple json', (t) => {
  const text = 'hello world { "name": "test" } { "name": "test" }';
  const result = extractPureJson(text);
  t.deepEqual(result, { name: 'test' });
});

test('extractPureJson with retry true', (t) => {
  const text = 'hello world { "name": "test" }}';
  const result = extractPureJson(text, { retry: 1 });
  t.deepEqual(result, { name: 'test' });
});

test('extractPureJson with retry false', (t) => {
  const text = 'hello world { "name": "test" }}';
  const result = extractPureJson(text, { retry: 2 });
  t.deepEqual(result, { name: 'test' });
});

test('extractPureJson with array', (t) => {
  const text = '[{"a":1},{"b":2}]';
  const result = extractPureJson(text);
  t.deepEqual(result, false);
});
