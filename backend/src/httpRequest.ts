import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from "axios";

export class HttpRequest {
  httpService: HttpService;

  constructor() {
    this.httpService = new HttpService();
  }

  get(baseUrl: string, headers: any): Promise<AxiosResponse<any> | void>{
    return this.httpService.axiosRef.get(baseUrl, { headers: headers })
      .then(
        res => res.data
      ).catch(
        err => console.log("Exception")
      );
  }
}
