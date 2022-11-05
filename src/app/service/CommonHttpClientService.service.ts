import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AppConfiguration } from "../common-shared/AppConfiguration";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  }),
};

@Injectable({
  providedIn: "root",
})
export class CommonHttpClientServiceService {
  baseUrl: string = "";

  constructor(
    private httpClient: HttpClient,
    private appConfiguration: AppConfiguration
  ) {
    this.baseUrl = this.appConfiguration.baseUrl;
  }

  httpGet = (url: string) => {
    return this.httpClient.get(this.baseUrl + url, httpOptions).pipe(
      catchError((error) => {
        this.errorHandler(error);
        return throwError(error);
      })
    );
  };


  httpPost = (url: string, data: any) => {
    let header = new HttpHeaders();
    header.set("Access-Control-Allow-Origin", "*");
    return this.httpClient
      .post<any>(this.baseUrl + url, data, httpOptions)
      .pipe(
        catchError((error) => {
          this.errorHandler(error);
          return throwError(error);
        })
      );
  };


  errorHandler = (error: any) => { }

}
