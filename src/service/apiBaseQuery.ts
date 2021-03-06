import { fetchBaseQuery } from '@rtk-incubator/rtk-query';
import type { RootState } from '../store/store';

export const { REACT_APP_BASEURL_TIME } = process.env;
export const { REACT_APP_BASEURL_AUTH } = process.env;
export const { REACT_APP_BASEURL_DASH } = process.env;
/**
 * Creates a Base Query with a dynamic base url
 * @param baseUrl - Base URL of the API
 */
const baseQuery = (baseUrl?: string) => fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const { token } = (getState() as RootState).authInfo;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});
/**
 * Creates a custom Base Query for Time API
 * @param args
 * @param api
 * @param extraOptions
 */
export const apiBaseQueryTime: ReturnType<typeof fetchBaseQuery> = async (
  args,
  api,
  extraOptions,
) => baseQuery(REACT_APP_BASEURL_TIME)(args, api, extraOptions);
/**
 * Creates a custom Base Query for Auth API
 * @param args
 * @param api
 * @param extraOptions
 */
export const apiBaseQueryAuth: ReturnType<typeof fetchBaseQuery> = async (
  args,
  api,
  extraOptions,
) => baseQuery(REACT_APP_BASEURL_AUTH)(args, api, extraOptions);
/**
 * Creates a custom Base Query for Dash API
 * @param args
 * @param api
 * @param extraOptions
 */
export const apiBaseQueryDash: ReturnType<typeof fetchBaseQuery> = async (
  args,
  api,
  extraOptions,
) => baseQuery(REACT_APP_BASEURL_DASH)(args, api, extraOptions);
