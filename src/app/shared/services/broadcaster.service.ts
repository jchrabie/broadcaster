import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

interface BroadcastEvent {
    key: string;
    data?: any;
}

@Injectable({
    providedIn: 'root',
})
export class BroadcasterService {
    private _eventBus: Subject<BroadcastEvent>;

    constructor() {
        this._eventBus = new Subject<BroadcastEvent>();
    }

    public emit<T>(key: string, data?: T): void {
        this._eventBus.next({ key, data });
    }

    public on<T>(...keys: string[]): Observable<T> {
        return this._eventBus.asObservable().pipe(
            filter(event => !!keys.find(key => event.key === key)),
            map(event => {
                console.log(`${event.key} has been fired`)
                return event.data as T
            })
        );
    }
}