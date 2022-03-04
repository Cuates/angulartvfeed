import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AboutComponent } from './media/component/about/about.component';
import { DisplayDataComponent } from './media/component/display-data/display-data.component';
import { AddDataComponent } from './media/component/add-data/add-data.component';
import { EditSearchDataComponent } from './media/component/edit-data/edit-search-data/edit-search-data.component';
import { EditDisplayDataComponent } from './media/component/edit-data/edit-display-data/edit-display-data.component';
import { SearchSearchDataComponent } from './media/component/search-data/search-search-data/search-search-data.component';
import { SearchDisplayDataComponent } from './media/component/search-data/search-display-data/search-display-data.component';
import { FooterComponent } from './media/share/component/footer/footer.component';
import { HeaderComponent } from './media/share/component/header/header.component';
import { LoaderComponent } from './media/share/component/loader/loader.component';
import { NavigationMenuComponent } from './media/share/component/navigation-menu/navigation-menu.component';
import { PageNotFoundComponent } from './media/share/component/page-not-found/page-not-found.component';

import { GetDataService } from './media/share/service/api/get-data.service';
import { PostDataService } from './media/share/service/api/post-data.service';
import { PutDataService } from './media/share/service/api/put-data.service';
import { DeleteDataService } from './media/share/service/api/delete-data.service';

import { SetVariableService } from './media/share/service/global/set-variable.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faBars as faBars } from '@fortawesome/free-solid-svg-icons';
import { faTimes as faTimes } from '@fortawesome/free-solid-svg-icons';
import { faHome as faHome } from '@fortawesome/free-solid-svg-icons';
import { faPlus as faPlus } from '@fortawesome/free-solid-svg-icons';
import { faSearch as faSearch } from '@fortawesome/free-solid-svg-icons';
import { faInfo as faInfo } from '@fortawesome/free-solid-svg-icons';
import { faEdit as faEdit } from '@fortawesome/free-solid-svg-icons';
import { faSpinner as faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt as faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown as faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { faExternalLinkAlt as faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faFilm as faFilm } from '@fortawesome/free-solid-svg-icons';
import { faExclamationTriangle as faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

import { NgxMatMomentAdapter } from '@angular-material-components/moment-adapter';
import {NgxMatDateFormats, NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule, NGX_MAT_DATE_FORMATS, NgxMatDateAdapter } from '@angular-material-components/datetime-picker';

// Setting custom date time display for date time pickers input field
export const CUSTOM_DATE_FORMATS: NgxMatDateFormats = {
  parse: {
    dateInput: "YYYY-MM-DD HH:mm:ss"
  },
  display: {
    dateInput: "YYYY-MM-DD HH:mm:ss",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY"
  }
};

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    DisplayDataComponent,
    AddDataComponent,
    EditSearchDataComponent,
    EditDisplayDataComponent,
    SearchSearchDataComponent,
    SearchDisplayDataComponent,
    FooterComponent,
    HeaderComponent,
    LoaderComponent,
    NavigationMenuComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    ReactiveFormsModule
  ],
  providers: [
    GetDataService,
    PostDataService,
    PutDataService,
    DeleteDataService,
    SetVariableService,
    Title,
    {
      provide: NgxMatDateAdapter,
      useClass: NgxMatMomentAdapter,
    },
    {
      provide: NGX_MAT_DATE_FORMATS,
      useValue: CUSTOM_DATE_FORMATS
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
  // Add font awesome to the constructor
  constructor(library: FaIconLibrary) {
    // Adding the icons to be utilized throughout the web pages
    library.addIcons(faBars, faTimes, faHome, faInfo, faSearch, faPlus, faEdit, faSpinner, faTrashAlt, faThumbsUp, faThumbsDown, faExternalLinkAlt, faFilm, faExclamationTriangle);
  }
}
