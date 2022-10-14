import { Component } from '@angular/core';
import { FormateService } from '@service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-ConvertJson',
  templateUrl: './ConvertJson.component.html',
  styleUrls: ['./ConvertJson.component.scss']
})
export class ConvertJsonComponent {
  JsForEx: string = null;
  constructor(private formate: FormateService) { }
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
