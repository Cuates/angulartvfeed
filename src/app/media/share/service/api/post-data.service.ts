import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostDataService {
  // Add HTTP Client to the constructor
  constructor(private httpClient: HttpClient) { }

  // Put API call with headers and parameters
  postData(payload: any, headers: any, apiurl: string) {
    // Set the parameter for HTTP Headers
    let headerHTTP: HttpHeaders = headers;

    // Return results
    // URL, Payload, Headers
    return this.httpClient.post(apiurl, payload, { headers: headerHTTP });
  }
}