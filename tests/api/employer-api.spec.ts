import test, { expect, request } from "@playwright/test";
import { EmployerApiClient } from "../../apis/EmployerApiClient";
import { LoginApiClient } from "../../apis/LoginApiClient";
import { login } from "../../mock-apis/src/auth/login";


test.describe("Employer API Tests", () => {
    let employerApiClient: EmployerApiClient;

    test.beforeEach(async ({ request }) => {
        const loginApiClient = new LoginApiClient(request, 'http://localhost:3001');
        const response = await loginApiClient.login('admin', 'admin');
        expect(response.status(), { message: 'Authentication failed '}).toBe(200);
        const data = await response.json();
        employerApiClient = new EmployerApiClient(request, 'http://localhost:3001', data.token);
    });

    test.afterEach(async () => {
        // Cleanup logic if needed, e.g., deleting test data
    });

    test("should fetch all employers", async ({request}) => {
        const response = await employerApiClient.getAllEmployers();
        expect(response.status()).toBe(200);
        const data = await response.json();
        expect(Array.isArray(data)).toBe(true);
    });

    test("should create a new employer", async () => {
        const newEmployer = { name: "Test Employer"};
        const response = await employerApiClient.createEmployer(newEmployer);
        expect(response.status()).toBe(201);
        const data = await response.json();
        expect(data.name).toBe(newEmployer.name);
    });

    test("should update an existing employer", async () => {
        const updatedEmployer = { name: "Updated Employer"};
        const response = await employerApiClient.updateEmployer(1, updatedEmployer);
        expect(response.status()).toBe(200);
        const data = await response.json();
        expect(data.name).toBe(updatedEmployer.name);
    });

    test("should delete an employer by ID", async () => {
        const response = await employerApiClient.deleteEmployerById(2);
        expect(response.status()).toBe(200); // No Content
    });

    test("should fetch an employer by ID", async () => {
        const response = await employerApiClient.getEmployerById(3);
        expect(response.status()).toBe(200);
        const data = await response.json();
        expect(data.id).toBe(3);
    });
});