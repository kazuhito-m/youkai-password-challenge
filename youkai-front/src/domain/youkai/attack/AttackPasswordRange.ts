import Password from "../checkdigit/state/Password";

export default class AttackPasswordRange {
    constructor(
        public readonly formPassword: Password,
        public readonly toPassword: Password
    ) {}

    public static of(fromPasswordText:string , toPasswordText: string): AttackPasswordRange {
        return new AttackPasswordRange(
            Password.withText(fromPasswordText),
            Password.withText(toPasswordText)
        );
    }
}