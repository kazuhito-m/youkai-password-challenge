export default class EnumAnalyzer {
    public static enumLengthOf(enumType: any): number {
        return Object.keys(enumType)
            .map((value, _) => value)
            .map(value => Number(isNaN(Number(value))))
            .reduce((base, current) => base + current, 0);
    }

    public static muxNumberValueOf(numberEnumType: any): number {
        return Object.keys(numberEnumType)
            .map((value, _) => value)
            .filter(value => EnumAnalyzer.isNumber(value))
            .map(value => Number(value))
            .reduce((base, current) => Math.max(base, current));
    }

    private static isNumber(value: string | number): boolean {
        return value !== null &&
            value !== '' &&
            !isNaN(Number(value.toString()));
    }
}