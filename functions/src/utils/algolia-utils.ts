import * as functions from 'firebase-functions';
import algoliasearch from 'algoliasearch';

export const clientAlgolia = algoliasearch(
  functions.config().algolia.app_id,
  functions.config().algolia.api_key
);

export const userIndex = clientAlgolia.initIndex(
  functions.config().algolia.user_index
);
