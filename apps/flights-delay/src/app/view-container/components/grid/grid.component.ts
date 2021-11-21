import { Component, Input } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { FlightCovid } from '../../models/flightCovid.model';

@Component({
  selector: 'flight-delays-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {

  @Input() rowData: FlightCovid[] = [];

  // TODO Parse fl_date to date
  columnDefs: ColDef[] = [
    { field: 'mkt_carrier_name', headerName: 'Carrier', enableRowGroup: true, type: 'text', filter: 'agSetColumnFilter', resizable: true, sortable: true},
    { field: 'dep_delay', headerName: 'Dep. Delay', enableRowGroup: true, type: 'number', filter: 'number', aggFunc: 'avg', resizable: true, sortable: true},
    { field: 'arr_delay', headerName: 'Arr. Delay', enableRowGroup: true, type: 'number', filter: 'number', aggFunc: 'avg', resizable: true, sortable: true},
    { field: 'fl_date', headerName: 'Date', enableRowGroup: true, type: 'date', filter: 'date', resizable: true, sortable: true},
    { field: 'originCovidCases', headerName: 'Origin Cases', enableRowGroup: true, type: 'number', filter: 'number', aggFunc: 'avg', resizable: true, sortable: true},
    { field: 'originCovidDeaths', headerName: 'Origin Deaths', enableRowGroup: true, type: 'number', filter: 'number', aggFunc: 'avg', resizable: true, sortable: true},
    { field: 'originCasesPerc', headerName: 'Origin %', enableRowGroup: true, type: 'number', filter: 'number', aggFunc: 'avg', resizable: true, sortable: true},
    { field: 'destCovidCases', headerName: 'Dest. Cases', enableRowGroup: true, type: 'number', filter: 'number', aggFunc: 'avg', resizable: true, sortable: true},
    { field: 'destCovidDeaths', headerName: 'Dest. Deaths', enableRowGroup: true, type: 'number', filter: 'number', aggFunc: 'avg', resizable: true, sortable: true},
    { field: 'destCovidPerc', headerName: 'Dest. %', enableRowGroup: true, type: 'number', filter: 'number', aggFunc: 'avg', resizable: true, sortable: true},
    { field: 'time_of_day', headerName: 'Time', enableRowGroup: true, type: 'text', filter: 'agSetColumnFilter', resizable: true, sortable: true},
  ];  

  gridOptions: GridOptions = {
    rowGroupPanelShow: 'always',
    sideBar: 'columns',
  };

}
