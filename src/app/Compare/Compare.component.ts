import { Component, OnInit } from '@angular/core';
import { FormateService, Observer } from '@service';
import * as XLSX from 'xlsx';
declare const saveAs: any;

@Component({
  selector: 'app-Compare',
  templateUrl: './Compare.component.html',
  styleUrls: ['./Compare.component.scss']
})
export class CompareComponent implements OnInit {
  /** 輸入的第一筆資料名稱 */
  objName: string = null;
  /** 輸入的第一筆資料 */
  fileOne: any = null;
  /** 輸入的第二筆資料 */
  fileTwo: any = null;
  /** 輸入的第一筆資料檔案 */
  fileName1: string = "XLSX";
  /** 輸入的第二筆資料檔案 */
  fileName2: string = "XLSX";
  /** 整理後的第一筆資料 */
  dataOne: any = null;
  /** 整理後的第二筆資料 */
  dataTwo: any = null;
  constructor(private formate: FormateService, private observer: Observer) { }
  ngOnInit() {
    this.observer.obserObj.CompareOne.subscribe(
      data => {
        this.dataOne = data;
        if (this.dataTwo == null && data !== null) {
          this[`get${this.fileName2}`](this.fileTwo, "CompareTwo");
        }
      },
      err => console.log(err)
    );
    this.observer.obserObj.CompareTwo.subscribe(
      data => {
        this.dataTwo = data;
        console.log(this.dataTwo, Array.isArray(this.dataTwo), this.dataOne, Array.isArray(this.dataOne));
        if (this.dataTwo !== null) {
          let array1 = !Array.isArray(this.dataOne) ? Object.values(this.dataOne) : this.dataOne,
            array2 = !Array.isArray(this.dataTwo) ? Object.values(this.dataTwo) : this.dataTwo;
          array1 = array1.filter(val => array2.indexOf(val) == -1);
          console.log(array1);
          // console.log(array1.join("\n"));
          let data = this.formate.Json(JSON.parse(array1 as any));

          /* 生成工作表 */
          const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);

          /* 生成工作簿並添加工作表 */
          const wb: XLSX.WorkBook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

          /* 保存到文件 */
          XLSX.writeFile(wb, `${this.objName}.xlsx`);

          ["objName", "fileOne", "fileTwo"].forEach(item => this[item] = null);
          ["fileName1", "fileName2"].forEach(item => this[item] = "XLSX");
          ["CompareTwo", "CompareOne"].forEach(item => this.observer.changeObj(null, item));
        }
      },
      err => console.log(err)
    );
  }
  Compare(value: any, obj: string) {

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

    this[`get${this.fileName1}`](this.fileOne, "CompareOne");
  }
  getXLSX(event: any, finalData: string) {
    /* 連接文件閱讀器 */
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {
      /* 閱讀工作簿 */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* 抓住頁籤 */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* 保存數據 */
      let data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
      // let ExcelData = this.formate.Excel(data);
      this.observer.changeObj(finalData, data);
      // let content = new Blob([JSON.stringify(ExcelData)], { type: "text/plain;charset=utf-8" });
      // saveAs(content, `${this.objOne}.json`);
      // event.target.value = "" // 清空
      // this.objOne = null;
    };
  }
  getJSON(event: any, finalData: string) {
    let file = event.target.files[0], fileReader = new FileReader();
    fileReader.readAsText(file, "UTF-8");
    fileReader.onerror = err => console.log(err);
    fileReader.onload = () => {
      // console.log(JSON.parse(fileReader.result as any));
      this.observer.changeObj(finalData, JSON.parse(fileReader.result as any));
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
