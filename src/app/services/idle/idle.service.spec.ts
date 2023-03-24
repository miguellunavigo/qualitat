import { TestBed } from '@angular/core/testing';
import { IdleService } from './idle.service';
import * as rxjs from 'rxjs';
import { configureTestSuite } from 'ng-bullet';

describe('IdleService', () => {

  let service: IdleService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: 'idleConfig', useValue: {
            idle: 1,
            timeout: 1,
          }
        },
      ]
    });
    service = TestBed.get(IdleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('startWatching', () => {

    it('should execute merge with 4 fromEvents', () => {
      service.activityEvents = null;
      const mergeSpy = spyOnProperty(rxjs, 'merge').and.returnValue(() => rxjs.of({}));
      const fromEventSpy = spyOnProperty(rxjs, 'fromEvent').and.returnValue(() => rxjs.of({}));
      service.startWatching();
      expect(mergeSpy).toHaveBeenCalledTimes(1);
      expect(fromEventSpy).toHaveBeenCalledTimes(4);
    });

    it('should execute not execute merge if activityEvents its not null', () => {
      service.activityEvents = rxjs.of({});
      const mergeSpy = spyOnProperty(rxjs, 'merge').and.returnValue(() => rxjs.of({}));
      service.startWatching();
      expect(mergeSpy).toHaveBeenCalledTimes(0);
    });

    it('should execute unsubcribe if idleSubscription has a value', () => {
      service.idleSubscription = new rxjs.Subscription();
      const subsSpy = spyOn(service.idleSubscription, 'unsubscribe').and.callFake(() => {});
      service.startWatching();
      expect(subsSpy).toHaveBeenCalledTimes(1);
    });

  });

  describe('stopWatching', () => {

    it('should execute stop timer and not unsubscribe if idleSubscription is null', () => {
      const subSpy = spyOn(service['idleSubscription'] as any, 'unsubscribe').and.callFake(() => {});
      const stopSpy = spyOn(service, 'stopTimer').and.callFake(() => {});
      service.idleSubscription = null;
      service.stopWatching();
      expect(stopSpy).toHaveBeenCalledTimes(1);
      expect(subSpy).toHaveBeenCalledTimes(0);
    });

    it('should execute stop timer and unsubscribe if idleSubscription is not null', () => {
      service.idleSubscription = new rxjs.Subscription();
      const subSpy = spyOn(service.idleSubscription, 'unsubscribe').and.callFake(() => {});
      const stopSpy = spyOn(service, 'stopTimer').and.callFake(() => {});
      service.stopWatching();
      expect(stopSpy).toHaveBeenCalledTimes(1);
      expect(subSpy).toHaveBeenCalledTimes(1);
    });

  });

  describe('stopTimer', () => {

    it('should set inactivity timer to false and call next with false', () => {
      const timeSpy = spyOn(service.timerStart, 'next').and.callFake(() => {});
      service.stopTimer();
      expect(service.isInactivityTimer).toBeFalsy();
      expect(timeSpy).toHaveBeenCalledTimes(1);
    });

  });

  describe('resetTimer', () => {

    it('should call stopTimer and set isTimeout to false', () => {
      const stopSpy = spyOn(service, 'stopTimer').and.callFake(() => {});
      service.resetTimer();
      expect(service.isTimeout).toBeFalsy();
      expect(stopSpy).toHaveBeenCalledTimes(1);
    });

  });

  describe('onTimerStart', () => {

    it('should call onTimerStart and with next call start must be false if timer is false', () => {
      service.onTimerStart().subscribe((time) => {
        expect(time).toBeFalsy();
      }).unsubscribe();
      service.timerStart.next();
    });

    it('should call onTimerStart and with next call start must be false if timer is true', () => {
      service.onTimerStart().subscribe((time) => {
        expect(time).toBeTruthy();
      }).unsubscribe();
      service.timerStart.next(true);
    });

  });

  describe('onTimeout', () => {

    it('should call onTimeout and with next call start must be false if timer is false', () => {
      service.onTimeout().subscribe((time) => {
        expect(time).toBeFalsy();
      }).unsubscribe();
      service.timeoutSub.next(false);
    });
  });

  describe('onIdleStatusChanged', () => {

    it('should call asObservable one time', () => {
      const idleSpy = spyOn(service.idleDetected, 'asObservable').and.callFake(() => {});
      service.onIdleStatusChanged();
      expect(idleSpy).toHaveBeenCalledTimes(1);
    });

  });

  describe('getConfigValue', () => {

    it('should return config values of module injection', () => {
      expect(JSON.stringify(service.getConfigValue())).toBe(JSON.stringify({ idle: 1000, timeout: 1 }));
    });

  });

  describe('setConfigValues', () => {

    it('should not call setConfig if idleSubscription is not null and is not closed', () => {
      service.idleSubscription = new rxjs.Subscription();
      service.idleSubscription.closed = false;
      const setSpy = spyOn(service as any, 'setConfig').and.callFake(() => {});
      service.setConfigValues({});
      expect(setSpy).toHaveBeenCalledTimes(0);
    });

    it('should call setConfig if idleSubscription is not null and is closed', () => {
      service.idleSubscription.closed = true;
      const setSpy = spyOn(service as any, 'setConfig').and.callFake(() => {});
      service.setConfigValues({});
      expect(setSpy).toHaveBeenCalledTimes(1);
    });

  });

  describe('setConfig', () => {

    it('should idleMillisec and timeout remain null if not config.idle and config.timeout are found ', () => {
      service.idleMillisec = null;
      service.timeout = null;
      service['setConfig']({});
      expect(service.idleMillisec).toBe(null);
      expect(service.timeout).toBe(null);
    });

  });

  describe('setCustomActivityEvents', () => {

    it('should not set activityEvents if idleSubscription is not null and is not closed', () => {
      service.activityEvents = null;
      service.idleSubscription = new rxjs.Subscription();
      service.idleSubscription.closed = false;
      service.setCustomActivityEvents(new rxjs.Observable());
      expect(service.activityEvents).toBeFalsy();
    });

    it('should set activityEvents if idleSubscription is not null and is closed', () => {
      service.activityEvents = null;
      service.idleSubscription.closed = true;
      service.setCustomActivityEvents(new rxjs.Observable());
      expect(service.activityEvents).toBeTruthy();
    });

  });


});
