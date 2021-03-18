import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { AlgoliaService } from '@pang/algolia';
import { UserAlgolia } from '@pang/interface';
import { Hit } from '@algolia/client-search';
import { positionSearch } from './search.animation';
import { environment } from '@pang/mobile/environments/environment';

@Component({
  selector: 'pang-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [positionSearch],
})
export class SearchComponent implements AfterViewInit {
  @ViewChild('input') inputElement: ElementRef<HTMLInputElement>;

  hits: Array<Hit<UserAlgolia>> = [];
  searchText: string;
  openList = false;
  topPosition: number;
  isFocus = false;

  constructor(
    private algoliaService: AlgoliaService,
    private elementRef: ElementRef<HTMLDivElement>,
    private change: ChangeDetectorRef,
  ) {}

  ngAfterViewInit(): void {
    this.calculateDistance();
  }

  @HostListener('document:click', ['$event'])
  listenClick(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.openList = false;
    }
    this.change.detectChanges();
  }

  searchAlgolia(text: string) {
    this.algoliaService
      .search<UserAlgolia>(environment.userAlgoliaIndex, text, {
        hitsPerPage: 4,
      })
      .then(({ hits }) => {
        this.openList = !!text;
        this.hits = hits;
        this.calculateDistance();
      });
  }

  focusInput() {
    this.searchAlgolia(this.searchText);
    this.isFocus = true;
  }

  blurInput() {
    this.isFocus = false;
    setTimeout(() => (this.openList = false), 200);
  }

  private calculateDistance() {
    const element = this.inputElement.nativeElement;
    const topDistance = element.offsetTop;
    const { height } = element.getBoundingClientRect();
    this.topPosition = topDistance + height;
  }
}
