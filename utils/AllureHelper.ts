import { TestInfo } from '@playwright/test';
import path from 'path';

export class AllureHelper {
    static getAllureResultsPath(): string {
        return 'allure-results';
    }

    static getAllureReportPath(): string {
        return 'allure-report';
    }

    static getAllureHistoryPath(): string {
        return 'allure-history';
    }

    static getMergedResultsPath(): string {
        return 'merged-results';
    }

    static getAllureConfigFilePath(): string {
        return path.join(this.getAllureResultsPath(), 'allure-config.json');
    }

    static addAllureMetadata(testInfo: TestInfo, meta: {
        feature?: string;
        story?: string;
        severity?: string;
        owner?: string;
        issue?: string;
        tag?: string;
        description?: string;
    }) {
        for (const [key, value] of Object.entries(meta)) {
        if (value) {
            testInfo.annotations.push({ type: key, description: value });
        }
        }
    }
}