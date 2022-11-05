import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AppConfiguration {
  baseUrl = environment.baseURL;

  getNft = "/art/nft/activity";

  getCategories = "/art/category/categories";

  updateActivity = "art/nft/activity/updateActivity?id=";

}
