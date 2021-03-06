import { Injectable, Optional } from '@angular/core';
import algoliasearch, { SearchClient } from 'algoliasearch';
import { Config } from '../interfaces/config';
import { RequestOptions } from '@algolia/transporter';
import { SearchOptions } from '@algolia/client-search';

@Injectable()
export class AlgoliaService {
  private client: SearchClient;

  constructor(@Optional() config: Config) {
    this.client = algoliasearch(config.appId, config.apiKey);
  }

  search<T>(index: string, search: string, config?: RequestOptions & SearchOptions) {
    const indexAlgolia = this.client.initIndex(index);
    return indexAlgolia.search<T>(search, config);
  }
}
