import { createApi, fetchBaseQuery } from "@rtk-incubator/rtk-query";
import {RootState} from '../store/index'

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:5001",
    prepareHeaders: (headers, {getState}) => {

      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).user.token;
      // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSW5pdEFkbWluIiwicm9sZSI6IkFkbWluIiwibmJmIjoxNjE3MzU3MjcyLCJleHAiOjE2MTczNTkwNzIsImlhdCI6MTYxNzM1NzI3Mn0.4dF3p5bVPE1OaiGs-PoypKMaf5lx5cbe9r6iI6MiKDc';
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    }
  }),
  entityTypes: [],
  endpoints: (build) => ({
    loginLogin: build.mutation<LoginLoginApiResponse, LoginLoginApiArg>({
      query: (queryArg) => ({
        url: `/api/Login`,
        responseHandler: 'text',
        method: "POST",
        body: queryArg.exRapAuthDtoCredential,
      }),
    }),
    rolesGetRoles: build.query<RolesGetRolesApiResponse, RolesGetRolesApiArg>({
      query: () => ({ url: `/api/Roles` }),
    }),
    rolesGetRole: build.query<RolesGetRoleApiResponse, RolesGetRoleApiArg>({
      query: (queryArg) => ({ url: `/api/Roles/${queryArg.roleId}` }),
    }),
    usersGetUsers: build.query<UsersGetUsersApiResponse, UsersGetUsersApiArg>({
      query: () => ({ url: `/api/Users` }),
    }),
    usersCreateUser: build.mutation<
      UsersCreateUserApiResponse,
      UsersCreateUserApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Users`,
        method: "POST",
        body: queryArg.exRapAuthDtoUser,
      }),
    }),
    usersGetUser: build.query<UsersGetUserApiResponse, UsersGetUserApiArg>({
      query: (queryArg) => ({ url: `/api/Users/${queryArg.userId}` }),
    }),
    usersUpdateUser: build.mutation<
      UsersUpdateUserApiResponse,
      UsersUpdateUserApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Users/${queryArg.userId}`,
        method: "PUT",
        body: queryArg.exRapAuthDtoUser,
      }),
    }),
    usersAddCredential: build.mutation<
      UsersAddCredentialApiResponse,
      UsersAddCredentialApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Users/${queryArg.userId}/credentials`,
        method: "POST",
        body: queryArg.exRapAuthDtoCredential,
      }),
    }),
    usersAddRole: build.mutation<UsersAddRoleApiResponse, UsersAddRoleApiArg>({
      query: (queryArg) => ({
        url: `/api/Users/${queryArg.userId}/roles/${queryArg.roleId}`,
        method: "POST",
      }),
    }),
  }),
});
export type LoginLoginApiResponse = /** status 200 Success */ string;
export type LoginLoginApiArg = {
  exRapAuthDtoCredential: ExRapAuthDTOCredential;
};
export type RolesGetRolesApiResponse = /** status 200 Success */ ExRapAuthModelsRole[];
export type RolesGetRolesApiArg = {};
export type RolesGetRoleApiResponse = /** status 200 Success */ ExRapAuthModelsRole[];
export type RolesGetRoleApiArg = {
  roleId: string;
};
export type UsersGetUsersApiResponse = /** status 200 Success */ ExRapAuthModelsUser[];
export type UsersGetUsersApiArg = {};
export type UsersCreateUserApiResponse = /** status 200 Success */ ExRapAuthModelsUser;
export type UsersCreateUserApiArg = {
  exRapAuthDtoUser: ExRapAuthDTOUser;
};
export type UsersGetUserApiResponse = /** status 200 Success */ ExRapAuthModelsUser;
export type UsersGetUserApiArg = {
  userId: number;
};
export type UsersUpdateUserApiResponse = unknown;
export type UsersUpdateUserApiArg = {
  userId: number;
  exRapAuthDtoUser: ExRapAuthDTOUser;
};
export type UsersAddCredentialApiResponse = unknown;
export type UsersAddCredentialApiArg = {
  userId: number;
  exRapAuthDtoCredential: ExRapAuthDTOCredential;
};
export type UsersAddRoleApiResponse = /** status 200 Success */ ExRapAuthModelsUser;
export type UsersAddRoleApiArg = {
  userId: number;
  roleId: string;
};
export type ExRapAuthDTOCredential = {
  loginName?: string | null;
  password?: string | null;
  passwordHint?: string | null;
};
export type ExRapAuthModelsCredential = {
  loginName?: string | null;
  user?: ExRapAuthModelsUser;
  passwordHash?: string | null;
  salt?: string | null;
  passwordHint?: string | null;
};
export type ExRapAuthModelsUserStatus = "Active" | "Restricted" | "Deleted";
export type ExRapAuthModelsUser = {
  id?: number;
  userName?: string | null;
  name?: string | null;
  firstName?: string | null;
  initial?: string | null;
  mailAddress?: string | null;
  roles?: ExRapAuthModelsRole[] | null;
  credentials?: ExRapAuthModelsCredential[] | null;
  status?: ExRapAuthModelsUserStatus;
};
export type ExRapAuthModelsRole = {
  name?: string | null;
  description?: string | null;
  users?: ExRapAuthModelsUser[] | null;
};
export type ExRapAuthDTOUser = {
  userName?: string | null;
  name?: string | null;
  firstName?: string | null;
  initial?: string | null;
  mailAddress?: string | null;
  status?: ExRapAuthModelsUserStatus;
};
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
