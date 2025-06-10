import { APIRequestContext, APIResponse } from "@playwright/test";

export abstract class BaseAPIs {

    protected readonly request: APIRequestContext;
    protected readonly baseUrl: string; // Default base URL, can be overridden
    protected authToken?: string;

    /**
     * Base class for API interactions.
     * This class can be extended to implement specific API methods.
     */
    constructor(request: APIRequestContext, baseUrl: string, authToken?: string) {
        this.request = request;
        this.baseUrl = baseUrl;
        this.authToken = authToken;
    }

    private buildHeaders(): Record<string, string> {
        return this.authToken
            ? { Authorization: `Bearer ${this.authToken}` }
            : {};
    }

    /**
     * Builds a full URL for the API request.
     * @param endpoint The API endpoint to call.
     * @param params Optional query parameters to include in the request.
     * @returns The full URL as a string.
     */
    private buildUrl(endpoint: string, params?: Record<string, string>): string {
        let url = `${this.baseUrl}${endpoint}`;
        if (params) {
            const queryString = new URLSearchParams(params).toString();
            url += `?${queryString}`;
        }
        return url;
    }

    /**
     * Generic method to make a GET request to the API.
     * @param endpoint 
     * @param params 
     * @returns 
     */
    protected async get<T>(endpoint: string, params?: Record<string, string>): Promise<APIResponse> {
        const url = this.buildUrl(endpoint, params);
        // Use the request context to make the GET request
        // This allows for better control over the request, such as setting headers or authentication
        // if needed in the future.
        // For now, we are just returning the response from the API.
        // This method can be overridden in subclasses to provide specific functionality.
        if (params) {
            return this.request.get(url, { params, headers: this.buildHeaders() } );
        }
        // If no params are provided, just return the response from the API.
        // This is useful for endpoints that do not require query parameters.
        // It allows for a cleaner and more concise API interaction.
        // This method can be used to fetch data from the API.
        // It can be overridden in subclasses to provide specific functionality.
        // For example, subclasses can implement methods to fetch specific resources or collections.
        // This method can be used to fetch data from the API.
        return this.request.get(url, { headers: this.buildHeaders() });
    }

    /**
     * Posts data to the API.
     * This method can be used to create or update resources.
     * @param endpoint 
     * @param body 
     * @returns 
     */
    protected async post<T>(endpoint: string, body: T): Promise<APIResponse> {
        const url = this.buildUrl(endpoint);
        return this.request.post(url, { data: body, headers: this.buildHeaders() });
    }

    /**
     * Puts data to the API.
     * @param endpoint 
     * @param body 
     * @returns 
     */
    protected async put<T>(endpoint: string, body: T): Promise<APIResponse> {
        const url = this.buildUrl(endpoint);
        return this.request.put(url, { data: body, headers: this.buildHeaders() });
    }

    /**
     * Deletes a resource from the API.
     * @param endpoint 
     * @returns 
     */
    protected async delete(endpoint: string): Promise<APIResponse> {
        const url = this.buildUrl(endpoint);
        return this.request.delete(url, { headers: this.buildHeaders() });
    }  
}