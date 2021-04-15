import { api as generatedApi } from '../gen/auth.api.generated';

export const api = generatedApi.enhanceEndpoints({
  addEntityTypes: ['Login', 'User'],
  endpoints: {
    // basic notation: just specify properties to be overridden
    loginLogin: {
      invalidates: ['Login'],
    },
    rolesGetRoles: {
      provides: ['Login'],
    },
    usersGetUsers: {
      provides: ['User'],
    },
    usersCreateUser: {
      invalidates: ['User'],
    },
  },
});

export const {
  useLoginLoginMutation,
  useLoginRenewTokenQuery,
  useRolesGetRolesQuery,
  useRolesGetRoleQuery,
  useUserCredentialsAddCredentialMutation,
  useUserRolesAddRoleMutation,
  useUsersGetUsersQuery,
  useUsersCreateUserMutation,
  useUsersGetUserQuery,
  useUsersUpdateUserMutation,
} = api;
