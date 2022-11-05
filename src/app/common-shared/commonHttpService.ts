import { Injectable, NgZone, Injector } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { AppConfiguration } from "./AppConfiguration";
import { throwError, of, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { ResponseModalService } from "./response-modal/response-modal.service";
import { error } from "@angular/compiler/src/util";
import { CommonToastrService } from "./common-toastr/common-toastr.service";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  }),
};
const headers = new HttpHeaders().set(
  "Content-Type",
  "text/plain; charset=utf-8"
);
const uploadHttpOptions = {
  headers: headers,
};
@Injectable({
  providedIn: "root",
})
export class CommonHttpClientService {
  baseUrl: string = "";
  constructor(
    private httpClient: HttpClient,
    private appConfiguration: AppConfiguration,
    private injector: Injector,
    private zone: NgZone,
    private commonToastrService: CommonToastrService
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
  httpDelete = (url: string, data: any) => {
    return this.httpClient
      .delete(this.baseUrl + url + "?id=" + data, httpOptions)
      .pipe(
        catchError((error) => {
          this.errorHandler(error);
          return throwError(error);
        })
      );
  };

  errorHandler = (error: any) => {
    if(error.error.message){
      this.commonToastrService.showFailure("Error");
    }
    else
    {
      this.commonToastrService.showFailure("Error","Something went wrong");
    }
  }

}
