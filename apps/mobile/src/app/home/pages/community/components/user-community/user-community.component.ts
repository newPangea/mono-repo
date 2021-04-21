import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';

import * as d3 from 'd3';
import * as d3Zoom from 'd3-zoom';
import { Hit } from '@algolia/client-search';
import { Subscription } from 'rxjs';
import { ScaleLinear, ZoomBehavior, ZoomedElementBaseType } from 'd3';
import { first } from 'rxjs/operators';

import { ConnectionInterface, User, UserAlgolia } from '@pang/interface';
import { selectMyConnections } from '@pang/mobile/app/state/connection/connection.selectors';
import {
  circleAnimation2,
  info,
  resourceAnimation,
} from '@pang/mobile/app/home/pages/user/user.animation';
import { codeToName } from '@pang/utils';
import { select, State } from '@ngrx/store';
import { AppState } from '@pang/mobile/app/state/app.state';
import { AlgoliaService } from '@pang/algolia';
import { environment } from '@pang/mobile/environments/environment';
import { MemberData } from '@pang/mobile/app/shared/modals/interfaces/member-interface';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { PreferencesFilterComponent } from '@pang/mobile/app/shared/modals/preferences-filter/preferences-filter.component';
import { PreferenceInterface } from '@pang/mobile/app/shared/modals/interfaces/preferences-interface';
import { UserService } from '@pang/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'pang-user-community',
  templateUrl: './user-community.component.html',
  styleUrls: ['./user-community.component.scss'],
  animations: [
    circleAnimation2,
    info,
    resourceAnimation,
    trigger('listAnimation', [
      transition('* => *', [
        query(
          ':enter',
          [style({ opacity: 0 }), stagger(800, [animate('0.6s', style({ opacity: 1 }))])],
          { optional: true },
        ),
      ]),
    ]),
  ],
})
export class UserCommunityComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() user: Hit<UserAlgolia>;
  @ViewChild('root') rootElement: ElementRef<HTMLDivElement>;

  connection: ConnectionInterface;
  request: ConnectionInterface;
  userSubscription: Subscription;
  showLevel1 = false;
  scaleFactor = 1;
  uid: string;
  hits: Array<Hit<UserAlgolia>> = [];
  users: MemberData[] = [];
  usersAux: MemberData[] = [];
  arrayTransformed: string;
  stateSubscription: Subscription;
  selectedPreferences: PreferenceInterface[] = [];

  private group: d3.Selection<HTMLDivElement, unknown, null, undefined>;
  private height: number;
  private readonly deltaLevel = 1;
  private readonly opacityScale: ScaleLinear<number, number, never>;
  private readonly zoomLimit: [number, number] = [1, 10];
  private root: d3.Selection<HTMLDivElement, unknown, null, undefined>;
  private subscribe: Subscription;
  private width: number;
  private zoom: ZoomBehavior<ZoomedElementBaseType, unknown>;
  readonly level1 = 5;

  constructor(
    private algoliaService: AlgoliaService,
    private bottomSheet: MatBottomSheet,
    private router: Router,
    private state: State<AppState>,
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) {
    this.opacityScale = d3.scaleLinear().domain([1, 4]).range([1, 0]);
  }

  ngOnChanges(): void {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    this.getConnectionsState(this.user.uid);
    const element = this.rootElement.nativeElement;
    this.width = element.clientWidth;
    this.height = element.clientHeight;

    this.root = d3.select(element);
    this.group = this.root.select('#group');

    this.zoom = d3Zoom
      .zoom()
      .translateExtent([
        [0, 0],
        [this.width, this.height],
      ])
      .scaleExtent(this.zoomLimit);
    this.zoom.on('zoom', null);
    this.zoom.on('zoom', this.zoomed.bind(this));

    this.group.selectAll('.user-action').on('click', null);
    this.group
      .selectAll('.user-action')
      .on('click', (element) => this.zoomToElement(element, this.level1));

    this.root.call(this.zoom);
    this.root.on('click', null);
    this.root.on('click', this.reset.bind(this));
  }

  goToUser(uid: string) {
    this.router.navigate(['/home/user', uid]);
  }

  ngOnDestroy(): void {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
  }

  filter() {
    const aux = this.bottomSheet.open(PreferencesFilterComponent, {
      panelClass: 'profile_sheet',
      data: {
        preferences: this.selectedPreferences,
      },
    });
    aux.afterDismissed().subscribe((preferences) => {
      this.selectedPreferences = preferences;
      if (this.selectedPreferences && this.selectedPreferences.length > 0) {
        this.snackBar.open('Showing users based on preferences selected', 'close', {
          duration: 5000,
        });
        this.filterByPreferences(this.selectedPreferences);
      } else {
        this.snackBar.open('No filter selected, showing my connections', 'close', {
          duration: 3000,
        });
        this.getConnectionsState(this.user.uid);
      }
    });
  }

  filterByPreferences(preferences: PreferenceInterface[]) {
    this.users = [];
    let aux = [];
    preferences.forEach((element) => {
      this.usersAux = [];
      this.userSubscription = this.userService.getByPreference(element.key).subscribe((users) => {
        users.forEach((element) => {
          this.usersAux.push({
            name: element.name,
            address: element.school.addres.split(','),
            avatar: element.imgUrl,
            checked: false,
            country: element.country.code,
            role: this.getNameCode(element.code),
            uid: element.uid,
          });
        });
        aux = [...this.users, ...this.usersAux];
      });
    });
    setTimeout(() => {
      this.users = aux;
    }, 500);
  }

  getConnectionsState(uid: string) {
    this.users = [];
    this.stateSubscription = this.state
      .pipe(select(selectMyConnections))
      .subscribe((connections) => {
        const keys = [];
        connections.forEach((element) => {
          if (element.from != uid) {
            keys.push(element.from);
          }
          if (element.to != uid) {
            keys.push(element.to);
          }
        });
        if (keys.length > 0) {
          const objectIDsArray = this.transformArray(keys);
          this.algoliaSearchData(objectIDsArray);
          if (this.stateSubscription) {
            this.stateSubscription.unsubscribe();
          }
        }
      });
  }

  algoliaSearchData(keys: string) {
    if (!!keys) {
      this.algoliaService
        .search<UserAlgolia>(environment.userAlgoliaIndex, '', {
          facetFilters: keys,
        })
        .then(({ hits }) => {
          this.hits = hits;
          hits.forEach((element) => {
            this.addToUsers(element);
          });
        });
    }
  }

  addToUsers(user: User) {
    this.users.push({
      name: user.name,
      address: user.school.addres.split(','),
      avatar: user.imgUrl,
      checked: false,
      uid: user.uid,
      country: user.country?.code,
      role: this.getNameCode(user.code),
    });
  }

  transformArray(array: string[]) {
    for (let index = 0; index < array.length; index++) {
      if (array.length > 1) {
        if (index == 0) {
          this.arrayTransformed = '[["objectID:' + array[index] + '",';
        } else if (index == array.length - 1) {
          this.arrayTransformed += ' "objectID:' + array[index] + '"]]';
        } else {
          this.arrayTransformed += ' "objectID:' + array[index] + '",';
        }
      } else if (array.length == 1) {
        this.arrayTransformed = '[["objectID:' + array[index] + '"]]';
      } else {
        this.arrayTransformed = '';
      }
    }
    return this.arrayTransformed;
  }

  zoomToElement(event: MouseEvent, levelZoom: number) {
    event.stopPropagation();
    const root = this.group.node();
    const target = event.currentTarget as HTMLDivElement;
    const rootSize = root.getClientRects()[0];

    const { x, y } = target.getClientRects()[0];

    const xRelative = (x - rootSize.x) / this.scaleFactor;
    const yRelative = (y - rootSize.y) / this.scaleFactor;

    const xValue = xRelative + target.offsetWidth / 2;
    const yValue = yRelative + target.offsetHeight / 2;

    this.root
      .transition()
      .duration(1500)
      .call(
        this.zoom.transform,
        d3Zoom.zoomIdentity
          .translate(this.width / 2, this.height / 2)
          .scale(levelZoom)
          .translate(-xValue, -yValue),
      );
  }

  zoomed({ transform }: d3Zoom.D3ZoomEvent<HTMLDivElement, null>) {
    this.group.style(
      'transform',
      `translate(${transform.x}px, ${transform.y}px) scale(${transform.k})`,
    );
    this.group
      .selectAll('.hideZoom')
      .style('opacity', this.opacityScale(transform.k))
      .style('display', () => (transform.k + this.deltaLevel >= this.level1 ? 'none' : ''));

    this.showLevel1 = transform.k + this.deltaLevel >= this.level1;
    this.scaleFactor = transform.k;
  }

  reset() {
    this.root
      .transition()
      .duration(1500)
      .call(
        this.zoom.transform,
        d3Zoom.zoomIdentity,
        d3Zoom.zoomTransform(this.root.node()).invert([this.width / 2, this.height / 2]),
      );
  }

  get nameCode() {
    return this.user ? codeToName(this.user.code) : '';
  }

  getNameCode(code: string) {
    return code ? codeToName(code) : '';
  }

  get level1Style() {
    return {
      'transform-origin': 'left top',
    };
  }
}
