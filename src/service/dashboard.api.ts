import { api as generatedApi } from '../gen/dashboard.api.generated';

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
    dashboardEntriesGetDashboardEntries: {
      provides: ['Dashboard'],
    },
    dashboardEntriesAddDashboardEntry: {
      invalidates: ['Dashboard'],
    },
    dashboardEntriesDeleteDashboardEntry: {
      invalidates: ['Dashboard'],
    },
  },
});

export const {
  useDashboardEntriesGetDashboardEntriesQuery,
  useDashboardEntriesAddDashboardEntryMutation,
  useDashboardEntriesDeleteDashboardEntryMutation,
  useDashboardsGetDashboardsQuery,
  useDashboardsCreateDashboardMutation,
  useDashboardsGetDashboardQuery,
  useDashboardsUpdateDashboardMutation,
  useDashboardsDeleteDashboardMutation,
  useDashboardUsersGetDashboardViewerQuery,
  useDashboardUsersAddViewerToDashboardMutation,
  useDashboardUsersRemoveViewerFromDashboardMutation,
} = api;
