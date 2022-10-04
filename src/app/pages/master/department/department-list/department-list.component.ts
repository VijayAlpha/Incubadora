import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { NftService } from '../../../../service/nft.service';
import { DepartmentService } from '../department.service';

@Component({
  selector: 'ngx-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent implements OnInit {
  postPerPage: number = 10;
  pageNumber: number = 1;
  data: any = [];
  filters: any[] = [];
  count: any = 0;
  categories: any[] = [];

  constructor(private nftService: NftService) { }

  ngOnInit(): void {
    this.loadData();
    this.getCategories();
  }


  loadData = () => {
    this.nftService.getNft(this.postPerPage, this.pageNumber, this.filters).subscribe((nfts: any) => {
      this.data = nfts.data;
      this.count = nfts?.recordsTotal;
    })

  };

  getCategories = () => {
    this.nftService.getCategories().subscribe((categories: any) => {
      this.categories = categories;
    });
  };


  updateCategory = (activityId, categoryId: string) => {
    this.nftService.updateCategory(activityId, categoryId.trim()).subscribe((nft: any) => {
      this.loadData();
    });
  };


  onPaginate = (pageEvent: PageEvent) => {
    this.postPerPage = +pageEvent.pageSize;
    this.pageNumber = +pageEvent.pageIndex + 1;
    console.log(this.pageNumber + " " + this.postPerPage);
    this.loadData();
  }


}
