import { Component } from '@angular/core';
import { FormateService } from '@service';
import * as XLSX from 'xlsx';
declare const saveAs: any;

@Component({
  selector: 'app-Compare',
  templateUrl: './Compare.component.html',
  styleUrls: ['./Compare.component.scss']
})
export class CompareComponent {
  objOne: string = null;
  objTwo: string = null;
  fileOne: any = null;
  fileTwo: any = null;
  fileName1: string = "Excel";
  fileName2: string = "Excel";
  constructor(private formate: FormateService) { }
  Compare(value: any, obj: string) {
    let getData = () => {
      if (this.fileName1 == "Excel") {
        console.log(this.getExcel(this.fileOne));
      } else {
        console.log(this.getJSON(this.fileOne));
      }
      if (this.fileName2 == "Excel") {
        console.log(this.getExcel(this.fileTwo));
      } else {
        console.log(this.getJSON(this.fileTwo));
      }
      // this.getJSON(value);
      // let array1 = Object.values(data[0]), array2 = data[1];
      // array1 = array1.filter(val => array2.indexOf(val) == -1);
      // console.log(array1.join("\n"));
    }

    switch (obj) {
      case "objOne":
        this.fileOne = value;
        if (this.fileTwo == null) return;
        break;
      default:
        this.fileTwo = value;
        if (this.fileOne == null) return;
        break;
    }
    getData();
  }
  getExcel(event) {
    /* 連接文件閱讀器 */
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    return reader.onload = (e: any) => {
      /* 閱讀工作簿 */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* 抓住頁籤 */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* 保存數據 */
      let data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
      // let ExcelData = this.formate.Excel(data);

      // console.log(data);
      return data;
      // let content = new Blob([JSON.stringify(ExcelData)], { type: "text/plain;charset=utf-8" });
      // saveAs(content, `${this.objOne}.json`);
      // event.target.value = "" // 清空
      // this.objOne = null;
    };
  }
  getJSON(event) {
    let file = event.target.files[0], fileReader = new FileReader();
    fileReader.readAsText(file, "UTF-8");
    fileReader.onerror = err => console.log(err);
    return fileReader.onload = () => {
      // console.log(JSON.parse(fileReader.result as any));
      return JSON.parse(fileReader.result as any);
      // let data = this.formate.Json(JSON.parse(fileReader.result as any));

      // /* 生成工作表 */
      // const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);

      // /* 生成工作簿並添加工作表 */
      // const wb: XLSX.WorkBook = XLSX.utils.book_new();
      // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      /* 保存到文件 */
      // XLSX.writeFile(wb, `${this.objTwo}.xlsx`);

      // event.target.value = "" // 清空
      // this.objTwo = null;
    }
  }
}
