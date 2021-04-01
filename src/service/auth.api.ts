import { api as generatedApi } from '../gen/auth.api.generated';

export const api = generatedApi.enhanceEndpoints({
  addEntityTypes: ['Login'],
  endpoints: {
    // basic notation: just specify properties to be overridden
    loginLogin: {
      invalidates: ['Login'],
    },
  },
});

export const {
  useLoginLoginMutation,
} = api;
