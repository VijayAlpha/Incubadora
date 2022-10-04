import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  Output,
  EventEmitter,
  TemplateRef,
  Input,
  ElementRef,
} from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { Subscription } from "rxjs";
import { Page } from "./Page";
import { MatSort, Sort } from "@angular/material/sort";
import { MatDialogRef } from "@angular/material/dialog";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { ActionPopupComponent } from "../action-popup/action-popup.component";
import { ResponseModalService } from "../response-modal/response-modal.service";

@Component({
  selector: "table-generic",
  templateUrl: "./table-generic.component.html",
  styleUrls: ["./table-generic.component.scss"],
})
export class TableGenericComponent implements OnInit {
  dataSource: MatTableDataSource<TableGenericComponent>;
  matDialogRef: MatDialogRef<any>;
  private eventsSubscription: Subscription;
  @ViewChild("table") table: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() displayedColumns: string[];
  @Input() definedColumns: string[];
  @Input() searchColumns: any[];
  @Input() data;
  @Input() isAction: boolean = true;
  @Input() isDetail: boolean = false;
  @Input() isDelete:boolean= true;
  @Input() canShowSearch: boolean = true;
  @Input() isAllActions: boolean = false;
  @Input() showReset: boolean = true;
  @Input() private datatrigger: EventEmitter<any>;
  @Output() editRow = new EventEmitter();
  @Output() detailRow = new EventEmitter();
  @Output() deleteRow = new EventEmitter();
  @Output() paginate = new EventEmitter();
  @Output() searchEvent = new EventEmitter();
  @Input() count: number;
  @Input() isPagination:boolean=true;

  rows = new MatTableDataSource([]);
  page = new Page();
  postPerPage: number = 10;
  pageNumber: number = 1;
  deleteObject: any;
  filters: any[] = [];
  panelOpenState: boolean = false;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private responseModalService: ResponseModalService
  ) {}

  ngOnInit(): void {
    this.rows.data = this.data;
    if (this.datatrigger) {
      this.datatrigger.subscribe((data) => {
        this.reload(data);
      });
    }
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce("Sorting cleared");
    }
  }

  reload = (data) => {
    this.rows.data = data;
    this.rows.sort = this.sort;
  };

  onPaginate = (pageEvent: PageEvent) => {
    this.postPerPage = +pageEvent.pageSize;
    this.pageNumber = +pageEvent.pageIndex + 1;
    const pageObject = {
      postPerPage: this.postPerPage,
      pageNumber: this.pageNumber,
    };
    this.paginate.emit(pageObject);
  };

  edit = (row: any) => {
    this.editRow.emit(row);
  };

  delete = (template: TemplateRef<any>, row: any) => {
    const data = {
      title: "Delete",
      description: "Are You Sure?",
    };
    this.matDialogRef = this.responseModalService.openModalSM(
      ActionPopupComponent,
      data
    );
    this.matDialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.deleteRow.emit(row);
      }
    });
  };

  search = ($event: any) => {
    const filter = {
      key: $event?.target?.id,
      operation: ":",
      orPredicate: false,
      value: $event?.target?.value,
    };
    const inputElement = document.getElementById($event?.target?.id);
    const objIndex = this.filters.findIndex(
      (obj) => obj.key === $event?.target?.id
    );
    if (objIndex !== -1) {
      this.filters[objIndex] = filter;
    } else {
      this.filters.push(filter);
    }
    this.searchEvent.emit(this.filters);
  };
  clearFilter() {
    this.filters = [];
    this.searchEvent.emit(this.filters);
  }
  detail = (row: any) => {
    this.detailRow.emit(row);
  };
}
