import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlgoliaService } from './services/algolia.service';
import { Config } from './interfaces/config';

@NgModule({
  imports: [CommonModule],
  providers: [AlgoliaService],
})
export class AlgoliaModule {
  static forRoot(config: Config): ModuleWithProviders<AlgoliaModule> {
    return {
      ngModule: AlgoliaModule,
      providers: [{provide: Config, useValue: config}]
    };
  }
}
