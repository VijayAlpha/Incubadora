import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { NbCardComponent, NbCardModule, NbTabsetModule,NbListModule} from "@nebular/theme";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxMatSelectSearchModule,
    NbCardModule,
    NbTabsetModule,
    NbListModule
  ],
  exports: [NgxMatSelectSearchModule, NbCardModule, NbTabsetModule,NbCardComponent,NbListModule],
})
export class CommonLibraryModule {}
