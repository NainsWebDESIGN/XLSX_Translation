import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class Observer {
    private obj = {
        CompareOne: null,
        CompareTwo: null
    };
    private subObj = {
        CompareOne: new BehaviorSubject(this.obj.CompareOne),
        CompareTwo: new BehaviorSubject(this.obj.CompareTwo)
    };
    obserObj = {
        CompareOne: this.subObj.CompareOne.asObservable(),
        CompareTwo: this.subObj.CompareTwo.asObservable()
    };
    constructor() { }
    changeObj(Observer: string, value: any) {
        this.obj[Observer] = value;
        this.subObj[Observer].next(this.obj[Observer]);
    }
}
