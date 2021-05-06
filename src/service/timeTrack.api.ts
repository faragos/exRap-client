import { api as generatedApi } from '../gen/timeTrack.api.generated';

export const api = generatedApi.enhanceEndpoints({
  addTagTypes: ['Project', 'Contributors', 'TimeSlot'],
  endpoints: {
    // basic notation: just specify properties to be overridden
    projectsGetProjects: {
      providesTags: ['Project'],
    },
    projectsCreateProject: {
      invalidatesTags: ['Project'],
    },
    projectsUpdateProject: {
      invalidatesTags: ['Project'],
    },
    projectContributorsGetContributors: {
      providesTags: ['Contributors'],
    },
    projectContributorsAddContributor: {
      invalidatesTags: ['Contributors'],
    },
    projectContributorsRemoveContributor: {
      invalidatesTags: ['Contributors'],
    },
    projectTimeslotsAddTimeslot: {
      invalidatesTags: ['TimeSlot'],
    },
    timeslotsGetTimeslots: {
      providesTags: ['TimeSlot'],
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
