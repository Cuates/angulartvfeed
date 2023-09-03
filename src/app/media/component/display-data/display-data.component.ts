import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { Title } from '@angular/platform-browser';

import { SetVariableService } from '../../share/service/global/set-variable.service';
import { GetDataService } from '../../share/service/api/get-data.service';

@Component({
  selector: 'app-display-data',
  templateUrl: './display-data.component.html',
  styleUrls: ['./display-data.component.scss']
})
export class DisplayDataComponent implements OnInit {
  // Initialize parameters
  title = 'TV Feed';

  // Set the media data to empty array
  mediaData: any = [];

  // Set the loader to true to display on page
  isLoading = true;

  // Status code, message, and ok status
  statusValue = '';
  messageValue = '';
  okValue = true;

  // Set parameter value
  limitValue:string = '25';
  sortValue:string = 'desc';

  // Query parameter and array
  queryLimit:string = '';
  querySort:string = '';
  queryData: any = {};

  constructor(private titleService:Title, private setVariableService: SetVariableService, private getDataService: GetDataService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // Set title on page
    this.titleService.setTitle(this.title);

    // Retrieve query string parameters if given
    this.activatedRoute.queryParams.subscribe(params => {
      // Check all keys in query string if given
      for (const key in params) {
        // Add the key and value into the new array list
        // The key will be lowercase and the value will be normal
        this.queryData[key.toLowerCase()] = params[key]
      }

      // Set the value if given from the new array list
      this.queryLimit = this.queryData.limit;

      // Set the value if given from the new array list with the value being lowercased
      this.querySort = this.queryData.sort.toLowerCase();
    })

    // Check if values were given in the query string and if the value is within range
    if(this.queryLimit && this.queryLimit !== '' && (Number(this.queryLimit) > 0 && Number(this.queryLimit) <= 100)) {
      // Set value to query string value
      this.limitValue = this.queryLimit;
    }

    // Check if values were given in the query string and check if they have a proper value
    if(this.querySort !== '' && (this.querySort === 'asc' || this.querySort === 'desc')) {
      // Set value to query string value
      this.sortValue = this.querySort;
    }

    // Set parameters for the API call
    this.setVariableService.params = {
      titlelong: '',
      titleshort: '',
      actionstatus: '',
      limit: this.limitValue,
      sort: this.sortValue
    }

    // Get information from API
    this.getDataService.getData(this.setVariableService.params, this.setVariableService.headers, this.setVariableService.apiURL)
    .subscribe({
      next: (response) => {
        // Next is for successful response message only
        // Set the loader to false to not display on page
        this.isLoading = false;

        // Return response from API
        this.mediaData = response;
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