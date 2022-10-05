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
  @Output() editRow = new EventEmitter();
  prices:any[] = [10, 20, 50, 100, 200];

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
    console.log(this.categoryIds);
  }

}
