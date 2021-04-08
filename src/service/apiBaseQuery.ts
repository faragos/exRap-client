import { BaseQueryFn, fetchBaseQuery } from '@rtk-incubator/rtk-query';
import type { RootState } from '../store/store';

const baseQuery = (baseUrl: string) => fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const { token } = (getState() as RootState).user;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

/* TODO: type FetchBaseQueryArgs hinzufügen
https://github.com/rtk-incubator/rtk-query/commit/2ce5f7b2a27c0a0dd56ad936edf9a28f0e7d88c7#diff-de51e76f1ca53078363ab91e1fbbf385a05bf886d56c4d3250760e98a021a16b */
export function apiBaseQuery({ baseUrl }: { baseUrl :string }) : BaseQueryFn {
  return baseQuery(baseUrl);
}
export default apiBaseQuery;
