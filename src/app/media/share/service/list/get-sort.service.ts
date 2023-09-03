import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetSortService {
  // Initialize array string
  sortList: any = [{}];

  constructor() { }

  // Get list
  getSortList() {
    // Set list
    this.sortList = [
      {
        selectValue: 'asc',
        description: 'asc'
      },
      {
        selectValue: 'desc',
        description: 'desc'
      }
    ];

    // Return list
    return this.sortList;
  }
}