import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetLimitService {
  // Initialize array string
  limitList = [{}];

  constructor() { }

  // Get list
  getLimitList() {
    // Set list
    this.limitList = [
      {
        selectValue: '25',
        description: '25'
      },
      {
        selectValue: '50',
        description: '50'
      },
      {
        selectValue: '75',
        description: '75'
      },
      {
        selectValue: '100',
        description: '100'
      }
    ];

    // Return list
    return this.limitList;
  }
}