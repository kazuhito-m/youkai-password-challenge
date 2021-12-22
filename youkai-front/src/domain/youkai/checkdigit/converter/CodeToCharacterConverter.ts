/**
 * 文字コード変換テーブル。
 */
export default class CodeToCharacterConverter {
    private readonly codeToChar: string[];
    private readonly incrementNextCodeTable: number[];

    private static readonly INVALID_CHAR = '*';
    private static readonly DEFAULT_CHAR_TABLE = "AHOV16**BIPW27**CJQX38**DKRY49**ELSZ50**FMT-n!**GNU.mc";

    constructor(
        private readonly charTable: string = CodeToCharacterConverter.DEFAULT_CHAR_TABLE,
    ) {
        this.codeToChar = charTable.split('');
        this.incrementNextCodeTable = this.createIncrementNextCodeTable(this.codeToChar);
    }

    public convert(code: number): string {
        return this.codeToChar[code];
    }

    public reverceConvert(passwordChar: string): number {
        const oneChar = passwordChar.charAt(0); // 念の為
        for (let i = 0; i < this.codeToChar.length; i++) {
            if (this.codeToChar[i] === oneChar) return i;
        }
        return -1;
    }

    public incrementCode(code: number): number {
        let index = this.incrementNextCodeTable.length - 1;
        if (code <= index) index = code;
        return this.incrementNextCodeTable[index];
    }

    public minCode(): number {
        const table = this.incrementNextCodeTable;
        return table[table.length - 1];
    }

    public isInvalidCharCode(code: number): boolean {
        return CodeToCharacterConverter.INVALID_CHAR === this.convert(code);
    }

    public isInvalidChar(oneChar: string): boolean {
        if (oneChar === CodeToCharacterConverter.INVALID_CHAR) return true;
        return this.charTable.indexOf(oneChar) < 0;
    }

    public isInvalidPassword(text: string): boolean {
        return text.split("")
            .some(oneChar => this.isInvalidChar(oneChar));
    }

    public fixValidPassword(text: string): string {
        return text.split("")
            .map(oneChar => this.fixValidOneChar(oneChar))
            .join("");
    }

    private fixValidOneChar(oneChar: string) {
        if (!this.isInvalidChar(oneChar)) return oneChar;
        const upperChar = oneChar.toUpperCase();
        if (!this.isInvalidChar(upperChar)) return upperChar;
        return "";
    }

    private createIncrementNextCodeTable(codeToChar: string[]): number[] {
        const firstValidCharCode = [...Array(codeToChar.length).keys()]
            .filter(i => codeToChar[i] != CodeToCharacterConverter.INVALID_CHAR)[0];

        const result = Array(codeToChar.length);
        let currentIncrementCode = firstValidCharCode;
        for (let i = codeToChar.length - 1; i >= 0; i--) {
            result[i] = currentIncrementCode;
            if (codeToChar[i] != CodeToCharacterConverter.INVALID_CHAR) currentIncrementCode = i;
        }

        return result;
    }
}