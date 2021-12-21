import AttackCharacters from "@/domain/youkai/checkdigit/state/AttackCharacters";
import CodeToCharacterConverter from "@/domain/youkai/checkdigit/converter/CodeToCharacterConverter";

describe('AttackCharacters', () => {
    test('文字列の初期化時に_有効な文字コード中で一番低い値_で初期化される', () => {
        const charTable = "****16******27******38******49******50*****-*******.**";
        const converter = new CodeToCharacterConverter(charTable);

        const actual = AttackCharacters.initialize(4, converter);

        expect(actual.dumpHexText()).toEqual("04 04 04 04");
    });

    test('インクリメントすると無効文字列を飛ばして次のコードに上がる', () => {
        const charTable = "****16******27******38******49******50*****-*******.**";
        const converter = new CodeToCharacterConverter(charTable);

        const firstCode = new AttackCharacters(converter, [4, 4]);
        expect(firstCode.dumpHexText()).toEqual("04 04");

        const actual = firstCode.increment();

        expect(actual.dumpHexText()).toEqual("05 04");

        const actual2 = actual.increment();

        expect(actual2.dumpHexText()).toEqual("0C 04");
    });

    test('インクリメントすると無効文字列を飛ばして繰り上がりも意識して上がる', () => {
        const charTable = "****16******27******38******49******50*****-*******.**";
        const converter = new CodeToCharacterConverter(charTable);

        const firstCode = new AttackCharacters(converter, [51, 51, 4]);
        expect(firstCode.dumpHexText()).toEqual("33 33 04");

        const actual = firstCode.increment();

        expect(actual.dumpHexText()).toEqual("04 04 05");
    });

    test('最大値の時にインクリメントすると最小値に成る', () => {
        const charTable = "****16******27******38******49******50*****-*******.**";
        const converter = new CodeToCharacterConverter(charTable);

        const minimum = AttackCharacters.initialize(6, converter);

        const firstCode = new AttackCharacters(converter, [51, 51, 51, 51, 51, 51]);
        expect(firstCode.dumpHexText()).toEqual("33 33 33 33 33 33");

        const actual = firstCode.increment();

        expect(actual.dumpHexText()).toEqual("04 04 04 04 04 04");
        expect(actual).toEqual(minimum);
    });

    test('無効値のコードを含む値の場合インクリメントで直近の有効値まで引き上げる', () => {
        const charTable = "****16******27******38******49******50*****-*******.**";
        const converter = new CodeToCharacterConverter(charTable);

        const firstCode = new AttackCharacters(converter, [0, 1, 2, 3]);
        expect(firstCode.dumpHexText()).toEqual("00 01 02 03");

        const actual = firstCode.fixInvalid();

        expect(actual.dumpHexText()).toEqual("04 04 04 04");
    });

    test('パスワードテキストからバイナリコードに変換出来る', () => {
        expect("22 0A 20 20 18 2B 32 0A").toEqual(AttackCharacters.withText("SPEED-UP").dumpHexText());
        expect("02 01 00 1B 02 32 19 00 0B 00 18 00").toEqual(AttackCharacters.withText("OHAYOUKAWADA").dumpHexText());
        expect("32 18 00 18 00 30 00 0B 00").toEqual(AttackCharacters.withText("UDADAGAWA").dumpHexText());
        expect("22 33 05 0C 33 25 15 33 0C 0C").toEqual(AttackCharacters.withText("S.62.08.22").dumpHexText());
        expect("19 02 08 00 1B 00 22 01 09").toEqual(AttackCharacters.withText("KOBAYASHI").dumpHexText());
        expect("19 00 0B 00 18 00").toEqual(AttackCharacters.withText("KAWADA").dumpHexText());
        expect("0A 10 2B 20 31 30 09 31 20").toEqual(AttackCharacters.withText("PC-ENGINE").dumpHexText());
        expect("31 20 10").toEqual(AttackCharacters.withText("NEC").dumpHexText());
        expect("29 09 23 32 31 02").toEqual(AttackCharacters.withText("MIZUNO").dumpHexText());
        expect("05 15 25 1D").toEqual(AttackCharacters.withText("6809").dumpHexText());
        expect("29 02 31 09 2A 02 1A").toEqual(AttackCharacters.withText("MONITOR").dumpHexText());
        expect("1B 00 29 00 22 01 09 2A 00").toEqual(AttackCharacters.withText("YAMASHITA").dumpHexText());
        expect("29 09 10 01 09 1B 02").toEqual(AttackCharacters.withText("MICHIYO").dumpHexText());
        expect("1B 00 30 09").toEqual(AttackCharacters.withText("YAGI").dumpHexText());
        expect("1B 32 19 09 01 09 19 02").toEqual(AttackCharacters.withText("YUKIHIKO").dumpHexText());
        expect("19 02 29 00 09").toEqual(AttackCharacters.withText("KOMAI").dumpHexText());
        expect("19 00 23 32 01 09 19 02").toEqual(AttackCharacters.withText("KAZUHIKO").dumpHexText());
        expect("0D 24 05 2B 0C 14 04 04").toEqual(AttackCharacters.withText("756-2311").dumpHexText());
        expect("31 00 29 10 02").toEqual(AttackCharacters.withText("NAMCO").dumpHexText());
        expect("31 00 29 10 02 2A").toEqual(AttackCharacters.withText("NAMCOT").dumpHexText());
        expect("31 00 30 00 29 00 2A 22 32").toEqual(AttackCharacters.withText("NAGAMATSU").dumpHexText());
        expect("00 19 09 1A 00").toEqual(AttackCharacters.withText("AKIRA").dumpHexText());
        expect("31 00 32 22 09 10 00 00").toEqual(AttackCharacters.withText("NAUSICAA").dumpHexText());
        expect("21 00 0A 32 2A 00").toEqual(AttackCharacters.withText("LAPUTA").dumpHexText());
        expect("05 15 25 25 25").toEqual(AttackCharacters.withText("68000").dumpHexText());
        expect("05 24 25 0C").toEqual(AttackCharacters.withText("6502").dumpHexText());
        expect("01 00 21").toEqual(AttackCharacters.withText("HAL").dumpHexText());
        expect("19 09 18").toEqual(AttackCharacters.withText("KID").dumpHexText());
        expect("19 32 29 09 33 01 00 31 00 02 19 00").toEqual(AttackCharacters.withText("KUMI.HANAOKA").dumpHexText());
        expect("01 00 1A 32 01 09 22 00 33 32 18 00 30 00 0B 00").toEqual(AttackCharacters.withText("HARUHISA.UDAGAWA").dumpHexText());
    });
});