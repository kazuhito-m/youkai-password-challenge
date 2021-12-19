/**
 * 文字コード変換テーブル。
 */
export default class CodeToCharacterConverter {
    private static readonly A_TO_Y = "AHOV16**BIPW27**CJQX38**DKRY49**ELSZ50**FMT-n!**GNU.mc".split("");
    private static readonly INVALID_CHAR = "*";

    public convert(code: number): string {
        return CodeToCharacterConverter.A_TO_Y[code];
    }

    public isInvalidCharCode(code: number): boolean {
        return CodeToCharacterConverter.INVALID_CHAR === this.convert(code);
    }
}