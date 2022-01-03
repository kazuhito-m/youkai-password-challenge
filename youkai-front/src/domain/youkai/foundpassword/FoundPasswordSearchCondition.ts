export default class FoundPasswordSearchCondition {
    constructor(
        public readonly query: string,
        public readonly offset: number,
        public readonly limit: number,
        public readonly reverce: boolean
    ) {}
}