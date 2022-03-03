import { Component, OnInit } from '@angular/core';

import { Input } from '@angular/core';

import { SetVariableService } from '../../../share/service/global/set-variable.service';
import { PutDataService } from '../../../share/service/api/put-data.service';
import { DeleteDataService } from '../../../share/service/api/delete-data.service';

@Component({
  selector: 'app-search-display-data',
  templateUrl: './search-display-data.component.html',
  styleUrls: ['./search-display-data.component.scss']
})
export class SearchDisplayDataComponent implements OnInit {
  // Initialize parameters
  title = 'Media Extract Data';

  constructor(private setVariableService: SetVariableService, private putDataService: PutDataService, private deleteDataService: DeleteDataService) { }

  // Input variable data to utilize throughout the component
  @Input() outputData: any;

  // Set the URL link for the view button
  urlPrefix: string = this.setVariableService.urlPrefixValue;

  // Set the loader to true to display on page
  isLoading = false;

  ngOnInit(): void {
  }

  // Remove field from array
  removeField(index: number) {
    // Remove the data corresponding to the row in question
    this.outputData.Result.splice(index, 1);
  }

  // Perform a task when button is clicked with values from the fields on the webpage
  handleAlterationPut(titlelong:string, titleshort:string, publishdate:string, actionstatus:string, row:number, mediaItems:any, methodValue:string) {
    // Create parameters with key pair values
    this.setVariableService.payload = [{
      titlelong: titlelong,
      titleshort: titleshort,
      publishdate: publishdate,
      actionstatus: actionstatus
    }];

    // Set the loader to true to display on page
    this.isLoading = true;
    mediaItems.isPressedButton = true;

    // Check which button the end user is clicking and set spinner
    if (methodValue === "Retain") {
      mediaItems.buttonRetainIsLoading = true;
    }

    // Check which button the end user is clicking and set spinner
    if (methodValue === "Ignore") {
      mediaItems.buttonIgnoreIsLoading = true;
    }

    // Set the ok to true to not display on page
    mediaItems.okValue = false;

    // Set the display value to false to not display the data
    mediaItems.displayValue = false;

    // Get information from API
    this.putDataService.putData(this.setVariableService.payload, this.setVariableService.headers, this.setVariableService.apiURL)
    .subscribe({
      next: (response) => {
        // Next is for successful response message only
        // Set the loader to false to not display on page
        this.isLoading = false;

        // Set the display value to true to display the data
        mediaItems.displayValue = true;

        // Check which button the end user is clicking and set spinner
        if (methodValue === "Retain") {
          mediaItems.buttonRetainIsLoading = false;
        }

        // Check which button the end user is clicking and set spinner
        if (methodValue === "Ignore") {
          mediaItems.buttonIgnoreIsLoading = false;
        }

        // Set the loader to false to not display on page
        mediaItems.isPressedButton = false;

        // Convert object to JSON string
        let responseJSONMessage = JSON.stringify(response);

        // Parse JSON String to object
        let responseMessage = JSON.parse(responseJSONMessage);

        // Retrieve the response message to keep or remove a specific row
        mediaItems.statusResponse = responseMessage.Result[0].Status;
        mediaItems.messageResponse = responseMessage.Result[0].Message;

        // Check if the return status message is success
        if (mediaItems.statusResponse === 'Success') {
          // Remove row from view
          this.removeField(row);
        }
      },
      // complete: () => {
      //   // Complete is for successful calls only
      // },
      error: err => {
        // Error is for subscription error calls only
        // Set the loader to false to not display on page
        this.isLoading = false;
        mediaItems.isPressedButton = false;

        // Check which button the end user is clicking and set spinner
        if (methodValue === "Retain") {
          mediaItems.buttonRetainIsLoading = false;
        }

        // Check which button the end user is clicking and set spinner
        if (methodValue === "Ignore") {
          mediaItems.buttonIgnoreIsLoading = false;
        }

        // Set error status, message, and okay message
        mediaItems.statusValue = err.status;
        mediaItems.messageValue = err.statusText;
        mediaItems.okValue = !err.ok;
      }
    });
  }

  // Perform a task when button is clicked with values from the fields on the webpage
  handleAlterationDelete(titlelong:string, row:number, mediaItems:any, methodValue:string) {
    // Create parameters with key pair values
    this.setVariableService.payload = [{
      titlelong: titlelong
    }];

    // Set the loader to true to display on page
    this.isLoading = true;
    mediaItems.isPressedButton = true;

    // Check which button the end user is clicking and set spinner
    if (methodValue === "Delete") {
      mediaItems.buttonDeleteIsLoading = true;
    }

    // Set the ok to true to not display on page
    mediaItems.okValue = false;

    // Set the display value to false to not display the data
    mediaItems.displayValue = false;

    // Get information from API
    this.deleteDataService.deleteData(this.setVariableService.payload, this.setVariableService.headers, this.setVariableService.apiURL)
    .subscribe({
      next: (response) => {
        // Next is for successful response message only
        // Set the loader to false to not display on page
        this.isLoading = false;

        // Set the display value to true to display the data
        mediaItems.displayValue = true;

        // Check which button the end user is clicking and set spinner
        if (methodValue === "Delete") {
          mediaItems.buttonDeleteIsLoading = false;
        }

        // Convert object to JSON string
        let responseJSONMessage = JSON.stringify(response);

        // Parse JSON String to object
        let responseMessage = JSON.parse(responseJSONMessage);

        // Retrieve the response message to keep or remove a specific row
        mediaItems.statusResponse = responseMessage.Result[0].Status;
        mediaItems.messageResponse = responseMessage.Result[0].Message;

        // Check if the return status message is success
        if (mediaItems.statusResponse === 'Success') {
          // Remove row from view
          this.removeField(row);
        }
      },
      // complete: () => {
      //   // Complete is for successful calls only
      // },
      error: err => {
        // Error is for subscription error calls only
        // Set the loader to false to not display on page
        this.isLoading = false;
        mediaItems.isPressedButton = false;

        // Check which button the end user is clicking and set spinner
        if (methodValue === "Delete") {
          mediaItems.buttonDeleteIsLoading = false;
        }

        // Set error status, message, and okay message
        mediaItems.statusValue = err.status;
        mediaItems.messageValue = err.statusText;
        mediaItems.okValue = !err.ok;
      }
    });
  }
}
