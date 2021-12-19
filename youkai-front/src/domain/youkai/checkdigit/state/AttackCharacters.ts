import A31F from "./A31F";
import CodeToCharacterConverter from "./CodeToCharacterConverter";

export default class AttackCharacters {
    constructor(private readonly charCodes: number[]) { }

    private readonly converter = new CodeToCharacterConverter();

    public getOf(index: number): number {
        return this.charCodes[index];
    }

    public increment(): AttackCharacters {
        // 0x00-0x35の範囲でループさせる
        const newCodes = this.charCodes.concat();
        newCodes[0]++; // 1個目をインクリメント
        for (let i = 0; i < newCodes.length; i++) {
            // 35を超えたら次の桁へ
            if (newCodes[i] > 0x35) {
                newCodes[i] = 0;
                newCodes[i + 1]++;
            }
        }
        return new AttackCharacters(newCodes);
    }

    public isFinalDestination(): boolean {
        return this.charCodes[this.charCodes.length - 1] === 0x36;
    }

    public passInvalidChar(): AttackCharacters {
        const newCodes = this.charCodes.concat();
        for (let i = 0; i < newCodes.length; i++) {
            if (!this.converter.isInvalidCharCode(newCodes[i])) continue;

            if (i == 0) {
                newCodes[0]++;
                break;
            }
            // 2桁目以降に出現した場合は上位インクリメントして下位をゼロクリア
            for (let j = 0; j < i; j++) {
                newCodes[j] = 0;
            }
            newCodes[i]++;
        }
        return new AttackCharacters(newCodes);
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
            .map(text => text.toString())
            .join(" ")
            .trim();
    }

    public static  Initialize( charCount: number): AttackCharacters {
        return new AttackCharacters(Array(charCount));
    }
}