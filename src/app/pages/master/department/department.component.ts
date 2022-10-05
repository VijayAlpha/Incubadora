import { Component, EventEmitter, OnInit } from '@angular/core';
import { eventNames } from 'process';
import { isEmpty } from 'rxjs/operators';

@Component({
  selector: 'ngx-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  public datatrigger: EventEmitter<any> = new EventEmitter();
  filter:any = [];
  priceFilter:any;
  categoryObj:any = {
    "key":"category.id",
    "operation": "::",
    "values":[]
  }

  priceObj :any={
    "key":"price",
    "operation": "<>",
    "value":""
  }
  constructor() { }

  ngOnInit() {

  }

  changeFilter=(event:any)=>{
    this.filter = [];
    if(event?.category?.length > 0){
      this.categoryObj.values = event?.category;
      this.filter.push(this.categoryObj);
    }
    if (event?.price){
      this.priceObj.value = event?.price;
      this.filter.push(this.priceObj);
    }
    this.datatrigger.emit(this.filter);
  }

}

