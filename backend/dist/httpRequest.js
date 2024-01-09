"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpRequest = void 0;
const axios_1 = require("@nestjs/axios");
class HttpRequest {
    constructor() {
        this.httpService = new axios_1.HttpService();
    }
    get(baseUrl, headers) {
        return this.httpService.axiosRef.get(baseUrl, { headers: headers })
            .then(res => res.data).catch(err => console.log("Exception"));
    }
}
exports.HttpRequest = HttpRequest;
//# sourceMappingURL=httpRequest.js.map