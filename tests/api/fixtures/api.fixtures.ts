import { EmployerApiClient } from "../../../apis/EmployerApiClient";
import { test as base, expect } from '@playwright/test'
import { LoginApiClient } from "../../../apis/LoginApiClient";
import dotenv from 'dotenv';
import * as fs from 'fs';

type WorkerFixtures = {
    employerApiClient: EmployerApiClient,
}

export const test = base.extend<WorkerFixtures>({
    employerApiClient: async ({ request }, use) => {

        const envFile = `.env.${process.env.ENV || 'dev'}`;
        if (fs.existsSync(envFile)) {
          dotenv.config({ path: envFile });
        }

        const apiUrl = process.env.API_URL || 'http://localhost:3001';
        const loginApiClient = new LoginApiClient(request, apiUrl);
        const response = await loginApiClient.login('admin', 'admin');
        if (response.status() !== 200) {
            throw new Error('Failed to authenticate for employer API');
        }

        const { token } = await response.json();
        const employerApiClient = new EmployerApiClient(request, apiUrl, token);
        await use(employerApiClient);
    },
});

export { expect } from '@playwright/test';