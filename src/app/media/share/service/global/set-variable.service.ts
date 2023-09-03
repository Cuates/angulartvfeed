import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SetVariableService {
  // Set URL parameter for the API call
  apiURL = '<api_url>';
  apiActionStatusURL = '<api_url>';

  // Set the URL link for the view button
  urlPrefixValue: string = '<view_button_url>';

  // Set parameters for the API call
  payload = [{}];

  // Set parameters for the API call
  params = {
  }

  // Set headers for the API call
  headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'Accept': 'application/json'
  }

  // Set the patterns for all form fields
  titlelongFormPattern:string = '^[a-zA-Z0-9-_.\\\[\\\]]{2,}$';
  titleshortFormPattern:string = '^[a-zA-Z0-9-_.\\\[\\\]]{2,}$';
  publishDateTimeFormPattern:string = '^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}';
  actionstatusFormPattern:string = '^[0-9]{1,}$';

  constructor() {
  }
}
