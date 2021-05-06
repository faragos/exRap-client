import { api as generatedApi } from '../gen/auth.api.generated';

export const api = generatedApi.enhanceEndpoints({
  addTagTypes: ['Login', 'User', 'Password'],
  endpoints: {
    // basic notation: just specify properties to be overridden
    loginLogin: {
      invalidatesTags: ['Login'],
    },
    rolesGetRoles: {
      providesTags: ['Login'],
    },
    usersGetUsers: {
      providesTags: ['User'],
    },
    usersCreateUser: {
      invalidatesTags: ['User'],
    },
    usersUpdateUser: {
      invalidatesTags: ['User'],
    },
    userCredentialsAddCredential: {
      invalidatesTags: ['Password'],
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
