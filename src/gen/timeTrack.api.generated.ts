import { createApi, fetchBaseQuery } from "@rtk-incubator/rtk-query";
export const api = createApi({
  reducerPath: "timeTrackApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:5001" }),
  entityTypes: [],
  endpoints: (build) => ({
    departmentsGetDepartments: build.query<
      DepartmentsGetDepartmentsApiResponse,
      DepartmentsGetDepartmentsApiArg
    >({
      query: () => ({ url: `/api/Departments` }),
    }),
    departmentsCreateDepartment: build.mutation<
      DepartmentsCreateDepartmentApiResponse,
      DepartmentsCreateDepartmentApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Departments`,
        method: "POST",
        body: queryArg.exRapDtoDepartment,
      }),
    }),
    departmentsGetDepartment: build.query<
      DepartmentsGetDepartmentApiResponse,
      DepartmentsGetDepartmentApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Departments/${queryArg.departmentId}`,
      }),
    }),
    departmentsUpdateDepartment: build.mutation<
      DepartmentsUpdateDepartmentApiResponse,
      DepartmentsUpdateDepartmentApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Departments/${queryArg.departmentId}`,
        method: "PUT",
        body: queryArg.exRapDtoDepartment,
      }),
    }),
    departmentsDeleteDepartment: build.mutation<
      DepartmentsDeleteDepartmentApiResponse,
      DepartmentsDeleteDepartmentApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Departments/${queryArg.departmentId}`,
        method: "DELETE",
      }),
    }),
    projectsGetProjects: build.query<
      ProjectsGetProjectsApiResponse,
      ProjectsGetProjectsApiArg
    >({
      query: () => ({ url: `/api/Projects` }),
    }),
    projectsCreateProject: build.mutation<
      ProjectsCreateProjectApiResponse,
      ProjectsCreateProjectApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Projects`,
        method: "POST",
        body: queryArg.exRapModelsProject,
      }),
    }),
    projectsGetProject: build.query<
      ProjectsGetProjectApiResponse,
      ProjectsGetProjectApiArg
    >({
      query: (queryArg) => ({ url: `/api/Projects/${queryArg.projectId}` }),
    }),
    projectsUpdateProject: build.mutation<
      ProjectsUpdateProjectApiResponse,
      ProjectsUpdateProjectApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Projects/${queryArg.projectId}`,
        method: "PUT",
        body: queryArg.exRapModelsProject,
      }),
    }),
    projectsDeleteProject: build.mutation<
      ProjectsDeleteProjectApiResponse,
      ProjectsDeleteProjectApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Projects/${queryArg.projectId}`,
        method: "DELETE",
      }),
    }),
    projectsGetContributors: build.query<
      ProjectsGetContributorsApiResponse,
      ProjectsGetContributorsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Projects/${queryArg.projectId}/contributors`,
      }),
    }),
    projectsAddContributor: build.mutation<
      ProjectsAddContributorApiResponse,
      ProjectsAddContributorApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Projects/${queryArg.projectId}/contributors`,
        method: "POST",
        body: queryArg.exRapDtoContributor,
      }),
    }),
    projectsRemoveContributor: build.mutation<
      ProjectsRemoveContributorApiResponse,
      ProjectsRemoveContributorApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Projects/${queryArg.projectId}/contributors/${queryArg.userName}`,
        method: "DELETE",
      }),
    }),
    projectsGetTimeslots: build.query<
      ProjectsGetTimeslotsApiResponse,
      ProjectsGetTimeslotsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Projects/${queryArg.projectId}/timeslots`,
      }),
    }),
    projectsAddTimeslot: build.mutation<
      ProjectsAddTimeslotApiResponse,
      ProjectsAddTimeslotApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Projects/${queryArg.projectId}/timeslots`,
        method: "POST",
        body: queryArg.exRapDtoProjectTimeslot,
      }),
    }),
    projectsUpdateTimeslot: build.mutation<
      ProjectsUpdateTimeslotApiResponse,
      ProjectsUpdateTimeslotApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Projects/${queryArg.projectId}/timeslots/${queryArg.timeslotId}`,
        method: "PUT",
        body: queryArg.exRapDtoProjectTimeslot,
      }),
    }),
    projectsDeleteTimeslot: build.mutation<
      ProjectsDeleteTimeslotApiResponse,
      ProjectsDeleteTimeslotApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Projects/${queryArg.projectId}/timeslots/${queryArg.timeslotId}`,
        method: "DELETE",
      }),
    }),
    timeslotsGetTimeslots: build.query<
      TimeslotsGetTimeslotsApiResponse,
      TimeslotsGetTimeslotsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Timeslots`,
        params: { startDate: queryArg.startDate, endDate: queryArg.endDate },
      }),
    }),
  }),
});
export type DepartmentsGetDepartmentsApiResponse = /** status 200 Success */ ExRapModelsDepartment[];
export type DepartmentsGetDepartmentsApiArg = {};
export type DepartmentsCreateDepartmentApiResponse = /** status 200 Success */ ExRapModelsDepartment;
export type DepartmentsCreateDepartmentApiArg = {
  exRapDtoDepartment: ExRapDTODepartment;
};
export type DepartmentsGetDepartmentApiResponse = /** status 200 Success */ ExRapModelsDepartment;
export type DepartmentsGetDepartmentApiArg = {
  departmentId: number;
};
export type DepartmentsUpdateDepartmentApiResponse = unknown;
export type DepartmentsUpdateDepartmentApiArg = {
  departmentId: number;
  exRapDtoDepartment: ExRapDTODepartment;
};
export type DepartmentsDeleteDepartmentApiResponse = unknown;
export type DepartmentsDeleteDepartmentApiArg = {
  departmentId: number;
};
export type ProjectsGetProjectsApiResponse = /** status 200 Success */ ExRapModelsProject[];
export type ProjectsGetProjectsApiArg = {};
export type ProjectsCreateProjectApiResponse = /** status 200 Success */ ExRapModelsProject;
export type ProjectsCreateProjectApiArg = {
  exRapModelsProject: ExRapModelsProject;
};
export type ProjectsGetProjectApiResponse = /** status 200 Success */ ExRapModelsProject;
export type ProjectsGetProjectApiArg = {
  projectId: number;
};
export type ProjectsUpdateProjectApiResponse = unknown;
export type ProjectsUpdateProjectApiArg = {
  projectId: number;
  exRapModelsProject: ExRapModelsProject;
};
export type ProjectsDeleteProjectApiResponse = unknown;
export type ProjectsDeleteProjectApiArg = {
  projectId: number;
};
export type ProjectsGetContributorsApiResponse = /** status 200 Success */ ExRapModelsUser[];
export type ProjectsGetContributorsApiArg = {
  projectId: number;
};
export type ProjectsAddContributorApiResponse = /** status 200 Success */ ExRapModelsUser[];
export type ProjectsAddContributorApiArg = {
  projectId: number;
  exRapDtoContributor: ExRapDTOContributor;
};
export type ProjectsRemoveContributorApiResponse = /** status 200 Success */ ExRapModelsUser[];
export type ProjectsRemoveContributorApiArg = {
  projectId: number;
  userName: string;
};
export type ProjectsGetTimeslotsApiResponse = /** status 200 Success */ ExRapModelsTimeSlot[];
export type ProjectsGetTimeslotsApiArg = {
  projectId: number;
};
export type ProjectsAddTimeslotApiResponse = /** status 200 Success */ ExRapModelsTimeSlot[];
export type ProjectsAddTimeslotApiArg = {
  projectId: number;
  exRapDtoProjectTimeslot: ExRapDTOProjectTimeslot;
};
export type ProjectsUpdateTimeslotApiResponse = /** status 200 Success */ ExRapModelsTimeSlot[];
export type ProjectsUpdateTimeslotApiArg = {
  projectId: number;
  timeslotId: number;
  exRapDtoProjectTimeslot: ExRapDTOProjectTimeslot;
};
export type ProjectsDeleteTimeslotApiResponse = /** status 200 Success */ ExRapModelsTimeSlot[];
export type ProjectsDeleteTimeslotApiArg = {
  projectId: number;
  timeslotId: number;
};
export type TimeslotsGetTimeslotsApiResponse = /** status 200 Success */ ExRapModelsTimeSlot[];
export type TimeslotsGetTimeslotsApiArg = {
  startDate?: string;
  endDate?: string;
};
export type ExRapModelsProjectStatus = "Active" | "Finished" | "Waiting";
export type ExRapModelsTimeSlot = {
  id?: number;
  startTime?: string;
  endTime?: string;
  changeTime?: string;
  user?: ExRapModelsUser;
  project?: ExRapModelsProject;
};
export type ExRapModelsProject = {
  id?: number;
  name?: string | null;
  initial?: string | null;
  description?: string | null;
  timeBudget?: number;
  projectStatus?: ExRapModelsProjectStatus;
  projectManager?: ExRapModelsUser[] | null;
  contributors?: ExRapModelsUser[] | null;
  timeSlots?: ExRapModelsTimeSlot[] | null;
};
export type ExRapModelsUser = {
  userName?: string | null;
  managingProjects?: ExRapModelsProject[] | null;
  assignedProjects?: ExRapModelsProject[] | null;
};
export type ExRapModelsDepartment = {
  id?: number;
  name?: string | null;
  description?: string | null;
  employees?: ExRapModelsUser[] | null;
};
export type ExRapDTODepartment = {
  name?: string | null;
  description?: string | null;
};
export type ExRapDTOContributor = {
  userName?: string | null;
};
export type ExRapDTOProjectTimeslot = {
  startTime?: string;
  endTime?: string;
};
export const {
  useDepartmentsGetDepartmentsQuery,
  useDepartmentsCreateDepartmentMutation,
  useDepartmentsGetDepartmentQuery,
  useDepartmentsUpdateDepartmentMutation,
  useDepartmentsDeleteDepartmentMutation,
  useProjectsGetProjectsQuery,
  useProjectsCreateProjectMutation,
  useProjectsGetProjectQuery,
  useProjectsUpdateProjectMutation,
  useProjectsDeleteProjectMutation,
  useProjectsGetContributorsQuery,
  useProjectsAddContributorMutation,
  useProjectsRemoveContributorMutation,
  useProjectsGetTimeslotsQuery,
  useProjectsAddTimeslotMutation,
  useProjectsUpdateTimeslotMutation,
  useProjectsDeleteTimeslotMutation,
  useTimeslotsGetTimeslotsQuery,
} = api;
