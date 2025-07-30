import { login } from "../../mock-apis/src/auth/login";
import { AllureHelper } from "../../utils/AllureHelper";
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

    test("should fetch all employers", async ({employerApiClient}, testInfo) => {
        AllureHelper.addAllureMetadata(testInfo, {
            feature: 'API Testing',
            story: 'API - Employer Management',
            severity: 'critical',
            owner: 'toan.nguyen',
            tag: 'smoke',
            issue: 'JIRA-1234',
            description: 'This test verifies successful login for admin user.'
        });

        const response = await employerApiClient.getAllEmployers();
        expect(response.status()).toBe(200);
        const data = await response.json();
        expect(Array.isArray(data)).toBe(true);
    });

    test("should create a new employer", async ({employerApiClient}, testInfo) => {
        AllureHelper.addAllureMetadata(testInfo, {
            feature: 'API Testing',
            story: 'API - Employer Management',
            severity: 'critical',
            owner: 'toan.nguyen',
            tag: 'smoke',
            issue: 'JIRA-1235',
            description: 'Creation new employer success.'
        });

        const newEmployer = { name: "Test Employer"};
        const response = await employerApiClient.createEmployer(newEmployer);
        expect(response.status()).toBe(201);
        const data = await response.json();
        expect(data.name).toBe(newEmployer.name);
    });

    test("should update an existing employer", async ({employerApiClient}, testInfo) => {
        AllureHelper.addAllureMetadata(testInfo, {
            feature: 'API Testing',
            story: 'API - Employer Management',
            severity: 'critical',
            owner: 'toan.nguyen',
            tag: 'smoke',
            issue: 'JIRA-1236',
            description: 'Update an existing employer.'
        });
        const updatedEmployer = { name: "Updated Employer"};
        const response = await employerApiClient.updateEmployer(1, updatedEmployer);
        expect(response.status()).toBe(200);
        const data = await response.json();
        expect(data.name).toBe(updatedEmployer.name);
    });

    test("should delete an employer by ID", async ({employerApiClient}, testInfo) => {
        AllureHelper.addAllureMetadata(testInfo, {
            feature: 'API Testing',
            story: 'API - Employer Management',
            severity: 'critical',
            owner: 'toan.nguyen',
            tag: 'smoke',
            issue: 'JIRA-1234',
            description: 'This test verifies successful login for admin user.'
        });
        const response = await employerApiClient.deleteEmployerById(2);
        expect(response.status()).toBe(200); // No Content
    });

    test("should fetch an employer by ID", async ({employerApiClient}, testInfo) => {
        AllureHelper.addAllureMetadata(testInfo, {
            feature: 'API Testing',
            story: 'API - Employer Management',
            severity: 'critical',
            owner: 'toan.nguyen',
            tag: 'smoke',
            issue: 'JIRA-1234',
            description: 'This test verifies successful login for admin user.'
        });
        const response = await employerApiClient.getEmployerById(3);
        expect(response.status()).toBe(200);
        const data = await response.json();
        expect(data.id).toBe(3);
    });
});