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
});