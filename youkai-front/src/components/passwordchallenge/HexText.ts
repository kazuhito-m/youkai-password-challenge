import Password from "@/domain/youkai/checkdigit/state/Password";

export default class HexText {
    private static readonly HEX_CHARS = " 0123456789ABCDEF";

    public static parseHex(hexText: string): Password {
        const hexChars = hexText
            .replace(/\s+/g, "")
            .match(/.{2}/g);

        if (!hexChars) return Password.empty()

        const charCodes = hexChars.map(hex => parseInt(hex, 16));
        if (charCodes.includes(NaN)) return Password.empty();

        const password = new Password(charCodes);

        return password.isInvalid()
            ? Password.empty()
            : password;
    }

    public static validationPasswordHex(event: KeyboardEvent): boolean {
        const inputChar = event.key.toUpperCase();
        const charOk = event.code === 'Space'
            || HexText.HEX_CHARS.indexOf(inputChar) > 0

        const input = event.currentTarget as HTMLInputElement;
        const nowValue = input.value;
        const hex = nowValue.replace(/\s+/g, "");
        const lengthOk = hex.length < Password.MAX_CHARS_LENGTH * 2;

        return charOk && lengthOk;
    }

    public static fixPasswordHexWhenInvalid(hex: string) {
        if (!hex) return ""; // ×ボタンで、なぜかNullになるため。
        return hex.trim()
            .toUpperCase()
            .replace(/\s+/g, " ");
    }
}