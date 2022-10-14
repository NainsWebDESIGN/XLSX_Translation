import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Component
import { ConvertExcelComponent } from './ConvertExcel/ConvertExcel.component';
import { ConvertJsonComponent } from './ConvertJson/ConvertJson.component';
import { CompareComponent } from './Compare/Compare.component';

const routes: Routes = [
  { path: '', component: ConvertExcelComponent, pathMatch: 'full' },
  { path: 'Excel', component: ConvertExcelComponent },
  { path: 'Json', component: ConvertJsonComponent },
  { path: 'Compare', component: CompareComponent },
  // 使用萬用路由時，一定要放在最後一個路由定義中！
  { path: '**', component: ConvertExcelComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
