import { Component, OnInit } from '@angular/core';

import { Title } from '@angular/platform-browser';

import { UntypedFormControl, Validators } from '@angular/forms';

import { Output, EventEmitter } from '@angular/core';

import { SetVariableService } from '../../../share/service/global/set-variable.service';
import { GetDataService } from '../../../share/service/api/get-data.service';

@Component({
  selector: 'app-edit-search-data',
  templateUrl: './edit-search-data.component.html',
  styleUrls: ['./edit-search-data.component.scss']
})
export class EditSearchDataComponent implements OnInit {
  // Set the out for emitting the data to another component
  @Output () outputData : EventEmitter<any> = new EventEmitter<any>();

  // Initialize parameters
  title = 'Media Edit';

  constructor(private titleService:Title, private setVariableService: SetVariableService, private getDataService: GetDataService) { }

  // Set form control with possible validators
  titlelongForm = new UntypedFormControl('', [Validators.required, Validators.pattern(this.setVariableService.titlelongFormPattern)]);

  // Set the media data to empty array
  mediaData: any = [];

  // Set input field back to empty string when button is pressed
  inputTitleLong:string = '';
  inputTitleShort:string = '';

  // Set the loader to true to display on page
  isLoading = false;

  // Status code, message, and ok status
  statusValue = '';
  messageValue = '';
  okValue = true;
  displayValue = false;

  ngOnInit(): void {
    // Set title on page
    this.titleService.setTitle(this.title);
  }

  // Perform a task when button is clicked with values from the fields on the webpage
  searchButton(titlelong:string) {
    // Create parameters with key pair values
    this.setVariableService.params = {
      titlelong: titlelong,
      titleshort: '',
      actionstatus: '',
      limit: '1',
      sort: 'desc'
    }

    // Set the loader to true to display on page
    this.isLoading = true;

    // Set the ok to true to not display on page
    this.okValue = true;

    // Set the display value to false to not display the data
    this.displayValue = false;

    // Check if all parameters have been provided
    if (titlelong) {
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
    else {
      // Set timer to quarter of a second, so the loading gif can display
      setTimeout(() => {
        // Set the loader to false to not display on page
        this.isLoading = false;

        // Set the display value to true to display the data
        this.displayValue = true;

        // Return response from API
        this.mediaData = JSON.parse('{"Status": "Error", "Message": "Process halted, title long was not provided", "Count": 0, "Result": []}');

        // Output emit the return data
        this.outputData.emit(this.mediaData);
      }, 250);
    }
  }

  // Get any errors for input fields
  getInputErrorMessage(inputForm:any) {
    return inputForm.hasError('required') ? 'You must enter a value' :
    inputForm.hasError('pattern') ? 'Invalid input string' : '';
  }

  // Clear input field
  clearInputField(){
    // Set form control with possible validators
    this.titlelongForm = new UntypedFormControl('', [Validators.required, Validators.pattern(this.setVariableService.titlelongFormPattern)]);
  }
}