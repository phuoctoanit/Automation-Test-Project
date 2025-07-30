import { TestInfo } from '@playwright/test';
import path from 'path';

type Metadata = {
    feature?: string;
    story?: string;
    severity?: string;
    owner?: string;
    tag?: string | string[];
    issue?: string;
    description?: string;
};

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

    static addAllureMetadata(testInfo: TestInfo, metadata: Metadata): void {
        const add = (type: string, value?: string | string[]) => {
        if (!value) return;
        const values = Array.isArray(value) ? value : [value];
        for (const v of values) {
            testInfo.annotations.push({ type, description: v });
        }
        };

        add('feature', metadata.feature);
        add('story', metadata.story);
        add('severity', metadata.severity);
        add('owner', metadata.owner);
        add('tag', metadata.tag);
        add('issue', metadata.issue);
        add('description', metadata.description);
    }
}