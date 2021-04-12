import { cleanup } from '@testing-library/react';
import jwt from 'jsonwebtoken';
import { isTokenValid } from '../utils/validateToken';

afterEach(cleanup);
function generateToken(nbf: number, exp: number) {
  const now = Math.floor(Date.now() / 1000);
  return jwt.sign({
    name: 'test-user',
    role: 'admin',
    nbf: Math.floor(nbf),
    exp: Math.floor(exp),
    iat: now,
  }, 'secret');
}

test('check valid token', () => {
  const token = generateToken((Date.now() / 1000), (Date.now() / 1000 + (60 * 30)));
  expect(isTokenValid(token)).toBeTruthy();
});

test('check use token to early', () => {
  const token = generateToken((Date.now() / 1000 + (60 * 10)), (Date.now() / 1000 + (60 * 30)));
  expect(isTokenValid(token)).toBeFalsy();
});

test('check use token to late', () => {
  const token = generateToken((Date.now() / 1000 - (60 * 30)), (Date.now() / 1000 - (60 * 10)));
  expect(isTokenValid(token)).toBeFalsy();
});
