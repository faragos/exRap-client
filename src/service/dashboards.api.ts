import { api as generatedApi } from '../gen/dashboards.api.generated';

export const api = generatedApi.enhanceEndpoints({
  addEntityTypes: ['Dashboard'],
  endpoints: {
    // basic notation: just specify properties to be overridden
    dashboardsGetDashboards: {
      provides: ['Dashboard'],
    },
    dashboardsCreateDashboard: {
      invalidates: ['Dashboard'],
    },
    dashboardsGetDashboard: {
      provides: ['Dashboard'],
    },
    dashboardsUpdateDashboard: {
      invalidates: ['Dashboard'],
    },
    dashboardsDeleteDashboard: {
      invalidates: ['Dashboard'],
    },
    dashboardsGetDashboardEntries: {
      provides: ['Dashboard'],
    },
    dashboardsAddDashboardEntry: {
      invalidates: ['Dashboard'],
    },
    dashboardsDeleteDashboardEntry: {
      invalidates: ['Dashboard'],
    },
    groupDashboardsGetGroupDashboard: {
      provides: ['Dashboard'],
    },
    groupDashboardsAddViewerToDashboard: {
      invalidates: ['Dashboard'],
    },
    groupDashboardsRemoveViewerFromDashboard: {
      invalidates: ['Dashboard'],
    },
  },
});

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
