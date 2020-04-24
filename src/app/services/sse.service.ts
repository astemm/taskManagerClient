import { Injectable, NgZone } from '@angular/core';
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class SseService {
  constructor(private _zone: NgZone) {}
  getServerSentEvent(url: string): Observable<any> {
    return Observable.create(observer => {
      const eventSource = this.getEventSource(url);
      eventSource.onmessage = event => {
        this._zone.run(() => {
          observer.next(event.data);
          console.log(event);
        });
      };
      eventSource.onerror = error => {
        this._zone.run(() => {
          observer.error(error);
          console.log(error);
        });
      };
    //  return () => eventSource.close();
    });
  }
  private getEventSource(url: string): EventSource {
    return new EventSource(url);
  }
}