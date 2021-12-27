import Password from "../checkdigit/state/Password";

export default class AttackPasswordRange {
    constructor(
        private readonly formPassword: Password,
        private readonly toPassword: Password
    ) {}

    public static of(fromPasswordText:string , toPasswordText: string): AttackPasswordRange {
        return new AttackPasswordRange(
            Password.withText(fromPasswordText),
            Password.withText(toPasswordText)
        );
    }
}