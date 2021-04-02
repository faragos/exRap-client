// eslint-disable-next-line import/no-cycle
import { api as generatedApi } from '../gen/auth.api.generated';

export const api = generatedApi.enhanceEndpoints({
  addEntityTypes: ['Login'],
  endpoints: {
    // basic notation: just specify properties to be overridden
    loginLogin: {
      invalidates: ['Login'],
    },
    rolesGetRoles: {
      provides: ['Login'],
    },
  },
});

export const {
  useLoginLoginMutation,
  useRolesGetRolesQuery,
  useRolesGetRoleQuery,
  useUsersGetUsersQuery,
  useUsersCreateUserMutation,
  useUsersGetUserQuery,
  useUsersUpdateUserMutation,
  useUsersAddCredentialMutation,
  useUsersAddRoleMutation,
} = api;
