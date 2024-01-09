import { Injectable } from '@nestjs/common';
import { HttpRequest } from './httpRequest';

@Injectable()
export class AppService extends HttpRequest{
  async execute(): Promise<any>{
    const baseUrl = "https://api.metalpriceapi.com/v1/latest?api_key=439d70ce440015d85b49297087e27252"
    const header = {
      'Content-Type': 'application/json',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36'
    }


    const requestData = await this.get(baseUrl, header);

    console.log("this is result of api",requestData)

    const multipliedRates: { [currency: string]: number } = {};
    for (const [currency, rate] of Object.entries(requestData['rates'])) {
      multipliedRates[currency] = Number(rate) * 50000;
    }


    console.log("this is result of convert Value",multipliedRates)

    return {
      requestData,multipliedRates
    }

  }
}
