import { APIRequestContext, APIResponse } from "@playwright/test";
import { BaseAPIs } from "./BaseAPIs";

export class LoginApiClient extends BaseAPIs{

    private readonly endpoint: string;
    
    constructor(request: APIRequestContext, baseUrl: string ) {
        super(request, baseUrl);
        this.endpoint = '/auth';
    }

    async login(username: string, password: string): Promise<APIResponse> {
        const body = { username: username, password: password }
        return this.post(this.endpoint, body);
    }
}