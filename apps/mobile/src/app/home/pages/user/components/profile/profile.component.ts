import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as d3 from 'd3';
import * as d3Zoom from 'd3-zoom';
import { Hit } from '@algolia/client-search';
import { Subscription } from 'rxjs';
import { ScaleLinear, ZoomBehavior, ZoomedElementBaseType } from 'd3';
import { first, switchMap } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import { ConnectionInterface, UserAlgolia } from '@pang/interface';
import { ConnectionService, UserService } from '@pang/core';
import { ConnectionStatus } from '@pang/const';
import { circleAnimation2, info } from '@pang/mobile/app/home/pages/user/user.animation';
import { codeToName } from '@pang/utils';

@Component({
  selector: 'pang-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [circleAnimation2, info],
})
export class ProfileComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() user: Hit<UserAlgolia>;
  @ViewChild('root') rootElement: ElementRef<HTMLDivElement>;

  connection: ConnectionInterface;
  request: ConnectionInterface;

  private group: d3.Selection<HTMLDivElement, unknown, null, undefined>;
  private height: number;
  private root: d3.Selection<HTMLDivElement, unknown, null, undefined>;
  private width: number;
  private zoom: ZoomBehavior<ZoomedElementBaseType, unknown>;
  private subscribe: Subscription;
  private readonly zoomLimit: [number, number] = [1, 10];
  private readonly opacityScale: ScaleLinear<number, number, never>;

  constructor(
    private userService: UserService,
    private snack: MatSnackBar,
    private connectionService: ConnectionService,
    private auth: AngularFireAuth,
  ) {
    this.opacityScale = d3.scaleLinear().domain([1, 4]).range([1, 0]);
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
      .scaleExtent(this.zoomLimit)
      .on('zoom', this.zoomed.bind(this));

    this.group.selectAll('.level1').on('click', this.zoomToElement.bind(this));

    this.root.call(this.zoom);
    this.root.on('click', this.reset.bind(this));
  }

  ngOnDestroy(): void {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
  }

  zoomToElement(event: MouseEvent) {
    event.stopPropagation();
    const target = event.currentTarget as HTMLDivElement;
    const x = target.offsetLeft + target.offsetWidth / 2;
    const y = target.offsetTop + target.offsetHeight / 2;

    this.root
      .transition()
      .duration(1500)
      .call(
        this.zoom.transform,
        d3Zoom.zoomIdentity
          .translate(this.width / 2, this.height / 2)
          .scale(5)
          .translate(-x, -y),
      );
  }

  zoomed({ transform }: d3Zoom.D3ZoomEvent<HTMLDivElement, null>) {
    this.group.style(
      'transform',
      `translate(${transform.x}px, ${transform.y}px) scale(${transform.k})`,
    );

    this.group.selectAll('.hideZoom').style('opacity', this.opacityScale(transform.k));
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
}
