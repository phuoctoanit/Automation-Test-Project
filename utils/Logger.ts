import { TestInfo } from "@playwright/test";

export class Logger {
    static log(testInfo: TestInfo, message?: string): void {
        console.log(`[Worker ${testInfo.workerIndex}] ${message}`);
    }

    static error(testInfo: TestInfo, message?: string): void {
        console.error(`[Worker ${testInfo.workerIndex}] ${message}`);
    }

    static warn(testInfo: TestInfo, message?: string): void {
        console.warn(`[Worker ${testInfo.workerIndex}] ${message}`);
    }
}