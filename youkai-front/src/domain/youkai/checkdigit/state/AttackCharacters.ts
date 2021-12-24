import A31F from "./A31F";
import CodeToCharacterConverter from "@/domain/youkai/checkdigit/converter/CodeToCharacterConverter";

export default class AttackCharacters {
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

    public increment(): AttackCharacters {
        const converter = this.converter;
        const newCodes = this.charCodes.slice();
        for (let i = 0; i < newCodes.length; i++) {
            const before = newCodes[i];
            newCodes[i] = converter.incrementCode(before);
            if (newCodes[i] > before) break; // 繰り上がりなし
        }
        return new AttackCharacters(converter, newCodes);
    }

    public fixInvalid(): AttackCharacters {
        if (!this.isInvalid()) return this;

        const converter = this.converter;
        const newCodes = this.charCodes.slice();
        for (let i = 0; i < newCodes.length; i++) {
            if (!converter.isInvalidCharCode(newCodes[i])) continue;
            newCodes[i] = converter.incrementCode(newCodes[i]);
        }
        return new AttackCharacters(converter, newCodes);
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

    public equals(o: AttackCharacters): boolean {
        if (this === o) return true;
        if (o === null) return false;
        return this.charCodes.toString() === o.charCodes.toString();
    }

    public minimum(): AttackCharacters {
        return AttackCharacters.initialize(this.charCodes.length, this.converter);
    }

    public static initialize(charCount: number, converter = new CodeToCharacterConverter()): AttackCharacters {
        const initialCode = converter.minCode();
        const values = Array(charCount).fill(initialCode);
        return new AttackCharacters(converter, values);
    }

    public static withText(passwordText: string, converter = new CodeToCharacterConverter()): AttackCharacters {
        const codes = passwordText.split("")
            .map(oneCher => converter.reverceConvert(oneCher));
        return new AttackCharacters(converter, codes);
    }
}