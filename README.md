# Automation-Test-Project

## Instruction
A comprehensive test automation using Playwright with TypeScript, implementing the Page Object Model pattern for web testing.

## Table of Contents
1.  [Purpose of Framework](#1-purpose-of-framework)
2.  [Installation](#2-installation)
3.  [Framework Structure](#3-framework-structure)
4.  [Execution](#4-execution)
5.  [Test Cases Documented](#5-test-cases-documented)
6.  [CI/CD Integration Guideline](#6-cicd-integration-guideline)
7.  [Reporting](#7-reporting)

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

<pre>
npx playwright test
</pre>
#### 2. Run Specific Test File

<pre>
npx playwright test tests/form/03 - validation.spec.ts
</pre>
#### 3. Run with Tagged Tests (e.g.: @validation)

<pre>npx playwright test --grep @validation
</pre>

#### 4. Custom Environment Variables
<pre>BROWSER=firefox npx playwright test
</pre>
#### 4. Open Playwright Test Runner (UI Mode)

<pre>npx playwright test --ui
</pre>

## 5. Test Cases Documented

1. Using this [form](https://demoqa.com/automation-practice-form) to write some test cases as belows:

#### 🧪 Test Case Summary

| TC ID  | Title                              | Status   |
|--------|------------------------------------|----------|
| TC001  | Validate gender, hobbies and date of birth values on form            | ✅ Pass  |
| TC002  | User can submit data to form with all valid data           | ✅ Pass  |
| TC003  | User can submit data to from with required field data    | ✅ Pass  |
| TC004  | Validation if user leave empty, space or specific characters on First Name   | ❌ Fail  |
| TC005  | Validation if user leave empty, space or specific characters on Last Name    | ❌ Fail  |
| TC006  | Validation if user leave empty, invalid email formmat    | ✅ Pass  |
| TC007  | Validation if user leave empty, characters, less than 10 digits or more than 10 digits on Phone Number   | ✅ Pass  |
| TC008  | Validation if user doesn't select on Gender    | ✅ Pass  |
| TC009  | Validation if user doesn't select on Hobbies    | ✅ Pass  |
| TC010  | Validation if user leave empty value on Subject    | ❌ Fail  |
| TC011  | Validation if user can de-select all or de-select one by one on Subject    | ❌ Fail  |
| TC012  | Validation if user leave empty value or enter a long text on Current Address   | ✅ Pass  |
| TC013  | Validation if user submit form with all empty data   | ❌ Fail  |

## 6. CI/CD Intergration Guideline

<p>The CI/CD pipeline, configured with GitHub Actions, triggers on every push to the main branch.</p>

<p>GitHub workflow file: .github/workflows/playwright.yml
</p>

<p>Playwright reports are generated and published via GitHub Pages.</p>

## 7. Reporting

#### 1. To open report after executing, run the following command:

<pre>npx playwright show-report</pre>

#### 2. On Github Action, download the lasted running.
![alt text](image.png)




