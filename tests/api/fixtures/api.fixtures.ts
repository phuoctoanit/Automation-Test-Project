import { EmployerApiClient } from "../../../apis/EmployerApiClient";
import { test as base, expect } from '@playwright/test'
import { LoginApiClient } from "../../../apis/LoginApiClient";


type WorkerFixtures = {
    employerApiClient: EmployerApiClient,
}

export const test = base.extend<WorkerFixtures>({
    employerApiClient: async ({ request }, use) => {
        const loginApiClient = new LoginApiClient(request, 'http://localhost:3001');
        const response = await loginApiClient.login('admin', 'admin');
        if (response.status() !== 200) {
            throw new Error('Failed to authenticate for employer API');
        }

        const { token } = await response.json();
        const employerApiClient = new EmployerApiClient(request, 'http://localhost:3001', token);
        await use(employerApiClient);
    },
});

export { expect } from '@playwright/test';