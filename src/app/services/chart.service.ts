import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {IBoard} from "../models/board";
import {map, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private chartService:HttpClient, private route: Router) { }


  getStatistics(){
    return this.chartService.get<any[]>("/TSM/Statistics/statistics").pipe(
        tap( response =>{
          console.log(response);
        })
    )
  }

  exportExcel(){
      return this.chartService.get('/TSM/Statistics/excel', { responseType: 'blob' })
      /*return this.chartService.get('/TSM/Statistics/excel').pipe(
          map(response => this.extractExcelFile(response))
      );*/
  }


    private extractExcelFile(response: any): Blob {
      console.log(response)
        if (response && response.fileContents) {
            console.log(response.fileContents)
            // Если есть excelFile в ответе, возвращаем его
            return new Blob([response.fileContents], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        } else {
            // Если excelFile отсутствует в ответе, возвращаем пустой Blob
            return new Blob();
        }
    }
}
