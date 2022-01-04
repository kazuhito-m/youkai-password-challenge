export default class FoundPasswords {
    constructor(
        public readonly passwords: string[],
        public readonly fullCount: number
    ) { }

    static error(): FoundPasswords {
        return new FoundPasswords([], -1);
    }
}