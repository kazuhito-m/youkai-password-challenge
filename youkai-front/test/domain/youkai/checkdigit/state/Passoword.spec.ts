import Password from "~/domain/youkai/checkdigit/state/Password";
import CodeToCharacterConverter from "@/domain/youkai/checkdigit/converter/CodeToCharacterConverter";

describe('Passoword', () => {
    test('文字列の初期化時に_有効な文字コード中で一番低い値_で初期化される', () => {
        const charTable = "****16******27******38******49******50*****-*******.**";
        const converter = new CodeToCharacterConverter(charTable);

        const actual = Password.initialize(4, converter);

        expect(actual.dumpHexText()).toEqual("04 04 04 04");
    });

    test('インクリメントすると無効文字列を飛ばして次のコードに上がる', () => {
        const charTable = "****16******27******38******49******50*****-*******.**";
        const converter = new CodeToCharacterConverter(charTable);

        const firstCode = new Password([4, 4], converter);
        expect(firstCode.dumpHexText()).toEqual("04 04");

        const actual = firstCode.increment();

        expect(actual.dumpHexText()).toEqual("05 04");

        const actual2 = actual.increment();

        expect(actual2.dumpHexText()).toEqual("0C 04");
    });

    test('インクリメントすると無効文字列を飛ばして繰り上がりも意識して上がる', () => {
        const charTable = "****16******27******38******49******50*****-*******.**";
        const converter = new CodeToCharacterConverter(charTable);

        const firstCode = new Password([51, 51, 4], converter);
        expect(firstCode.dumpHexText()).toEqual("33 33 04");

        const actual = firstCode.increment();

        expect(actual.dumpHexText()).toEqual("04 04 05");
    });

    test('最大値の時にインクリメントすると最小値に成る', () => {
        const charTable = "****16******27******38******49******50*****-*******.**";
        const converter = new CodeToCharacterConverter(charTable);

        const minimum = Password.initialize(6, converter);

        const firstCode = new Password([51, 51, 51, 51, 51, 51], converter);
        expect(firstCode.dumpHexText()).toEqual("33 33 33 33 33 33");

        const actual = firstCode.increment();

        expect(actual.dumpHexText()).toEqual("04 04 04 04 04 04");
        expect(actual).toEqual(minimum);
    });

    test('無効値のコードを含む値の場合インクリメントで直近の有効値まで引き上げる', () => {
        const charTable = "****16******27******38******49******50*****-*******.**";
        const converter = new CodeToCharacterConverter(charTable);

        const firstCode = new Password([0, 1, 2, 3], converter);
        expect(firstCode.dumpHexText()).toEqual("00 01 02 03");

        const actual = firstCode.fixInvalid();

        expect(actual.dumpHexText()).toEqual("04 04 04 04");
    });

    test('パスワードの>(不等号:小なり)が判定出来る', () => {
        let left = Password.withText("AAA");
        let right = Password.withText("AAA");
        expect(left.moreThan(right)).toBeFalsy();

        left = Password.withText("AAH");
        right = Password.withText("AAA");
        expect(left.moreThan(right)).toBeTruthy();

        left = Password.withText("HAA");
        right = Password.withText("AAA");
        expect(left.moreThan(right)).toBeTruthy();

        left = Password.withText("AAA");
        right = Password.withText("AAH");
        expect(left.moreThan(right)).toBeFalsy();

        left = Password.withText("AAA");
        right = Password.withText("HAA");
        expect(left.moreThan(right)).toBeFalsy();

        left = Password.withText("AAH");
        right = Password.withText("ccA");
        expect(left.moreThan(right)).toBeTruthy();

        left = Password.withText("AAH");
        right = Password.withText("HAH");
        expect(left.moreThan(right)).toBeFalsy();
    });

    test('パスワードテキストからバイナリコードに変換出来る', () => {
        expect("22 0A 20 20 18 2B 32 0A").toEqual(Password.withText("SPEED-UP").dumpHexText());
        expect("02 01 00 1B 02 32 19 00 0B 00 18 00").toEqual(Password.withText("OHAYOUKAWADA").dumpHexText());
        expect("32 18 00 18 00 30 00 0B 00").toEqual(Password.withText("UDADAGAWA").dumpHexText());
        expect("22 33 05 0C 33 25 15 33 0C 0C").toEqual(Password.withText("S.62.08.22").dumpHexText());
        expect("19 02 08 00 1B 00 22 01 09").toEqual(Password.withText("KOBAYASHI").dumpHexText());
        expect("19 00 0B 00 18 00").toEqual(Password.withText("KAWADA").dumpHexText());
        expect("0A 10 2B 20 31 30 09 31 20").toEqual(Password.withText("PC-ENGINE").dumpHexText());
        expect("31 20 10").toEqual(Password.withText("NEC").dumpHexText());
        expect("29 09 23 32 31 02").toEqual(Password.withText("MIZUNO").dumpHexText());
        expect("05 15 25 1D").toEqual(Password.withText("6809").dumpHexText());
        expect("29 02 31 09 2A 02 1A").toEqual(Password.withText("MONITOR").dumpHexText());
        expect("1B 00 29 00 22 01 09 2A 00").toEqual(Password.withText("YAMASHITA").dumpHexText());
        expect("29 09 10 01 09 1B 02").toEqual(Password.withText("MICHIYO").dumpHexText());
        expect("1B 00 30 09").toEqual(Password.withText("YAGI").dumpHexText());
        expect("1B 32 19 09 01 09 19 02").toEqual(Password.withText("YUKIHIKO").dumpHexText());
        expect("19 02 29 00 09").toEqual(Password.withText("KOMAI").dumpHexText());
        expect("19 00 23 32 01 09 19 02").toEqual(Password.withText("KAZUHIKO").dumpHexText());
        expect("0D 24 05 2B 0C 14 04 04").toEqual(Password.withText("756-2311").dumpHexText());
        expect("31 00 29 10 02").toEqual(Password.withText("NAMCO").dumpHexText());
        expect("31 00 29 10 02 2A").toEqual(Password.withText("NAMCOT").dumpHexText());
        expect("31 00 30 00 29 00 2A 22 32").toEqual(Password.withText("NAGAMATSU").dumpHexText());
        expect("00 19 09 1A 00").toEqual(Password.withText("AKIRA").dumpHexText());
        expect("31 00 32 22 09 10 00 00").toEqual(Password.withText("NAUSICAA").dumpHexText());
        expect("21 00 0A 32 2A 00").toEqual(Password.withText("LAPUTA").dumpHexText());
        expect("05 15 25 25 25").toEqual(Password.withText("68000").dumpHexText());
        expect("05 24 25 0C").toEqual(Password.withText("6502").dumpHexText());
        expect("01 00 21").toEqual(Password.withText("HAL").dumpHexText());
        expect("19 09 18").toEqual(Password.withText("KID").dumpHexText());
        expect("19 32 29 09 33 01 00 31 00 02 19 00").toEqual(Password.withText("KUMI.HANAOKA").dumpHexText());
        expect("01 00 1A 32 01 09 22 00 33 32 18 00 30 00 0B 00").toEqual(Password.withText("HARUHISA.UDAGAWA").dumpHexText());
    });
});