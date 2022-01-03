export default class FoundPasswordSearchCondition {
    constructor(
        public readonly query: string,
        public readonly offset: number,
        public readonly limit: number,
        public readonly reverce: boolean
    ) {}

    public withOffsetOf(offset: number):FoundPasswordSearchCondition {
        return new FoundPasswordSearchCondition(
            this.query,
            offset,
            this.limit,
            this.reverce
        );
    }
}