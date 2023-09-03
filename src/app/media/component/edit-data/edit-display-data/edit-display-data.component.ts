import { Component, OnInit } from '@angular/core';

import { Input, Output, EventEmitter } from '@angular/core';

import { UntypedFormControl, Validators } from '@angular/forms';

import { SetVariableService } from '../../../share/service/global/set-variable.service';
import { PutDataService } from '../../../share/service/api/put-data.service';

@Component({
  selector: 'app-edit-display-data',
  templateUrl: './edit-display-data.component.html',
  styleUrls: ['./edit-display-data.component.scss']
})
export class EditDisplayDataComponent implements OnInit {
  // Input variable data to utilize throughout the component
  @Input() outputData: any;

  // Output parent function to be utilized throughout the child component
  @Output("clearInputField") clearInputField: EventEmitter<any> = new EventEmitter();

  // Initialize parameters
  title = 'Media Edit Data';

  constructor(private setVariableService: SetVariableService, private putDataService: PutDataService) { }

  // Set form control with possible validators
  titleshortForm = new UntypedFormControl({'value': '', disabled: false}, [Validators.required, Validators.pattern(this.setVariableService.titleshortFormPattern)]);

  // Set input field back to empty string when button is pressed
  inputTitleShort:string = '';

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

    // Disable the input field
    this.titleshortForm.disable();

    // Check which button the end user is clicking and set spinner
    if (methodValue === "Edit") {
      mediaItems.buttonUpdateIsLoading = true;
    }

    // Set the ok to true to not display on page
    mediaItems.okValue = false;

    // Set the display value to false to not display the data
    mediaItems.displayValue = false;

    // Get information from API
    this.putDataService.putData(this.setVariableService.payload, this.setVariableService.headers, this.setVariableService.apiURL)
    .subscribe({
      next: (response) => {
        // Disable the input field
        this.titleshortForm.enable();

        // Next is for successful response message only
        // Set the loader to false to not display on page
        this.isLoading = false;

        // Set the display value to true to display the data
        mediaItems.displayValue = true;

        // Check which button the end user is clicking and set spinner
        if (methodValue === "Edit") {
          mediaItems.buttonUpdateIsLoading = false;
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
          this.titleshortForm = new UntypedFormControl({'value': '', disabled: false}, [Validators.required, Validators.pattern(this.setVariableService.titleshortFormPattern)]);

          // Call to parent function
          this.clearInputField.emit();
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
        if (methodValue === "Edit") {
          mediaItems.buttonUpdateIsLoading = false;
        }

        // Set error status, message, and okay message
        mediaItems.statusValue = err.status;
        mediaItems.messageValue = err.statusText;
        mediaItems.okValue = !err.ok;
      }
    });
  }

  // Get any errors for input fields
  getInputErrorMessage(inputForm:any) {
    return inputForm.hasError('required') ? 'You must enter a value' :
    inputForm.hasError('pattern') ? 'Invalid input string' : '';
  }
}