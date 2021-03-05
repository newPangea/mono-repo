import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { AlgoliaService } from '@pang/algolia';
import { UserAlgolia } from '@pang/interface';
import { Hit } from '@algolia/client-search';

@Component({
  selector: 'pang-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements AfterViewInit {
  @ViewChild('input') inputElement: ElementRef<HTMLInputElement>;

  hits: Array<Hit<UserAlgolia>> = [];
  searchText: string;
  openList = false;
  topPosition: number;

  constructor(private algoliaService: AlgoliaService, private elementRef: ElementRef<HTMLDivElement>) {}

  ngAfterViewInit(): void {
    const { y, height } = this.inputElement.nativeElement.getClientRects()[0];
    this.topPosition = y + height + 20;
  }


  @HostListener('document:click', ['$event'])
  listenClick(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.openList = false;
    }
  }

  searchAlgolia(text: string) {
    this.algoliaService.search<UserAlgolia>('dev_USER', text).then(({ hits }) => {
      this.openList = !!text;
      this.hits = hits;
    });
  }

  focusInput() {
    this.searchAlgolia(this.searchText);
  }
}
