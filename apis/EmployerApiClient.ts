import { APIRequestContext, APIResponse } from "@playwright/test";
import { APIEndpoint } from "../constants/APIEndpoint";
import { BaseAPIs } from "./BaseAPIs";

export class EmployerApiClient extends BaseAPIs {

    private readonly endpoint: string;

    constructor(request: APIRequestContext, baseUrl: string, token?: string) {
        super(request, baseUrl, token);
        this.endpoint = APIEndpoint.Employer;
    }

    /**
     * 
     * @returns Promise<APIResponse>
     * @description Fetches all employers from the API.
     * This method sends a GET request to the /employers/all endpoint.
     * It returns a promise that resolves to the API response.
     */
    async getAllEmployers(): Promise<APIResponse> {
        return this.get(`${this.endpoint}/all`);
    }

    /**
     * 
     * @param employer 
     * @returns Promise<APIResponse>
     * @description Creates a new employer.
     * This method sends a POST request to the /employers/create endpoint with the employer data.
     */
    async createEmployer(employer: any): Promise<APIResponse> {
        return this.post(`${this.endpoint}/create`, employer);
    }

    /**
     * 
     * @param id 
     * @returns Promise<APIResponse>
     * @description Fetches an employer by ID.
     * This method sends a GET request to the /employers/:id endpoint.
     */
    async updateEmployer(id: number, employer: any): Promise<APIResponse> {
        return this.put(`${this.endpoint}/update/${id}`, employer);
    }

    /**
     * Deletes an employer by ID.
     * @param id Delete an employer by ID.
     * @returns 
     */
    async deleteEmployerById(id: number): Promise<APIResponse> {
        return this.delete(`${this.endpoint}/delete/${id}`);
    }

    /**
     * Gets an employer by ID.
     * This method sends a GET request to the /employers/:id endpoint.
     * @param id 
     * @returns 
     */
    async getEmployerById(id: number): Promise<APIResponse> {
        return this.get(`${this.endpoint}/${id}`);
    }
}