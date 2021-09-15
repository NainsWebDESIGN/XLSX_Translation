import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  JsForEx: string = "";
  constructor() { }
  getData(event) {
    let file = event.target.files[0], fileReader = new FileReader();
    fileReader.readAsText(file, "UTF-8");
    fileReader.onload = () => {
      let data = JSON.parse(fileReader.result as any), dataArr = [], keys = Object.keys(data);
      console.log(data);
      keys.forEach(item => {
        let key = data[item];
        if (typeof key == "object") {
          dataArr.push([""]);
          switch (key[0]) {
            case undefined:
              dataArr.push([item, "Object物件"]);
              Object.keys(key).forEach(Data => dataArr.push([Data, key[Data]]));
              break;
            default:
              dataArr.push([item, "Array陣列"]);
              key.forEach(Data => dataArr.push(["", Data]));
              break;
          }
          dataArr.push([""]);
        } else {
          dataArr.push([item, key]);
        }
      })
      console.log(dataArr);

      /* 生成工作表 */
      const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(dataArr);

      /* 生成工作簿並添加工作表 */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      console.log(wb)
      /* 保存到文件 */
      XLSX.writeFile(wb, `${this.JsForEx}.xlsx`);
    }
    fileReader.onerror = err => {
      console.log(err);
    }
  }
  ngOnInit() {
  }
}
