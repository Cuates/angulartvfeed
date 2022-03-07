import { Component, OnInit } from '@angular/core';

import { Title } from '@angular/platform-browser';

import { Output, EventEmitter } from '@angular/core';

import { FormControl } from '@angular/forms';

import { SetVariableService } from '../../../share/service/global/set-variable.service';
import { GetDataService } from '../../../share/service/api/get-data.service';
import { GetActionService } from '../../../share/service/list/get-action.service';
import { GetLimitService } from '../../../share/service/list/get-limit.service';
import { GetSortService } from '../../../share/service/list/get-sort.service';

@Component({
  selector: 'app-search-search-data',
  templateUrl: './search-search-data.component.html',
  styleUrls: ['./search-search-data.component.scss']
})
export class SearchSearchDataComponent implements OnInit {
  // Set the output for emitting the data to another component
  @Output () outputData : EventEmitter<any> = new EventEmitter<any>();

  // Initialize parameters
  title = 'Media Search';

  // Set form control with possible validators
  titlelongForm = new FormControl('');
  titleshortForm = new FormControl('');
  actionstatusForm = new FormControl('0');
  limitForm = new FormControl('25');
  sortForm = new FormControl('desc');

  // Set input field back to empty string when button is pressed
  inputTitleLong:string = '';
  inputTitleShort:string = '';

  // Set the media data to empty array
  mediaData: any = [];

  // Set the loader to true to display on page
  isLoading = false;

  // Status code, message, and ok status
  statusValue = '';
  messageValue = '';
  okValue = true;
  displayValue = false;

  // Set list items
  actionListItem:any = [{}];
  limitListItem:any = [{}];
  sortListItem:any = [{}];

  constructor(private titleService:Title, private setVariableService: SetVariableService, private getDataService: GetDataService, private getActionService: GetActionService, private getLimitService: GetLimitService, private getSortService: GetSortService) { }

  ngOnInit(): void {
    // Set title on page
    this.titleService.setTitle(this.title);

    // Set lists
    // Get information from API
    this.getActionService.getActionList()
    .subscribe({
      next: (response) => {
        // Next is for successful response message only
        // Return response from API
        this.actionListItem = response;

        // // Convert object to JSON string
        // let responseJSONMessage = JSON.stringify(response);

        // console.log(responseJSONMessage);
      },
      // complete: () => {
      //   // Complete is for successful calls only
      // },
      // error: err => {
      // }
    });

    this.limitListItem = this.getLimitService.getLimitList();
    this.sortListItem = this.getSortService.getSortList();
  }

  // Perform a task when button is clicked with values from the fields on the webpage
  searchButton(titlelong:string, titleshort:string, actionstatus:string, limit:string, sort:string) {
    // Create parameters with key pair values
    this.setVariableService.params = {
      titlelong: titlelong,
      titleshort: titleshort,
      actionstatus: actionstatus,
      limit: limit,
      sort: sort
    }

    // Set the loader to true to display on page
    this.isLoading = true;

    // Set the ok to true to not display on page
    this.okValue = true;

    // Set the display value to false to not display the data
    this.displayValue = false;

    // Get information from API
    this.getDataService.getData(this.setVariableService.params, this.setVariableService.headers, this.setVariableService.apiURL)
    .subscribe({
      next: (response) => {
        // Next is for successful response message only
        // Set the loader to false to not display on page
        this.isLoading = false;

        // Set the display value to true to display the data
        this.displayValue = true;

        // Return response from API
        this.mediaData = response;

        // Output emit the return data
        this.outputData.emit(this.mediaData);
      },
      // complete: () => {
      //   // Complete is for successful calls only
      // },
      error: err => {
        // Error is for subscription error calls only
        // Set the loader to false to not display on page
        this.isLoading = false;

        // Set error status, message, and okay message
        this.statusValue = err.status;
        this.messageValue = err.statusText;
        this.okValue = err.ok;
      }
    });
  }
}
