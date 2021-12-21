import YoukaiPasswordAttacker from "@/domain/youkai/checkdigit/YoukaiPasswordAttacker";
import A31F from "@/domain/youkai/checkdigit/state/A31F";
import AttackCharacters from "@/domain/youkai/checkdigit/state/AttackCharacters";
import CodeToCharacterConverter from "~/domain/youkai/checkdigit/converter/CodeToCharacterConverter";

describe('YoukaiPasswordAttacker', () => {
    const sut = new YoukaiPasswordAttacker(true);

    test('パスワード_KID_を突き止める事が出来る', () => {
        const targetCheckDigit = A31F.createFromHexStrings8("00", "51", "03", "3A", "E9", "08", "23", "07");
        const startPassword = AttackCharacters.initialize(3);

        const results = sut.execute(targetCheckDigit, startPassword);

        expect(results.length).toEqual(1);
        const actual = results[0].toString();
        expect(actual).toEqual("KID");
    });

    test('パスワード_NAMCO_を突き止める事が出来る', () => {
        const targetCheckDigit = A31F.createFromHexStrings8("3B", "EA", "05", "6C", "D2", "0A", "D8", "08");
        const startPassword = AttackCharacters.initialize(5);

        const results = sut.execute(targetCheckDigit, startPassword);

        expect(results.length).toEqual(1);
        const actual = results[0].toString();
        expect(actual).toEqual("NAMCO");
    });

    test('パスワード_KAWADA_を突き止める事が出来る', () => {
        const targetCheckDigit = A31F.createFromHexStrings8("54", "34", "06", "3C", "10", "0A", "9F", "08");
        const startPassword = AttackCharacters.initialize(6);

        const results = sut.execute(targetCheckDigit, startPassword);

        expect(results.length).toEqual(1);
        const actual = results[0].toString();
        expect(actual).toEqual("KAWADA");
    });

    test('パスワード_NAUSICAA_をコンティニュー機能を使って突き止める事が出来る', () => {
        const targetCheckDigit = A31F.createFromHexStrings8("45", "D7", "08", "9F", "AD", "38", "92", "0B");
        const startPassword = new AttackCharacters(new CodeToCharacterConverter(), [0, 0, 0, 0, 0, 16, 0, 0]);

        const results = sut.execute(targetCheckDigit, startPassword);

        expect(results.length).toEqual(1);
        const actual = results[0].toString();
        expect(actual).toEqual("NAUSICAA");
    });
});
