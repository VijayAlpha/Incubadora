import { Injectable } from "@angular/core";
import { AppConfiguration } from "../AppConfiguration";
import { CommonHttpClientService } from "../commonHttpService";

@Injectable({
  providedIn: "root",
})
export class ReportService {
  constructor(
    private commonHttpClientService: CommonHttpClientService,
    private appConfiguration: AppConfiguration
  ) {}

  getReport = (
    postPerPage: any,
    pageNumber: number,
    filter: any[],
    report: string
  ) => {
    let data = {
      draw: this.randomNumber(),
      filter: filter,
      pageNo: pageNumber,
      pageSize: postPerPage,
      report: report,
    };
    return this.commonHttpClientService.httpPost(
      this.appConfiguration.getGenericReport,
      data
    );
  };

  getReportAsync = (
    postPerPage: any,
    pageNumber: number,
    filter: any[],
    report: string
  ) => {
    let data = {
      draw: this.randomNumber(),
      filter: filter,
      pageNo: pageNumber,
      pageSize: postPerPage,
      report: report,
    };
    let http = this.commonHttpClientService
      .httpPost(this.appConfiguration.getGenericReport, data)
      .toPromise();
    return http;
  };

  getAggreate = (report: String) => {
    return this.commonHttpClientService.httpGet(
      this.appConfiguration.getAggregateReport + report
    );
  };

  getFilters = (report: String) => {
    return this.commonHttpClientService.httpGet(
      this.appConfiguration.getReportFilters + report
    );
  };

  randomNumber = () => {
    return Math.floor(Math.random() * 100 + 1);
  };
}
