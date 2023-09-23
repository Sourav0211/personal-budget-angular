import { AfterViewInit , Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';


/*interface ChartData {
  datasets: {
    data: number[];
    backgroundColor: string[];
  }[];
  labels: string[];
}*/


@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements AfterViewInit{

  public dataSource:any ={

    datasets: [
        {
            data: [],
            backgroundColor:[
                '#ffcd56',
                '#ff6384',
                '#36a2ab',
                '#fd6b19',
                '#291801',
                '#F633FF',
                '#08DC38'
            ],
        }
    ],
    labels: []
};

  constructor(private http: HttpClient) {

  }

  ngAfterViewInit(): void {

    this.http.get('http://localhost:3000/budget')
    .subscribe((res: any) => {

      for (var i = 0; i < res.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels[i] = res.myBudget[i].title;
        this.createChart();
    }
    });
  }

  createChart() {
    //var ctx = document.getElementById("myChart").getContext('2d');
    var ctx = document.getElementById("myChart") as HTMLCanvasElement;


    var myPieChart = new Chart(ctx, {
                type: 'pie',
                data: this.dataSource
                    });
  }
}
