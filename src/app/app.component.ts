import { Component } from '@angular/core';
import { FormateService } from '@service';
import * as XLSX from 'xlsx';
declare const saveAs: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  JsForEx: string = "";
  ExForJs: string = "";
  constructor(private formate: FormateService) { }
  getExcel(event) {
    /* 連接文件閱讀器 */
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* 閱讀工作簿 */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* 抓住頁籤 */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* 保存數據 */
      let data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
      let ExcelData = this.formate.Excel(data);

      let content = new Blob([JSON.stringify(ExcelData)], { type: "text/plain;charset=utf-8" });
      saveAs(content, `${this.ExForJs}.json`);
      event.target.value = "" // 清空
      this.ExForJs = "";
    };
    reader.readAsBinaryString(target.files[0]);
  }
  getJSON(event) {
    let file = event.target.files[0], fileReader = new FileReader();
    fileReader.readAsText(file, "UTF-8");
    fileReader.onload = () => {

      let data = this.formate.Json(JSON.parse(fileReader.result as any));

      /* 生成工作表 */
      const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);

      /* 生成工作簿並添加工作表 */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      /* 保存到文件 */
      XLSX.writeFile(wb, `${this.JsForEx}.xlsx`);

      event.target.value = "" // 清空
      this.JsForEx = "";
    }
    fileReader.onerror = err => console.log(err);
  }
}
