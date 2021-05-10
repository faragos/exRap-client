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
    userCredentialsUpdateCredential: {
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
  useUserCredentialsUpdateCredentialMutation,
  useUserRolesAddRoleMutation,
  useUserRolesOverwriteRolesMutation,
  useUsersGetUsersQuery,
  useUsersCreateUserMutation,
  useUsersGetUserQuery,
  useUsersUpdateUserMutation,
} = api;
