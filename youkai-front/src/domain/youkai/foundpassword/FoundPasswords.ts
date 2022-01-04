export default class FoundPasswords {
    constructor(
        public readonly passwords: string[],
        public readonly fullCount: number
    ) { }

    private static readonly COUNT_WHEN_ERROR = -1;

    public isError(): boolean {
        return this.fullCount === FoundPasswords.COUNT_WHEN_ERROR;
    }

    public static error(): FoundPasswords {
        return new FoundPasswords([], FoundPasswords.COUNT_WHEN_ERROR);
    }
}