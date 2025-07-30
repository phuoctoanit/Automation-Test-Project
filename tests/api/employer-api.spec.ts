import { login } from "../../mock-apis/src/auth/login";
import { test, expect } from "./fixtures/api.fixtures";



test.describe("Employer API Tests", () => {

    const loginData = [
        { username: 'valid_user', password: 'valid_pass', shouldLogin: true },
        { username: 'invalid_user', password: 'invalid_pass', shouldLogin: false },
        { username: '', password: 'no_user', shouldLogin: false },
    ]  

    loginData.forEach(({ username, password, shouldLogin }) => {
        test(`should ${shouldLogin ? 'successfully' : 'fail to'} login with username: ${username}`, async ({ }) => {
            
        });
    });

    test("should fetch all employers", async ({employerApiClient}) => {
        const response = await employerApiClient.getAllEmployers();
        expect(response.status()).toBe(200);
        const data = await response.json();
        expect(Array.isArray(data)).toBe(true);
    });

    test("should create a new employer", async ({employerApiClient}) => {
        const newEmployer = { name: "Test Employer"};
        const response = await employerApiClient.createEmployer(newEmployer);
        expect(response.status()).toBe(201);
        const data = await response.json();
        expect(data.name).toBe(newEmployer.name);
    });

    test("should update an existing employer", async ({employerApiClient}) => {
        const updatedEmployer = { name: "Updated Employer"};
        const response = await employerApiClient.updateEmployer(1, updatedEmployer);
        expect(response.status()).toBe(200);
        const data = await response.json();
        expect(data.name).toBe(updatedEmployer.name);
    });

    test("should delete an employer by ID", async ({employerApiClient}) => {
        const response = await employerApiClient.deleteEmployerById(2);
        expect(response.status()).toBe(200); // No Content
    });

    test("should fetch an employer by ID", async ({employerApiClient}) => {
        const response = await employerApiClient.getEmployerById(3);
        expect(response.status()).toBe(200);
        const data = await response.json();
        expect(data.id).toBe(3);
    });
});