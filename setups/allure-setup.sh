#!/bin/bash
# Setup Allure report generation

# Preserve trend history
mkdir -p allure-results/history
cp -r allure-report/history allure-results/ 2>/dev/null || true

# Clean old report manually
rm -rf allure-report

# Generate new report
allure generate allure-results -o allure-report --clean

# Open report
allure open allure-report
