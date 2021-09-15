import { Injectable } from '@angular/core';

@Injectable()
export class FormateService {
    constructor() { }
    Json(obj) {
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
    Excel(obj) {
        let data: any = {};
        obj = obj.filter(item => item.length !== 1);
        obj.forEach(item => {
            if (item[1] !== "") {
                switch (item[0]) {
                    case "object":
                        if (data[item[1]]) {
                            data[item[1]][item[3]] = item[2];
                        } else {
                            data[item[1]] = {};
                            data[item[1]][item[3]] = item[2];
                        }
                        break;
                    case "array":
                        if (data[item[1]]) {
                            data[item[1]].push(item[2]);
                        } else {
                            data[item[1]] = [];
                            data[item[1]].push(item[2]);
                        }
                        break;
                }
            }
            else {
                data[item[0]] = item[2];
            }
        });
        console.log(data);
        return data;
    }
}
