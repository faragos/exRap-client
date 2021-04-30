// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';

const userData = [];

const handlers = [
  rest.post('/auth/api/Login', (req, res, ctx) => {
    if (req.body.userName === 'test-user' && req.body.password === 'test-password') {
      return res(
        ctx.status(200),
        ctx.json({
          token: 'fake-token',
        }),
      );
    }
    return res(
      ctx.status(401),
    );
  }),
  rest.post('/auth/api/Users', (req, res, xtc) => {
    userData.push({
      id: Math.random(),
      userName: req.body.userName,
    });
    return res(
      xtc.status(200),
    );
  }),
  rest.get('/auth/api/Users', (req, res, xtc) => res(
    xtc.status(200),
    xtc.json(userData),
  )),
];

export default handlers;
