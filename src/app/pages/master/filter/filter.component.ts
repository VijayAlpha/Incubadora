import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NftService } from '../../../service/nft.service';

@Component({
  selector: 'ngx-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  categories: any[] = [];
  constructor(private nftService: NftService) { }
  categoryIds: any[] = [];
  @Output() filter = new EventEmitter();
  filterObj :any ={
   "category":[],
   "price":""
  }

  prices:any[] = [10, 20, 50, 100, 200];
  selectedPrice :any ;

  ngOnInit() {
    this.getCategories();
  }

  getCategories = () => {
    this.nftService.getCategories().subscribe((categories: any) => {
      this.categories = categories;
    });
  };

  toggleCategory(checked: boolean, categoryId: string) {
    if (this.categoryIds.indexOf(categoryId) > -1) {
      this.categoryIds.splice(this.categoryIds.indexOf(categoryId), 1);
    } else {
      this.categoryIds.push(categoryId);
    }
    this.filterObj.category = this.categoryIds;
    this.filterObj.price = this.selectedPrice;
    this.filter.emit(this.filterObj);
  }

  onChange=(event:any)=>{
    this.filterObj.category = this.categoryIds;
    this.filterObj.price = event;
    this.filter.emit(this.filterObj);
  }

}
