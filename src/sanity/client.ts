import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: 'y41i1wvb',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});
