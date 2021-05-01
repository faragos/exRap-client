import { api as generatedApi } from '../gen/timeTrack.api.generated';

export const api = generatedApi.enhanceEndpoints({
  addEntityTypes: ['Project', 'Contributors'],
  endpoints: {
    // basic notation: just specify properties to be overridden
    projectsGetProjects: {
      provides: ['Project'],
    },
    projectsCreateProject: {
      invalidates: ['Project'],
    },
    projectsUpdateProject: {
      invalidates: ['Project'],
    },
    projectContributorsGetContributors: {
      provides: ['Contributors'],
    },
    projectContributorsAddContributor: {
      invalidates: ['Contributors'],
    },
    projectContributorsRemoveContributor: {
      invalidates: ['Contributors'],
    },
  },
});

export const {
  useDepartmentsGetDepartmentsQuery,
  useDepartmentsCreateDepartmentMutation,
  useDepartmentsGetDepartmentQuery,
  useDepartmentsUpdateDepartmentMutation,
  useDepartmentsDeleteDepartmentMutation,
  useProjectContributorsGetContributorsQuery,
  useProjectContributorsAddContributorMutation,
  useProjectContributorsRemoveContributorMutation,
  useProjectManagersGetProjectManagersQuery,
  useProjectManagersAddProjectManagerMutation,
  useProjectManagersRemoveProjectManagerMutation,
  useProjectsGetProjectsQuery,
  useProjectsCreateProjectMutation,
  useProjectsGetProjectQuery,
  useProjectsUpdateProjectMutation,
  useProjectsDeleteProjectMutation,
  useProjectTimeslotsGetTimeslotsQuery,
  useProjectTimeslotsAddTimeslotMutation,
  useProjectTimeslotsUpdateTimeslotMutation,
  useProjectTimeslotsDeleteTimeslotMutation,
  useTimeslotsGetTimeslotsQuery,
} = api;
