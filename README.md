# Automation-Test-Project

## Instruction
A comprehensive test automation using Playwright with TypeScript, implementing the Page Object Model pattern for web testing.

## Table of Contents
1.  [Purpose of Framework](#1-purpose-of-framework)
2.  [Installation](#2-installation)
3.  [Framework Structure](#3-framework-structure)
4.  [Execution](#4-execution)
5.  [Test Cases Documented](#4-test-cases-documented)
6. [CI/CD Integration Guideline](#5-cicd-integration-guideline)
7. [Reporting](#6-reporting)

## 1. Purpose of Framework

  Provide a Playwright Framework for Web Application with TypeScript, implementing the Page Object Modal and integrated with CI/CD Github Action

## 2. Installation

#### 1. Clone the Repository

<pre>
git clone https://github.com/your-org/your-repo-name.git
cd your-repo-name
</pre>

#### 2. Install Dependencies

<pre>
npm install
</pre>
#### 3. Install Playwright Browser

<pre>
npx playwright install
</pre>
## 3. Framework Structure
<pre>
├── README.md
├── constants
│   └── Color.ts #include constants or Enum values
├── form-data
│   └── formData.ts #define form data
├── package-lock.json
├── package.json
├── page #contains the page objects for each page
│   ├── BasePage.ts
│   ├── HomePage.ts
│   └── PageManager.ts
├── playwright-report
├── playwright.config.ts # contains the playwright configuration
├── resources
│   └── cat.jpeg
├── test-results
└── tests
    ├── form
    │   ├── 01 - default-value.spec.ts
    │   ├── 02 - submission.spec.ts
    │   └── 03 - validations.spec.ts
    └── shared.fixtures.ts
</pre>
## 4. Execution

#### 1. Run All Tests

#### 2. Run Specific Test File

#### 3. Run with Tagged Tests (e.g.: @validation)

#### 4. Custom Environment Variables

#### 4. Open Playwright Test Runner (UI Mode)


## 5. Test Cases Documented

## 6. CI/CD Intergration Guideline

## 7. Reporting

