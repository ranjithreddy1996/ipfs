import { Component, OnInit } from '@angular/core';
import { Web3Service } from 'src/app/web3.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  supplier: any;
  manufacture: any;
  distributer: any;
  retailer: any;
  Id: any;

  constructor(private web3:Web3Service) { }

  ngOnInit() {
    this.Id=JSON.parse(localStorage.getItem('admin'))

    this.web3._contract.getPastEvents('Supplier', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { console.log(event); })
    .then((event) => {
      this.supplier=event.length
    });
    this.web3._contract.getPastEvents('Manufacture', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { console.log(event); })
    .then((event) => {
        this.manufacture=event.length
      
  });
  this.web3._contract.getPastEvents('Distributer', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { console.log(event); })
    .then((event) => {
        this.distributer=event.length
      
  });
  this.web3._contract.getPastEvents('Retailer', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { console.log(event); })
    .then((event) => {
        this.retailer=event.length
      
  });
  }


  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      xAxes: [{
          barThickness: 40,  // number (pixels) or 'flex'
          maxBarThickness: 40 // number (pixels)
      }],
  }
}

    public mbarChartLabels:string[] = ['Supplier', 'Manufacture', 'Distributer', 'Retailer'];
    public barChartType:string = 'bar';
    public barChartLegend:boolean = true;

    public barChartColors:Array<any> = [
    {
      backgroundColor: 'rgba(105,159,177,0.2)',
      borderColor: 'rgba(105,159,177,1)',
      pointBackgroundColor: 'rgba(105,159,177,1)',
      pointBorderColor: 'blue',
      pointHoverBackgroundColor: '#fafafa',
      pointHoverBorderColor: 'rgba(105,159,177)'
    },
    // { 
    //   backgroundColor: 'rgba(77,20,96,0.3)',
    //   borderColor: 'rgba(77,20,96,1)',
    //   pointBackgroundColor: 'rgba(77,20,96,1)',
    //   pointBorderColor: '#fff',
    //   pointHoverBackgroundColor: '#fff',
    //   pointHoverBorderColor: 'rgba(77,20,96,1)'
    // }
  ];
    public barChartData:any[] = [
      {data: [90, 60, 34, 75], label: 'Registered Candidates'},
    ];
  
    // events
    public chartClicked(e:any):void {
      console.log(e);
    }
  
    public chartHovered(e:any):void {
      console.log(e);
    }
  
    

}
