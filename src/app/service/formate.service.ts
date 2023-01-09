import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class FormateService {
    constructor(private http: HttpClient) { }
    // testLangFile(file: string) {
    //     return this.http.get(`file/${file}.json`).map(res => res);
    // }
    JSON(obj) {
        console.log(obj);
        let data = [], keys = Object.keys(obj);
        keys.forEach(item => {
            let key = obj[item];
            if (typeof key == "object") {
                data.push([""]);
                switch (key[0]) {
                    case undefined:
                        Object.keys(key).forEach(Data => data.push(["object", item, key[Data], Data]));
                        break;
                    default:
                        key.forEach(Data => data.push(["array", item, Data]));
                        break;
                }
                data.push([""]);
            } else {
                data.push([item, "", key]);
            }

        })
        console.log(data);
        return data;
    }
    XLSX(obj) {
        console.log(obj);
        let data: any = {};
        obj = obj.filter(item => item.length !== 1);
        obj.forEach(item => {
            // console.log(item);
            if (item[1] !== "") {
                // console.log("undefined", [obj, item]);
                switch (item[0]) {
                    case "object":
                        // console.log("object", [obj, item]);
                        if (data[item[1]]) {
                            data[item[1]][item[3]] = item[2];
                        } else {
                            data[item[1]] = {};
                            data[item[1]][item[3]] = item[2];
                        }
                        break;
                    case "array":
                        // console.log("array", [obj, item]);
                        if (data[item[1]]) {
                            data[item[1]].push(item[2]);
                        } else {
                            data[item[1]] = [];
                            data[item[1]].push(item[2]);
                        }
                        break;
                    // default:
                    //     if (data[item[1]]) {
                    //         data[item[1]] = item[3];
                    //     } else {
                    //         data[item[1]] = {};
                    //         data[item[1]] = item[3];
                    //     }
                    //     break;
                }
            }
            else {
                // console.log("else", [obj, item]);
                data[item[0]] = item[2];
            }
        });
        // console.log(data, obj);
        return data;
    }
}
