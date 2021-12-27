import Password from "../state/Password";

export default class CorrectCheckDigit {
    constructor(
        public readonly typicalPassowrd: Password,
        public readonly originalMessage: string,
        public readonly description: string
    ) { }

    public static empty(): CorrectCheckDigit {
        return new CorrectCheckDigit(
            Password.withText(""),
            "",
            ""
        );
    }

    public isEmpty(): boolean {
        return this.originalMessage === ""
            && this.description === "";
    }
}