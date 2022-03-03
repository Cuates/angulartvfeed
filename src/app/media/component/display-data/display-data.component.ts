import { Component, OnInit } from '@angular/core';

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
  title = 'project_name';

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

  constructor(private titleService:Title, private setVariableService: SetVariableService, private getDataService: GetDataService) { }

  ngOnInit(): void {
    // Set title on page
    this.titleService.setTitle(this.title);

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
