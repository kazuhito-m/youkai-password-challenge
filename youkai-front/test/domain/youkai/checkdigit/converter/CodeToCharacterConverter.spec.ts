import CodeToCharacterConverter from "@/domain/youkai/checkdigit/state/CodeToCharacterConverter";

describe('CodeToCharacterConverter', () => {
    test('インクリメント用の_次の値_テーブルを作り_次のコードが取得できる', () => {
        const charTable = "****16******27******38******49******50*****-*******.**";
        const sut = new CodeToCharacterConverter(charTable);

        expect(sut.incrementCode(0)).toEqual(4);
        expect(sut.incrementCode(1)).toEqual(4);
        expect(sut.incrementCode(2)).toEqual(4);
        expect(sut.incrementCode(3)).toEqual(4);
        expect(sut.incrementCode(4)).toEqual(5);
        expect(sut.incrementCode(5)).toEqual(12);
        expect(sut.incrementCode(6)).toEqual(12);

        expect(sut.incrementCode(10)).toEqual(12);
        expect(sut.incrementCode(11)).toEqual(12);
        expect(sut.incrementCode(12)).toEqual(13);
        expect(sut.incrementCode(13)).toEqual(20);
        expect(sut.incrementCode(14)).toEqual(20);

        expect(sut.incrementCode(49)).toEqual(51);
        expect(sut.incrementCode(50)).toEqual(51);
        expect(sut.incrementCode(51)).toEqual(4);
        expect(sut.incrementCode(52)).toEqual(4);
        expect(sut.incrementCode(53)).toEqual(4);

        const tableSize = charTable.length;
        expect(sut.incrementCode(tableSize - 1)).toEqual(4);
        expect(sut.incrementCode(tableSize)).toEqual(4);
        expect(sut.incrementCode(tableSize + 1)).toEqual(4);
    });
});
