// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';

const userData = [{
  id: 1,
  userName: 'testuser',
}];
const contributors = [{
  userName: 'testuser',
}];
const projectData = [
  {
    id: 1,
    name: 'project1',
    initial: 'p1',
    description: 'p1 dsc',
    timeBudget: 0,
    projectStatus: 'Active',
  },
  {
    id: 2,
    name: 'project2',
    initial: 'p2',
    description: 'p2 dsc',
    timeBudget: 0,
    projectStatus: 'Active',
  },
  {
    id: 3,
    name: 'project3',
    initial: 'p3',
    description: 'p3 dsc',
    timeBudget: 0,
    projectStatus: 'Finished',
  },
];

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
  rest.get('/time/api/Projects', (req, res, xtc) => res(
    xtc.status(200),
    xtc.json(projectData),
  )),
  rest.post('/time/api/Projects', (req, res, xtc) => {
    projectData.push({
      id: Math.random(),
      name: req.body.name,
      initial: req.body.initial,
      description: req.body.description,
      timeBudget: 0,
      projectStatus: req.body.projectStatus,
    });
    return res(
      xtc.status(200),
    );
  }),
  rest.get('/time/api/Projects/:projectId/contributors', (req, res, xtc) => res(
    xtc.status(200),
    xtc.json(contributors),
  )),
];

export default handlers;
