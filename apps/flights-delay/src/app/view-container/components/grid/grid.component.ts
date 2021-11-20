import { Component, Input } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';

@Component({
  selector: 'flight-delays-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {

  @Input() rowData: unknown[] = [];

  // TODO Parse fl_date to date
  columnDefs: ColDef[] = [
    { field: 'dep_delay', headerName: 'Dep. Delay', enableRowGroup: true, type: 'number', filter: 'number', aggFunc: 'avg', resizable: true, sortable: true},
    { field: 'arr_delay', headerName: 'Arr. Delay', enableRowGroup: true, type: 'number', filter: 'number', aggFunc: 'avg', resizable: true, sortable: true},
    { field: 'mkt_carrier_name', headerName: 'Carrier', enableRowGroup: true, type: 'text', filter: 'agSetColumnFilter', resizable: true, sortable: true},
    { field: 'fl_date', headerName: 'Date', enableRowGroup: true, type: 'date', filter: 'date', resizable: true, sortable: true},
    { field: 'time_of_day', headerName: 'Time', enableRowGroup: true, type: 'text', filter: 'agSetColumnFilter', resizable: true, sortable: true},
  ];  

  gridOptions: GridOptions = {
    rowGroupPanelShow: 'always',
    sideBar: 'columns',
  };

}
