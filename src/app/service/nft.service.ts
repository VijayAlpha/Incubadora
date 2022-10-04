import { Injectable } from '@angular/core';
import { AppConfiguration } from '../common-shared/AppConfiguration';
import { CommonHttpClientService } from '../common-shared/commonHttpService';

@Injectable({
  providedIn: 'root'
})
export class NftService {

  constructor(private commonHttpClientService: CommonHttpClientService,
    private appConfiguration: AppConfiguration) { }


  getNft(postPerPage: number, pageNumber: number, filters: any[]) {
    let data = {
      "draw": this.randomNumber(),
      "filter": filters,
      "pageNo": pageNumber,
      "pageSize": postPerPage
    }
    return this.commonHttpClientService.httpPost(this.appConfiguration.getNft, data);
  }

  getCategories = () => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getCategories);
  };


   updateCategory(activityId: any, categoryId: any) {
    return this.commonHttpClientService.httpGet(this.appConfiguration.updateActivity + activityId + "&category=" + categoryId);
  }

  randomNumber = () => {
    return Math.floor((Math.random() * 100) + 1);
  }

}
