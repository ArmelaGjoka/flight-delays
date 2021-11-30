import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';

import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ViewContainerComponent } from './view-container/view-container.component';
import { ChartComponent } from './view-container/components/chart/chart.component';
import { FormComponent } from './view-container/components/form/form.component';
import { GridComponent } from './view-container/components/grid/grid.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [AppComponent, ViewContainerComponent, ChartComponent, FormComponent, GridComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatTooltipModule,
    MatIconModule,
    CommonModule,
    MatSelectModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    AgGridModule.withComponents([]),
    MatTabsModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
