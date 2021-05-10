import { api as generatedApi } from '../gen/dashboard.api.generated';

export const api = generatedApi.enhanceEndpoints({
  addTagTypes: ['Dashboard'],
  endpoints: {
    // basic notation: just specify properties to be overridden
    dashboardsGetDashboards: {
      providesTags: ['Dashboard'],
    },
    dashboardsCreateDashboard: {
      invalidatesTags: ['Dashboard'],
    },
    dashboardsGetDashboard: {
      providesTags: ['Dashboard'],
    },
    dashboardsUpdateDashboard: {
      invalidatesTags: ['Dashboard'],
    },
    dashboardsDeleteDashboard: {
      invalidatesTags: ['Dashboard'],
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
