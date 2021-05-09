// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';

const roles = [
  {
    name: 'Admin',
    description: 'Administrator',
  },
  {
    name: 'ProjectManager',
    description: 'Manages projects',
  },
  {
    name: 'ProjectContributor',
    description: 'Works on projects',
  },
  {
    name: 'SeniorManager',
    description: 'Manages the company or a part of it',
  },
];
const userData = [
  {
    id: 1,
    userName: 'testuser',
    name: 'User',
    firstName: 'Test',
    mailAddress: 'user@example.com',
    roles,
    status: 'Active',
  },
  {
    id: 2,
    userName: 'testuser2',
    name: 'User2',
    firstName: 'Test2',
    mailAddress: 'user2@example.com',
    roles: ['ProjectContributor'],
    status: 'Active',
  },
  {
    id: 3,
    userName: 'testuser3',
    name: 'User3',
    firstName: 'Test3',
    mailAddress: 'user3@example.com',
    roles: ['SeniorManager', 'ProjectContributor'],
    status: 'Active',
  },
];

let projectData = [
  {
    id: 1,
    name: 'project1',
    initial: 'p1',
    description: 'p1 dsc',
    timeBudget: 0,
    projectStatus: 'Active',
    projectManager: [
      {
        userName: 'testuser',
      },
    ],
    contributors: [
      {
        userName: 'testuser',
      },
    ],
    timeSlots: [],
  },
  {
    id: 2,
    name: 'project2',
    initial: 'p2',
    description: 'p2 dsc',
    timeBudget: 0,
    projectStatus: 'Active',
    projectManager: [
      {
        userName: 'testuser',
      },
    ],
    contributors: [
      {
        userName: 'testuser2',
      },
    ],
    timeSlots: [],
  },
  {
    id: 3,
    name: 'project3',
    initial: 'p3',
    description: 'p3 dsc',
    timeBudget: 0,
    projectStatus: 'Finished',
    projectManager: [
      {
        userName: 'testuser',
      },
    ],
    contributors: [
      {
        userName: 'testuser3',
      },
    ],
    timeSlots: [],
  },
];

const createUser = (data) => ({
  id: data.id,
  userName: data.userName,
  name: data.name,
  firstName: data.firstName,
  mailAddress: data.mailAddress,
  roles: data.roles,
  status: data.status,

});

const createProject = (data) => ({
  id: data.id,
  name: data.name,
  initial: data.initial,
  description: data.description || '',
  timeBudget: data.timeBudget || 0,
  projectStatus: data.projectStatus,
  projectManager: data.projectManager || [],
  contributors: data.contributors || [],
  timeSlots: data.timeSlots || [],
});

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
  rest.get('/auth/api/Users', (req, res, xtc) => res(
    xtc.status(200),
    xtc.json(userData),
  )),
  rest.post('/auth/api/Users', (req, res, xtc) => {
    userData.push(createUser(req.body));
    return res(
      xtc.status(200),
    );
  }),

  rest.get('/time/api/Projects', (req, res, xtc) => res(
    xtc.status(200),
    xtc.json(projectData),
  )),
  rest.post('/time/api/Projects', (req, res, xtc) => {
    projectData.push(createProject(req.body));
    return res(
      xtc.status(200),
    );
  }),
  rest.put('/time/api/Projects/:projectId', (req, res, xtc) => {
    const { projectId } = req.params;

    projectData = projectData.map(
      (project) => {
        if (project.id === parseInt(projectId, 10)) {
          return {
            ...project,
            name: req.body.name,
            initial: req.body.initial,
            description: req.body.description,
            timeBudget: req.body.timeBudget,
            projectStatus: req.body.projectStatus,
            contributors: req.body.contributors,
          };
        }
        return project;
      },
    );
    return res(
      xtc.status(200),
    );
  }),
  rest.delete('/time/api/Projects/:projectId', (req, res, xtc) => {
    // TODO funktioniert noch nicht.
    const { projectId } = req.params;

    projectData = projectData.map(
      (project) => {
        if (project.id === parseInt(projectId, 10)) {
          return res(
            xtc.status(200),
            xtc.json({
              projectStatus: 'Finished',
            }),
          );
        }
        return project;
      },
    );
    return res(
      xtc.status(200),
    );
  }),
  rest.get('/time/api/Projects/:projectId/contributors', (req, res, xtc) => {
    const { projectId } = req.params;
    const currentProject = projectData.find((project) => project.id === parseInt(projectId, 10));
    return res(
      xtc.status(200),
      xtc.json(currentProject.contributors),
    );
  }),
  rest.delete('/time/api/Projects/:projectId/timeslots/:timeslotId', (req, res, xtc) => res(
    xtc.status(200),
  )),

];

export default handlers;
