export default class A31F {
    private a31F4 = 0;
    private a31F5 = 0;
    private a31F7 = 0;
    private a31F8 = 0;
    private a31F9 = 0;
    private a31FA = 1;
    private a31FB = 0;

    constructor(
        public readonly charLength = 1   // 文字列長さ
    ) { }

    // calculate method

    public rotateRightOneBit31F4(flag: number): number {
        const beforFirstBit = this.a31F4 & 0x01;
        this.a31F4 = (this.a31F4 >> 1) | (flag << 7); // C0000000
        return beforFirstBit;
    }

    public rotateRightOneBit31F5(flag: number): number {
        const beforFirstBit = this.a31F5 & 0x01;
        this.a31F5 = (this.a31F5 >> 1) | (flag << 7); // C0000000
        return beforFirstBit;
    }

    public rotateRightOneBit31FA(flag: number): number {
        const beforFirstBit = this.a31FA & 0x01;
        this.a31FA = (this.a31FA >> 1) | (flag << 7); // $31F8のCがここで入る
        return beforFirstBit;
    }

    public calc31F4And31F5(flag: number): void {
        const work8bit = flag ^ 0xFF;
        this.a31F4 = (work8bit & 0x84) ^ this.a31F4;
        this.a31F5 = (work8bit & 0x08) ^ this.a31F5;
    }

    public calc31F4And31F5And31F9(targetCharCode: number): number {
        let C5;
        if (this.a31F4 >= 0xE5) {
            C5 = 1;
        } else C5 = 0; // C5の値でキャリーを生成
        let A06 = targetCharCode + this.a31F7 + C5;

        let C6;
        if (A06 > 0xFF) { // ADCのキャリー処理
            A06 = A06 & 0xFF;
            C6 = 1;
        } else C6 = 0;
        this.a31F7 = A06;
        let A07 = this.a31F8 + this.a31F5 + C6;

        let C7;
        if (A07 > 0xFF) { // ADCのキャリー処理
            A07 = A07 & 0xFF;
            C7 = 1;
        } else C7 = 0;
        this.a31F8 = A07;

        this.a31F9 = targetCharCode ^ this.a31F9;

        return C7;
    }

    public calc31FA(flag: number, targetCharCode: number): number {
        let A01 = targetCharCode + this.a31FA + flag;

        let C9;
        if (A01 > 0xFF) { // ADCのキャリー処理
            A01 = A01 & 0xFF;
            C9 = 1;
        } else C9 = 0;

        this.a31FA = A01;

        return C9;
    }

    // D880 とラベルが振られてた処理。
    public calc31FB(flag: number, targetCharCode: number): void {
        // 31FBを生成
        // Aを左ローテート
        let A02 = targetCharCode << 1;
        let C9 = flag;
        if (A02 > 0xFF) { // ADCのキャリー処理
            A02 = A02 & 0xFF;
            C9 = 1;
        }
        const stackA06 = A02; // スタックに値を保存

        let A03 = this.a31FB + C9;

        let C10;
        if (A03 > 0xFF) { // ADCのキャリー処理
            A03 = A03 & 0xFF;
            C10 = 1;
        } else C10 = 0;
        this.a31FB = A03;

        // 演算結果がゼロの時;
        if (stackA06 === 0) return;

        this.calc31FB(C10, stackA06); // ローテ終わるまでループ
    }

    // factory methods

    public static createFromHexStrings8(...hexStrings8: string[]): A31F {
        const o = new A31F(A31F.hexToInt(hexStrings8[2]));
        o.a31F4 = A31F.hexToInt(hexStrings8[0]);
        o.a31F5 = A31F.hexToInt(hexStrings8[1]);
        o.a31F7 = A31F.hexToInt(hexStrings8[3]);
        o.a31F8 = A31F.hexToInt(hexStrings8[4]);
        o.a31F9 = A31F.hexToInt(hexStrings8[5]);
        o.a31FA = A31F.hexToInt(hexStrings8[6]);
        o.a31FB = A31F.hexToInt(hexStrings8[7]);
        return o;
    }

    public static createFromHexText(hexText: string): A31F {
        const hexString8 = hexText.split(" ");
        return A31F.createFromHexStrings8(...hexString8);
    }

    public static prototypeOf(charLength: number): A31F {
        return new A31F(charLength);
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
