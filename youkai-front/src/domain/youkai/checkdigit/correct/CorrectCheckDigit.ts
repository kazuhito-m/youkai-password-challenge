import AttackCharacters from "../state/AttackCharacters";

export default class CorrectCheckDigit {
    constructor(
        public readonly typicalPassowrd: AttackCharacters,
        public readonly originalMessage: string,
        public readonly description: string
    ) { }

    public static empty(): CorrectCheckDigit {
        return new CorrectCheckDigit(
            AttackCharacters.withText(""),
            "",
            ""
        );
    }

    public isEmpty(): boolean {
        return this.originalMessage === ""
            && this.description === "";
    }
}