"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const httpRequest_1 = require("./httpRequest");
let AppService = class AppService extends httpRequest_1.HttpRequest {
    async execute() {
        const baseUrl = "https://api.metalpriceapi.com/v1/latest?api_key=439d70ce440015d85b49297087e27252";
        const header = {
            'Content-Type': 'application/json',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36'
        };
        const requestData = await this.get(baseUrl, header);
        console.log("this is result of api", requestData);
        const multipliedRates = {};
        for (const [currency, rate] of Object.entries(requestData['rates'])) {
            multipliedRates[currency] = Number(rate) * 50000;
        }
        console.log("this is result of convert Value", multipliedRates);
        return {
            requestData, multipliedRates
        };
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map