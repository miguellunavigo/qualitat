import { IIdleDefaultConfig } from 'src/app/common/interfaces/default.interface';
import { Injectable, NgZone, Inject } from '@angular/core';
import {
  from,
  fromEvent,
  interval,
  merge,
  Observable,
  of,
  Subject,
  Subscription,
  timer
} from 'rxjs';
import {
  bufferTime,
  distinctUntilChanged,
  filter,
  finalize,
  map,
  scan,
  switchMap,
  take,
  takeUntil,
  tap
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IdleService {

  activityEvents: Observable<any>;
  timerStart: Subject<boolean>;
  idleDetected: Subject<boolean>;
  timeoutSub: Subject<boolean>;
  idle: Observable<any>;
  timer: Observable<any>;
  idleMillisec: number;
  timeout: number;
  isTimeout: boolean;
  isInactivityTimer: boolean;
  isIdleDetected: boolean;
  idleSubscription: Subscription;

  constructor(
    @Inject('idleConfig') config: IIdleDefaultConfig,
    private _ngZone: NgZone
  ) {
    this.timerStart = new Subject<boolean>();
    this.idleDetected = new Subject<boolean>();
    this.timeoutSub = new Subject<boolean>();
    this.setConfig(config);
  }


  public startWatching() {
    const seconds = 1000;
    if (!this.activityEvents) {
      this.activityEvents = merge(
        fromEvent(window, 'mousemove'),
        fromEvent(window, 'resize'),
        fromEvent(document, 'keydown'),
        fromEvent(document, 'touchmove')
      );
    }

    this.idle = from(this.activityEvents);

    if (this.idleSubscription) {
      this.idleSubscription.unsubscribe();
    }

    this.idleSubscription = this.idle.pipe(
        bufferTime(seconds),
        filter(
          arr => !arr.length && !this.isIdleDetected && !this.isInactivityTimer
        ),
        tap(() => {
          this.isIdleDetected = true;
          this.idleDetected.next(true);
        }),
        switchMap(() =>
          this._ngZone.runOutsideAngular(() =>
            interval(seconds).pipe(
              takeUntil(
                merge(
                  this.activityEvents,
                  timer(this.idleMillisec).pipe(
                    tap(() => {
                      this.isInactivityTimer = true;
                      this.timerStart.next(true);
                    })
                  )
                )
              ),
              finalize(() => {
                this.isIdleDetected = false;
                this.idleDetected.next(false);
              })
            )
          )
        )
      )
      .subscribe();

    this.setupTimer(this.timeout);
  }

  public stopWatching() {
    this.stopTimer();
    if (this.idleSubscription) {
      this.idleSubscription.unsubscribe();
    }
  }

  public stopTimer() {
    this.isInactivityTimer = false;
    this.timerStart.next(false);
  }

  public resetTimer() {
    this.stopTimer();
    this.isTimeout = false;
  }

  public onTimerStart(): Observable<number> {
    return this.timerStart.pipe(
      distinctUntilChanged(),
      switchMap(start => (start ? this.timer : of(null)))
    );
  }

  public onIdleStatusChanged(): Observable<boolean> {
    return this.idleDetected.asObservable();
  }

  public onTimeout(): Observable<boolean> {
    return this.timeoutSub.pipe(
      filter(timeout => !!timeout),
      tap(() => (this.isTimeout = true)),
      map(() => true)
    );
  }

  public getConfigValue(): IIdleDefaultConfig {
    return {
      idle: this.idleMillisec,
      timeout: this.timeout,
    };
  }

  public setConfigValues(config: IIdleDefaultConfig) {
    if (this.idleSubscription && !this.idleSubscription.closed) {
      console.error('Call stopWatching() before set config values');
      return;
    }

    this.setConfig(config);
  }

  private setConfig(config: IIdleDefaultConfig) {
    const seconds = 750;
    if (config.idle) {
      this.idleMillisec = config.idle * seconds;
    }
    if (config.timeout) {
      this.timeout = config.timeout;
    }
  }

  public setCustomActivityEvents(customEvents: Observable<any>) {
    if (this.idleSubscription && !this.idleSubscription.closed) {
      console.error('Call stopWatching() before set custom activity events');
      return;
    }

    this.activityEvents = customEvents;
  }

  public setupTimer(timeout: number) {
    const seconds = 1000;
    this._ngZone.runOutsideAngular(() => {
      this.timer = interval(seconds).pipe(
        take(timeout),
        map(() => 1),
        scan((accumulated, n) => accumulated + n),
        tap(count => {
          if (count === timeout) {
            this.timeoutSub.next(true);
          }
        })
      );
    });
  }
}
