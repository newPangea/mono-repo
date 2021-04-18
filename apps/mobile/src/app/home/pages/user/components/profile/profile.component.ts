import { Hit } from '@algolia/client-search';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConnectionStatus } from '@pang/const';
import { ConnectionService, UserService } from '@pang/core';
import { ConnectionInterface, UserAlgolia } from '@pang/interface';
import {
  circleAnimation2,
  info,
  resourceAnimation,
} from '@pang/mobile/app/home/pages/user/user.animation';
import { ZoomService } from '@pang/mobile/app/services/zoom.service';
import { codeToName } from '@pang/utils';
import * as d3 from 'd3';
import { ScaleLinear, ZoomBehavior, ZoomedElementBaseType } from 'd3';
import * as d3Zoom from 'd3-zoom';
import { Subscription } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { USER_CONST } from '../../user.constants';

@Component({
  selector: 'pang-user-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [circleAnimation2, info, resourceAnimation],
})
export class ProfileComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() user: Hit<UserAlgolia>;
  @ViewChild('root') rootElement: ElementRef<HTMLDivElement>;

  connection: ConnectionInterface;
  request: ConnectionInterface;
  showLevel1 = false;
  scaleFactor = 1;
  uid: string;

  private group: d3.Selection<HTMLDivElement, unknown, null, undefined>;
  private height: number;
  private root: d3.Selection<HTMLDivElement, unknown, null, undefined>;
  private width: number;
  private zoom: ZoomBehavior<ZoomedElementBaseType, unknown>;
  private subscribe: Subscription;

  readonly level1 = USER_CONST.levelZoom.level1;
  private readonly zoomLimit: [number, number] = [1, 45];
  private readonly opacityScale: ScaleLinear<number, number, never>;
  private readonly deltaLevel = 1;
  private suscribeZoom: Subscription;

  constructor(
    private userService: UserService,
    private snack: MatSnackBar,
    private connectionService: ConnectionService,
    private auth: AngularFireAuth,
    private zoomService: ZoomService,
  ) {
    this.opacityScale = d3.scaleLinear().domain([1, 4]).range([1, 0]);
    this.auth.currentUser.then((user) => (this.uid = user.uid));
    this.suscribeZoom = this.zoomService.$element.subscribe((element) =>
      this.goToElement(element, USER_CONST.levelZoom.level2),
    );
  }

  ngOnChanges(): void {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
    if (this.user) {
      this.loadConnection();
    }
  }

  ngAfterViewInit(): void {
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

  ngOnDestroy(): void {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
    this.suscribeZoom.unsubscribe();
  }

  zoomToElement(event: MouseEvent, levelZoom: number) {
    event.stopPropagation();
    const target = event.currentTarget as HTMLDivElement;
    this.goToElement(target, levelZoom);
  }

  goToElement(target: HTMLElement, levelZoom: number) {
    const root = this.group.node();
    const rootSize = root.getClientRects()[0];
    const { x, y, width, height } = target.getClientRects()[0];
    const xRelative = (x - rootSize.x) / this.scaleFactor;
    const yRelative = (y - rootSize.y) / this.scaleFactor;
    const xValue = xRelative + width / this.scaleFactor / 2;
    const yValue = yRelative + height / this.scaleFactor / 2;

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

  async sendRequest(event: MouseEvent) {
    event.stopPropagation();
    await this.userService.sendConnectionRequest(this.user.objectID);
    this.snack.open(`You invited to ${this.user.name} to connect`, 'close', { duration: 2000 });
  }

  acceptRequest(event: MouseEvent) {
    event.stopPropagation();
    return this.connectionService
      .connection()
      .doc(this.request.key)
      .update({ status: ConnectionStatus.ACCEPTED });
  }

  cancelRequest(event: MouseEvent) {
    event.stopPropagation();
    return this.connectionService.connection().doc(this.connection.key).delete();
  }

  private loadConnection() {
    this.subscribe = this.auth.user
      .pipe(
        first(),
        switchMap(({ uid }) => this.connectionService.getConnection(uid, this.user.objectID)),
      )
      .subscribe((connection) => {
        this.connection = connection.length ? connection[0] : null;
      });

    const subscribeRequest = this.auth.user
      .pipe(
        first(),
        switchMap(({ uid }) => this.connectionService.getConnection(this.user.objectID, uid)),
      )
      .subscribe((connection) => {
        this.request = connection.length ? connection[0] : null;
      });

    this.subscribe.add(subscribeRequest);
  }

  get nameCode() {
    return this.user ? codeToName(this.user.code) : '';
  }

  get level1Style() {
    return {
      'transform-origin': 'left top',
    };
  }
}
