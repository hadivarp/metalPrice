import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from "axios";
export declare class HttpRequest {
    httpService: HttpService;
    constructor();
    get(baseUrl: string, headers: any): Promise<AxiosResponse<any> | void>;
}
