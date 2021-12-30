import fs from 'fs';
import path from 'path';

export default class TestData {
    constructor(
        public readonly expect: string,
        public readonly param: string
    ) { }

    public static loadTsv(fileName: string): TestData[] {
        const dataFilePath = path.join(__dirname, fileName);
        const dataText = fs.readFileSync(dataFilePath, "utf-8");
        return dataText.split("\n")
            .filter(line => line.trim().length > 0)
            .map(line => line.split("\t"))
            .map(values => new TestData(values[0], values[1]));
    }

    public static loadTxt(fileName: string): TestData[] {
        const dataFilePath = path.join(__dirname, fileName);
        const dataText = fs.readFileSync(dataFilePath, "utf-8");
        return dataText.split("\n")
            .filter(line => line.trim().length > 0)
            .map(values => new TestData("", values));
    }
}