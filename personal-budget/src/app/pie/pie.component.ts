
import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit {
  private data: any[] = [];
  private svg: any;
  private margin = 50;
  private width = 550;
  private height = 300;
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors: any;

  constructor(private dataService: DataService) {}

  private createSvg(): void {
    this.svg = d3
      .select('figure#pie')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');
  }

  private createColors(): void {
    this.colors = d3.scaleOrdinal()
      .domain(this.data.map(d => d.Label))
      .range(['#ffbf00', '#7fffd4', '#ff033e', '#f0f8ff', '#fbceb1']);
  }

  private drawChart(): void {
    const pie = d3.pie<any>().value((d: any) => d.Value);

    this.svg
      .selectAll('pieces')
      .data(pie(this.data))
      .enter()
      .append('path')
      .attr('d', d3.arc().innerRadius(0).outerRadius(this.radius))
      .attr('fill', (d: any, i: any) => this.colors(i))
      .attr('stroke', '#white')
      .style('stroke-width', '9px');

    const labelLocation = d3.arc()
      .innerRadius(100)
      .outerRadius(this.radius);

    this.svg
      .selectAll('pieces')
      .data(pie(this.data))
      .enter()
      .append('text')
      .text((d: any) => d.data.Label)
      .attr('transform', (d: any) => 'translate(' + labelLocation.centroid(d) + ')')
      .style('text-anchor', 'middle')
      .style('font-size', 15);
  }

  ngOnInit(): void {
    this.createSvg();
    this.createColors();

    if (this.dataService.isEmpty()) {
      this.dataService.fetchData().subscribe((data) => {
        this.data = data;
        this.drawChart();
      });
    } else {
      this.data = this.dataService.getData();
      this.drawChart();
    }
  }
}
