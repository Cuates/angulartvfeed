import { Component, OnInit, ElementRef, ViewChild, Inject, LOCALE_ID } from '@angular/core';

import { Title } from '@angular/platform-browser';

import { FormControl, Validators } from '@angular/forms';

import { SetVariableService } from '../../share/service/global/set-variable.service';
import { PostDataService } from '../../share/service/api/post-data.service';
import { GetActionService } from '../../share/service/list/get-action.service';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss']
})
export class AddDataComponent implements OnInit {
  // Initialize parameters
  title = 'Media Add';

  constructor(private titleService:Title, private setVariableService: SetVariableService, private postDataService: PostDataService, @Inject(LOCALE_ID) public locale: string, private getActionService: GetActionService) { }

  // Get the element from HTML
  @ViewChild('publishdate', { static: true }) publishdateValue!: ElementRef;

  // Set form control with possible validators
  titlelongForm = new FormControl('', [Validators.required, Validators.pattern(this.setVariableService.titlelongFormPattern)]);
  titleshortForm = new FormControl('', [Validators.required, Validators.pattern(this.setVariableService.titleshortFormPattern)]);
  dateControl = new FormControl(new Date());

  actionstatusForm = new FormControl('', [Validators.required, Validators.pattern(this.setVariableService.actionstatusFormPattern)]);

  // Response from API call
  dataResponse: any = [];

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
  statusResponse = '';
  messageResponse = '';

  // Set list items
  actionListItem:any = [{}];

  ngOnInit(): void {
    // Set title on page
    this.titleService.setTitle(this.title);

    // Set action list
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
  }

  // Perform a task when button is clicked with values from the fields on the webpage
  addButton(titlelong:string, titleshort:string, publishdate:string, actionstatus:string) {
    // Create parameters with key pair values
    this.setVariableService.payload = [{
      titlelong: titlelong,
      titleshort: titleshort,
      publishdate: publishdate,
      actionstatus: actionstatus
    }];

    // Set the loader to true to display on page
    this.isLoading = true;

    // Set the ok to true to not display on page
    this.okValue = true;

    // Set the display value to false to not display the data
    this.displayValue = false;

    // Check if all parameters have been provided
    if (titlelong && titleshort && publishdate && actionstatus) {
      // Get information from API
      this.postDataService.postData(this.setVariableService.payload, this.setVariableService.headers, this.setVariableService.apiURL)
      .subscribe({
        next: (response) => {
          // Next is for successful response message only
          // Set the loader to false to not display on page
          this.isLoading = false;

          // Set the display value to true to display the data
          this.displayValue = true;

          // Return response from API
          this.dataResponse = response;

          // Convert object to JSON string
          let responseJSONMessage = JSON.stringify(response);

          // Parse JSON String to object
          let responseMessage = JSON.parse(responseJSONMessage);

          // Retrieve the response message to keep or remove a specific row
          this.statusResponse = responseMessage.Result[0].Status;
          this.messageResponse = responseMessage.Result[0].Message;

          // Check if the return status message is success
          if (this.statusResponse === 'Success') {
            // Get date to display on a form's input field
            this.dateControl = new FormControl(new Date());

            // Set input fields status to empty
            this.titlelongForm = new FormControl('', [Validators.required, Validators.pattern(this.setVariableService.titlelongFormPattern)]);
            this.titleshortForm = new FormControl('', [Validators.required, Validators.pattern(this.setVariableService.titleshortFormPattern)]);

            // Set action status to empty
            this.actionstatusForm = new FormControl('', [Validators.required, Validators.pattern(this.setVariableService.actionstatusFormPattern)]);
          }
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

        // Mark the following as touched for error messages
        this.titlelongForm.markAsTouched();
        this.titleshortForm.markAsTouched();
        this.dateControl.markAsTouched();
        this.actionstatusForm.markAsTouched();

        // Return response from API
        this.dataResponse = JSON.parse('{"Status": "Success", "Message": "Processed request", "Count": 1, "Result": [{"Status": "Error", "Message": "Process halted, title long, title short, publish date and time, and or action status were not provided"}]}');
      }, 250);
    }
  }

  // Get any errors for input fields
  getInputErrorMessage(inputForm:any) {
    return inputForm.hasError('required') ? 'You must enter a value' :
    inputForm.hasError('pattern') ? 'Invalid input string' : '';
  }

  // Get any errors for select fields
  getSelectErrorMessage(inputForm:any) {
    return inputForm.hasError('required') ? 'You must select a value' :
    inputForm.hasError('pattern') ? 'Invalid selection' : '';
  }

  // Get any errors for input date time fields with custom validation
  getDateTimeErrorMessage() {
    // Initialize parameter
    var returnMessage = '';

    // Retrieve value from input field
    var publishDateTimeValue = this.publishdateValue.nativeElement.value

    // Pattern match
    var patternString = new RegExp(this.setVariableService.publishDateTimeFormPattern);

    // Check if there is a value in the input
    if(!publishDateTimeValue) {
      // Set error message
      returnMessage = 'You must enter a value';
    }
    // Check if the string given does not match the regular expression
    else if (!patternString.test(publishDateTimeValue)) {
      // Else check the pattern of the input field
      // Set error message
      returnMessage = 'Invalid date time string';
    }

    // Return message
    return returnMessage;
  }
}
