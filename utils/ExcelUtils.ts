import * as XLSX from 'xlsx';
import * as fs from 'fs';
import { FormData } from '../form-data/formData';
import { ExcelData } from '../constants/ExcelData';

export class ExcelUtils {

    /**
   * Reads an entire Excel file and returns JSON data from a specific sheet by name or index.
   * Defaults to the first sheet if not specified.
   */
    static readExcelFile(filePath: string, sheet?: string | number): any[] {
        if (!fs.existsSync(filePath)) {
            throw new Error(`Excel file not found at path: ${filePath}`);
        }
        const workbook = XLSX.readFile(filePath);
        let sheetName: string;
        if (typeof sheet === 'number') {
            const names = workbook.SheetNames;
            if (sheet < 0 || sheet >= names.length) {
                throw new Error(`Sheet index ${sheet} is out of bounds`);
            }
            sheetName = names[sheet];
        } else {
            if (typeof sheet === 'string') {
                sheetName = sheet;
            } else {
                throw new Error('Sheet name must be provided as a string or number');
            }
        }

        const worksheet = workbook.Sheets[sheetName];
        if (!worksheet) {
            throw new Error(`Sheet "${sheetName}" not found`);
        }
        return XLSX.utils.sheet_to_json(worksheet, { defval: '' });
    }

    /**
    * Reads all sheet names from an Excel file.
    */
    static getSheetNames(filePath: string): string[] {
        if (!fs.existsSync(filePath)) {
            throw new Error(`Excel file not found at path: ${filePath}`);
        }
        const workbook = XLSX.readFile(filePath);
        return workbook.SheetNames;
    }

    /**
   * Gets the value from a specific cell, using either A1 notation or (row, col) index.
   * Row and column are zero-based (e.g., row: 0, col: 0 → cell A1).
   */
    static getCellValue(filePath: string, sheet: string | number, cell: string | { row: number; col: number }
    ): string | number | boolean | null {
        if (!fs.existsSync(filePath)) {
            throw new Error(`Excel file not found at path: ${filePath}`);
        }

        const workbook = XLSX.readFile(filePath);

        let sheetName: string;
        if (typeof sheet === 'number') {
            sheetName = workbook.SheetNames[sheet];
        } else {
            sheetName = sheet;
        }

        const worksheet = workbook.Sheets[sheetName];
        if (!worksheet) {
            throw new Error(`Sheet "${sheetName}" not found`);
        }

        let cellRef: string;
        if (typeof cell === 'string') {
            cellRef = cell;
        } else {
            const colLetter = XLSX.utils.encode_col(cell.col);
            const rowNumber = cell.row + 1;
            cellRef = `${colLetter}${rowNumber}`;
        }

        return worksheet[cellRef]?.v ?? null;
    }

    /**
    * Gets values of a specific row by index (zero-based).
    */
    static getRowValues(filePath: string, sheet: string | number, rowIndex: number): (string | number | boolean | null)[] {
        if (!fs.existsSync(filePath)) {
            throw new Error(`Excel file not found at path: ${filePath}`);
        }
        const workbook = XLSX.readFile(filePath);
        const sheetName =
            typeof sheet === 'number' ? workbook.SheetNames[sheet] : sheet;
        const worksheet = workbook.Sheets[sheetName];

        if (!worksheet) {
            throw new Error(`Sheet "${sheetName}" not found`);
        }

        const range = XLSX.utils.decode_range(worksheet['!ref'] || '');
        const values: (string | number | boolean | null)[] = [];

        for (let col = range.s.c; col <= range.e.c; col++) {
            const cellAddress = XLSX.utils.encode_cell({ c: col, r: rowIndex });
            const cell = worksheet[cellAddress];
            values.push(cell ? cell.v : null);
        }
        return values;
    }

    /**
     * 
     * @param cellValue The value of the cell to format, can be a number (Excel serial date) or a string.
     * @returns 
     */
    static formatExcelDate(cellValue: any): string {
        if (typeof cellValue === 'number') {
            const date = XLSX.SSF?.parse_date_code(cellValue);
            if (date) {
                const jsDate = new Date(Date.UTC(date.y, date.m - 1, date.d));
                const formatter = new Intl.DateTimeFormat('en-US', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                });
                return formatter.format(jsDate); // ➜ "25 Feb 1990"
            }
        }
        if (typeof cellValue === 'string') {
            return cellValue.trim();
        }
        return '';
    }

    // Example stub for parseRowData, adjust return type and implementation as needed
    static parseRowData(filePath: string, sheet: string | number, rowIndex: number): FormData {
        if (!fs.existsSync(filePath)) {
            throw new Error(`Excel file not found at path: ${filePath}`);
        }
        // Example implementation: return row values (you can adjust as needed)
        const rowValues = this.getRowValues(filePath, sheet, rowIndex);
        const dateOfBirth = this.formatExcelDate(rowValues[ExcelData.DateOfBirth_ColumnIndex] as string);
        return {
            firstName: rowValues[ExcelData.FirstName_ColumnIndex] as string || '',
            lastName: rowValues[ExcelData.LastName_ColumnIndex] as string || '',
            email: rowValues[ExcelData.Email_ColumnIndex] as string || '',
            gender: rowValues[ExcelData.Gender_ColumnIndex] as string || '',
            userNumber: rowValues[ExcelData.Mobile_ColumnIndex] as string || '',
            dateOfBirth: dateOfBirth,
            subjects: (rowValues[ExcelData.Subjects_ColumnIndex] as string)?.split(',').map(s => s.trim()) || [],
            hobbies: (rowValues[ExcelData.Hobbies_ColumnIndex] as string)?.split(',').map(s => s.trim()) || [],
            picture: rowValues[ExcelData.Picture_ColumnIndex] as string || '',
            currentAddress: rowValues[ExcelData.Address_ColumnIndex] as string || '',
            state: rowValues[ExcelData.State_ColumnIndex] as string || '',
            city: rowValues[ExcelData.City_ColumnIndex] as string || ''
        };
    }
}