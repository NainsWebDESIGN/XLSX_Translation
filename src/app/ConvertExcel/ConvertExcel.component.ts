import { Component } from '@angular/core';
import { FormateService } from '@service';
import { Observable } from 'rxjs/Observable';
import * as XLSX from 'xlsx';
declare const saveAs: any;

@Component({
  selector: 'app-ConvertExcel',
  templateUrl: './ConvertExcel.component.html',
  styleUrls: ['./ConvertExcel.component.scss']
})
export class ConvertExcelComponent {
  ExForJs: string = null;
  constructor(private formate: FormateService) {
    // let data = this.formate.testLangFile('es-mx'),
    //   dataa = this.formate.testLangFile('zh-cn');
    // Observable.forkJoin(data, dataa).subscribe(data => {
    //   let Filter = {}, esMx = Object.keys(data[0]), zhCn = Object.keys(data[1]);
    //   zhCn.forEach(item => Filter[item] = (esMx.indexOf(item) >= 0) ? data[0][item] : item)
    //   let content = new Blob([JSON.stringify(Filter)], { type: "text/plain;charset=utf-8" });
    //   console.log(Filter, Object.keys(Filter), content);
    //   saveAs(content, `es-mx.json`);
    // })
  }
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
      let ExcelData = this.formate.XLSX(data);
      let content = new Blob([JSON.stringify(ExcelData)], { type: "text/plain;charset=utf-8" });
      // console.log(content);
      saveAs(content, `${this.ExForJs}.json`);
      event.target.value = "" // 清空
      this.ExForJs = "";
    };
    reader.readAsBinaryString(target.files[0]);
  }
}
