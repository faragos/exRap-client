import { api as generatedApi } from '../gen/auth.api.generated';

export const api = generatedApi.enhanceEndpoints({
  addTagTypes: ['Login', 'User', 'Password'],
  endpoints: {
    loginLogin: {
      invalidatesTags: ['Login'],
    },
    rolesGetRoles: {
      providesTags: ['Login', 'User'],
    },
    usersGetUser: {
      providesTags: ['User'],
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
    userRolesOverwriteRoles: {
      invalidatesTags: ['User'],
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
  useUserRolesOverwriteRolesMutation,
  useUsersGetUsersQuery,
  useUsersCreateUserMutation,
  useUsersGetUserQuery,
  useUsersUpdateUserMutation,
} = api;
