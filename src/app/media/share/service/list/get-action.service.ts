import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetActionService {
  // Initialize array string
  actionList: any = [{}];

  constructor() { }

  // Get list
  getActionList() {
    // Set list
    this.actionList = [
      {
        selectValue: '0',
        description: 'Registered'
      },
      {
        selectValue: '1',
        description: 'Ignore'
      },
      {
        selectValue: '2',
        description: 'Retain'
      }
    ];

    // Return list
    return this.actionList;
  }
}
