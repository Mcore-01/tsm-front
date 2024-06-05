import { Component } from '@angular/core';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {ChartService} from "../../services/chart.service";
import {HttpClientModule} from "@angular/common/http";
import {Router} from "@angular/router";
import {IconComponent} from "../icon/icon.component";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-vertical-bar-chart',
  standalone: true,
  imports: [
    NgxChartsModule, HttpClientModule, IconComponent, MatIconButton, MatIcon, MatButton
  ],
  templateUrl: './vertical-bar-chart.component.html',
  styleUrl: './vertical-bar-chart.component.scss',
  providers: [ChartService]
})
export class VerticalBarChartComponent {
  constructor(private chartService: ChartService, private route: Router) {
  }
  data: any[];
  view: [number, number] = [1000, 820];
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = false;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Операции';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Количество операций';
  legendTitle: string = 'Операции';
  ngOnInit() {
    this.getData();
  }
  getData(){
    this.chartService.getStatistics().subscribe(
        (res) => {
          this.data = res;
          console.log(this.data);
        }
    );
  }

  downloadExcel(): void {
    this.chartService.exportExcel().subscribe(blob => {
        const url = window.URL.createObjectURL(blob);
        window.open(url);
    });
  }
}
