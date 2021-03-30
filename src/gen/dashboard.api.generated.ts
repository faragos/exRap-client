import { createApi, fetchBaseQuery } from "@rtk-incubator/rtk-query";
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:5001" }),
  entityTypes: [],
  endpoints: (build) => ({
    dashboardsGetDashboards: build.query<
      DashboardsGetDashboardsApiResponse,
      DashboardsGetDashboardsApiArg
    >({
      query: () => ({ url: `/Dashboards` }),
    }),
    dashboardsCreateDashboard: build.mutation<
      DashboardsCreateDashboardApiResponse,
      DashboardsCreateDashboardApiArg
    >({
      query: (queryArg) => ({
        url: `/Dashboards`,
        method: "POST",
        body: queryArg.exRapDashDtoDashboard,
      }),
    }),
    dashboardsGetDashboard: build.query<
      DashboardsGetDashboardApiResponse,
      DashboardsGetDashboardApiArg
    >({
      query: (queryArg) => ({ url: `/Dashboards/${queryArg.dashboardId}` }),
    }),
    dashboardsUpdateDashboard: build.mutation<
      DashboardsUpdateDashboardApiResponse,
      DashboardsUpdateDashboardApiArg
    >({
      query: (queryArg) => ({
        url: `/Dashboards/${queryArg.dashboardId}`,
        method: "PUT",
        body: queryArg.exRapDashDtoDashboard,
      }),
    }),
    dashboardsDeleteDashboard: build.mutation<
      DashboardsDeleteDashboardApiResponse,
      DashboardsDeleteDashboardApiArg
    >({
      query: (queryArg) => ({
        url: `/Dashboards/${queryArg.dashboardId}`,
        method: "DELETE",
      }),
    }),
    dashboardsGetDashboardEntries: build.query<
      DashboardsGetDashboardEntriesApiResponse,
      DashboardsGetDashboardEntriesApiArg
    >({
      query: (queryArg) => ({
        url: `/Dashboards/${queryArg.dashboardId}/entries`,
      }),
    }),
    dashboardsAddDashboardEntry: build.mutation<
      DashboardsAddDashboardEntryApiResponse,
      DashboardsAddDashboardEntryApiArg
    >({
      query: (queryArg) => ({
        url: `/Dashboards/${queryArg.dashboardId}/entries`,
        method: "POST",
        body: queryArg.exRapDashDtoDashboardEntry,
      }),
    }),
    dashboardsDeleteDashboardEntry: build.mutation<
      DashboardsDeleteDashboardEntryApiResponse,
      DashboardsDeleteDashboardEntryApiArg
    >({
      query: (queryArg) => ({
        url: `/Dashboards/${queryArg.dashboardId}/entries/${queryArg.dashboardEntryId}`,
        method: "DELETE",
      }),
    }),
    groupDashboardsGetGroupDashboard: build.query<
      GroupDashboardsGetGroupDashboardApiResponse,
      GroupDashboardsGetGroupDashboardApiArg
    >({
      query: (queryArg) => ({ url: `/${queryArg.dashboardId}` }),
    }),
    groupDashboardsAddViewerToDashboard: build.mutation<
      GroupDashboardsAddViewerToDashboardApiResponse,
      GroupDashboardsAddViewerToDashboardApiArg
    >({
      query: (queryArg) => ({
        url: `/${queryArg.dashboardId}/viewer`,
        method: "POST",
        body: queryArg.exRapDashDtoUser,
      }),
    }),
    groupDashboardsRemoveViewerFromDashboard: build.mutation<
      GroupDashboardsRemoveViewerFromDashboardApiResponse,
      GroupDashboardsRemoveViewerFromDashboardApiArg
    >({
      query: (queryArg) => ({
        url: `/${queryArg.dashboardId}/viewer/${queryArg.userName}`,
        method: "DELETE",
      }),
    }),
  }),
});
export type DashboardsGetDashboardsApiResponse = /** status 200 Success */ ExRapDashModelsDashboard[];
export type DashboardsGetDashboardsApiArg = {};
export type DashboardsCreateDashboardApiResponse = /** status 200 Success */ ExRapDashModelsDashboard;
export type DashboardsCreateDashboardApiArg = {
  exRapDashDtoDashboard: ExRapDashDTODashboard;
};
export type DashboardsGetDashboardApiResponse = /** status 200 Success */ ExRapDashModelsDashboard;
export type DashboardsGetDashboardApiArg = {
  dashboardId: number;
};
export type DashboardsUpdateDashboardApiResponse = /** status 200 Success */ ExRapDashModelsDashboard;
export type DashboardsUpdateDashboardApiArg = {
  dashboardId: number;
  exRapDashDtoDashboard: ExRapDashDTODashboard;
};
export type DashboardsDeleteDashboardApiResponse = unknown;
export type DashboardsDeleteDashboardApiArg = {
  dashboardId: number;
};
export type DashboardsGetDashboardEntriesApiResponse = /** status 200 Success */ ExRapDashModelsDashboardEntry[];
export type DashboardsGetDashboardEntriesApiArg = {
  dashboardId: number;
};
export type DashboardsAddDashboardEntryApiResponse = /** status 200 Success */ ExRapDashModelsDashboard;
export type DashboardsAddDashboardEntryApiArg = {
  dashboardId: number;
  exRapDashDtoDashboardEntry: ExRapDashDTODashboardEntry;
};
export type DashboardsDeleteDashboardEntryApiResponse = /** status 200 Success */ ExRapDashModelsDashboard;
export type DashboardsDeleteDashboardEntryApiArg = {
  dashboardId: number;
  dashboardEntryId: number;
};
export type GroupDashboardsGetGroupDashboardApiResponse = /** status 200 Success */ ExRapDashModelsGroupDashboard;
export type GroupDashboardsGetGroupDashboardApiArg = {
  dashboardId: number;
};
export type GroupDashboardsAddViewerToDashboardApiResponse = /** status 200 Success */ ExRapDashModelsGroupDashboard;
export type GroupDashboardsAddViewerToDashboardApiArg = {
  dashboardId: number;
  exRapDashDtoUser: ExRapDashDTOUser;
};
export type GroupDashboardsRemoveViewerFromDashboardApiResponse = /** status 200 Success */ ExRapDashModelsGroupDashboard;
export type GroupDashboardsRemoveViewerFromDashboardApiArg = {
  dashboardId: number;
  userName: string;
};
export type ExRapDashModelsDashboardEntry = {
  id?: number;
  dataQuery?: string | null;
  displayType?: string | null;
};
export type ExRapDashModelsGroupDashboard = {
  viewerGroup?: ExRapDashModelsUser[] | null;
  id?: number;
  title?: string | null;
  description?: string | null;
  owner?: ExRapDashModelsUser;
  dashboardEntries?: ExRapDashModelsDashboardEntry[] | null;
};
export type ExRapDashModelsUser = {
  userName?: string | null;
  assignedGroupDashboards?: ExRapDashModelsGroupDashboard[] | null;
  managingDashboards?: ExRapDashModelsDashboard[] | null;
};
export type ExRapDashModelsDashboard = {
  id?: number;
  title?: string | null;
  description?: string | null;
  owner?: ExRapDashModelsUser;
  dashboardEntries?: ExRapDashModelsDashboardEntry[] | null;
};
export type ExRapDashDTODashboardTypes = "UserDashboard" | "GroupDashboard";
export type ExRapDashDTODashboard = {
  title?: string | null;
  description?: string | null;
  type?: ExRapDashDTODashboardTypes;
};
export type ExRapDashDTODashboardEntry = {
  dataQuery?: string | null;
  displayType?: string | null;
};
export type ExRapDashDTOUser = {
  userName?: string | null;
};
export const {
  useDashboardsGetDashboardsQuery,
  useDashboardsCreateDashboardMutation,
  useDashboardsGetDashboardQuery,
  useDashboardsUpdateDashboardMutation,
  useDashboardsDeleteDashboardMutation,
  useDashboardsGetDashboardEntriesQuery,
  useDashboardsAddDashboardEntryMutation,
  useDashboardsDeleteDashboardEntryMutation,
  useGroupDashboardsGetGroupDashboardQuery,
  useGroupDashboardsAddViewerToDashboardMutation,
  useGroupDashboardsRemoveViewerFromDashboardMutation,
} = api;
