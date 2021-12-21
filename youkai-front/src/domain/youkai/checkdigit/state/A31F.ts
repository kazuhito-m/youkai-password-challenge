export default class A31F {
    public a31F4 = 0;
    public a31F5 = 0;
    public a31F7 = 0;
    public a31F8 = 0;
    public a31F9 = 0;
    public a31FA = 0;
    public a31FB = 0;

    public charLength = 1;   // 文字列長さ

    public static createFromHexStrings8(...hexStrings8: string[]): A31F {
        const o = new A31F();
        o.a31F4 = A31F.hexToInt(hexStrings8[0]);
        o.a31F5 = A31F.hexToInt(hexStrings8[1]);
        o.charLength = A31F.hexToInt(hexStrings8[2]);
        o.a31F7 = A31F.hexToInt(hexStrings8[3]);
        o.a31F8 = A31F.hexToInt(hexStrings8[4]);
        o.a31F9 = A31F.hexToInt(hexStrings8[5]);
        o.a31FA = A31F.hexToInt(hexStrings8[6]);
        o.a31FB = A31F.hexToInt(hexStrings8[7]);
        return o;
    }

    public prototype(): A31F {
        const p = new A31F();
        p.a31FA = 1;
        p.charLength = this.charLength;
        return p;
    }

    public equals(o: A31F): boolean {
        if (this === o) return true;
        return this.a31F4 === o.a31F4
            && this.a31F5 === o.a31F5
            && this.charLength === o.charLength
            && this.a31F7 === o.a31F7
            && this.a31F8 === o.a31F8
            && this.a31F9 === o.a31F9
            && this.a31FA === o.a31FA
            && this.a31FB === o.a31FB;
    }

    public toString(): string {
        return [this.a31F4, this.a31F5, this.charLength, this.a31F7, this.a31F8, this.a31F9, this.a31FA, this.a31FB]
            .map(code => A31F.intToHex(code))
            .join(" ")
            .trim();
    }

    private static hexToInt(hex: string): number {
        return parseInt(hex, 16);
    }

    public static intToHex(num: number): string {
        return ('00' + num.toString(16))
            .substr(-2)
            .toUpperCase();
    }
}
