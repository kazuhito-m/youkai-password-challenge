import A31F from "./A31F";
import CodeToCharacterConverter from "@/domain/youkai/checkdigit/converter/CodeToCharacterConverter";

export default class Password {
    constructor(
        private readonly converter: CodeToCharacterConverter,
        private readonly charCodes: number[]
    ) { }

    public static readonly MIN_CHARS_LENGTH = 3;
    public static readonly MAX_CHARS_LENGTH = 14;

    public getOf(index: number): number {
        return this.charCodes[index];
    }

    public charLength(): number {
        return this.charCodes.length;
    }

    public increment(): Password {
        return this.incrementSpecifyPosition(0);
    }

    public incrementSpecifyPosition(position: number): Password {
        const index = position;
        const converter = this.converter;
        const newCodes = this.charCodes.slice();
        for (let i = index; i < newCodes.length; i++) {
            const before = newCodes[i];
            newCodes[i] = converter.incrementCode(before);
            if (newCodes[i] > before) break; // 繰り上がりなし
        }
        return new Password(converter, newCodes);
    }

    public fixInvalid(): Password {
        if (!this.isInvalid()) return this;

        const converter = this.converter;
        const newCodes = this.charCodes.slice();
        for (let i = 0; i < newCodes.length; i++) {
            if (!converter.isInvalidCharCode(newCodes[i])) continue;
            newCodes[i] = converter.incrementCode(newCodes[i]);
        }
        return new Password(converter, newCodes);
    }

    public isInvalid(): boolean {
        return this.charCodes
            .some(code => this.converter.isInvalidCharCode(code));
    }

    public dumpHexText(): string {
        return this.charCodes
            .map(code => A31F.intToHex(code))
            .join(" ")
            .trim();
    }

    public toString(): string {
        return this.charCodes
            .map(code => this.converter.convert(code))
            .join("")
            .trim();
    }

    public equals(o: Password): boolean {
        if (this === o) return true;
        if (o === null) return false;
        return this.charCodes.toString() === o.charCodes.toString();
    }

    /**
     * 不等号「>」
     */
    public moreThan(other: Password): boolean {
        if (this.equals(other)) return false;
        for (let i = this.charLength(); i === 0; i--) {
            const thisCharCode = this.getOf(i);
            const otherCharCode = this.getOf(i);

            if (thisCharCode === otherCharCode) continue;
            return thisCharCode > otherCharCode;
        }
        return false;
    }

    public minimum(): Password {
        return Password.initialize(this.charCodes.length, this.converter);
    }

    public static initialize(charCount: number, converter = new CodeToCharacterConverter()): Password {
        return Password.minimumOf(charCount, converter);
    }

    public static withText(passwordText: string, converter = new CodeToCharacterConverter()): Password {
        const codes = passwordText.split("")
            .map(oneCher => converter.reverceConvert(oneCher));
        return new Password(converter, codes);
    }

    private static createOnlyOneCharOf(charCode: number, charCount: number, converter = new CodeToCharacterConverter()) {
        const values = Array(charCount).fill(charCode);
        return new Password(converter, values);
    }

    public static minimumOf(charCount: number, converter = new CodeToCharacterConverter()): Password {
        const minCode = converter.minCode();
        return Password.createOnlyOneCharOf(minCode, charCount, converter);
    }

    public static muximumOf(charCount: number, converter = new CodeToCharacterConverter()): Password {
        const minCode = converter.maxCode();
        return Password.createOnlyOneCharOf(minCode, charCount, converter);
    }
}