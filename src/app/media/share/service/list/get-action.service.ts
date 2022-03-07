import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { SetVariableService } from '../global/set-variable.service';

@Injectable({
  providedIn: 'root'
})
export class GetActionService {
  constructor(private httpClient: HttpClient, private setVariableService: SetVariableService) { }

  // Get list
  getActionList() {
    // Set parameters for the API call
    this.setVariableService.params = {
      actionnumber: '',
      actiondescription: '',
      limit: '',
      sort: 'asc'
    }

    // Return data results
    // URL, Headers
    return this.httpClient.get(this.setVariableService.apiActionStatusURL, { headers: this.setVariableService.headers, params: this.setVariableService.params });
  }
}
