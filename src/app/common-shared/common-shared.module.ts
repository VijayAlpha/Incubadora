import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TitleCasePipe } from "./pipes/title-case.pipe";
import { ObjStringPipe } from "./pipes/obj-string.pipe";
import { TableGenericComponent } from "./table-generic/table-generic.component";
import { ActionPopupComponent } from "./action-popup/action-popup.component";
import { ResponseModalComponent } from "./response-modal/response-modal.component";
import { MultiSelectComponent } from "./multi-select/multi-select.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ResponseModalService } from "./response-modal/response-modal.service";
import { CommonLibraryModule } from "./common-library/common-library.module";
import { MaterialModule } from "./material.module";
import { NbToastrModule } from "@nebular/theme";
import { NgxMaskModule, IConfig } from 'ngx-mask'


export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;
const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    TableGenericComponent,
    ActionPopupComponent,
    ResponseModalComponent,
    MultiSelectComponent,
    TitleCasePipe,
    ObjStringPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    CommonLibraryModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    NbToastrModule.forRoot(),
    NgxMaskModule.forRoot(maskConfig),

  ],
  exports: [
    TableGenericComponent,
    ResponseModalComponent,
    TitleCasePipe,
    ObjStringPipe,
    FormsModule,
    ReactiveFormsModule,
    MultiSelectComponent,
    ActionPopupComponent,
    MaterialModule,
    NbToastrModule,
    NgxMaskModule,
  ],
  entryComponents: [ActionPopupComponent],
  providers: [ResponseModalService],
})
export class CommonSharedModule {}
