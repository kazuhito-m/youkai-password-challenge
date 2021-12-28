import Password from "@/domain/youkai/checkdigit/state/Password";

export default class AttackPasswordRange {
    constructor(
        public readonly formPassword: Password,
        public readonly toPassword: Password
    ) { }

    public static of(fromPasswordText: string, toPasswordText: string): AttackPasswordRange {
        return new AttackPasswordRange(
            Password.withText(fromPasswordText),
            Password.withText(toPasswordText)
        );
    }

    public static createChanck(fromPassword: Password, incrimentPosition: number): AttackPasswordRange {
        let toPassword: Password = fromPassword.incrementSpecifyPosition(incrimentPosition);
        if (toPassword.equals(Password.minimumOf(fromPassword.charLength())))
            toPassword = Password.muximumOf(fromPassword.charLength());
        return new AttackPasswordRange(fromPassword, toPassword);
    }

    public createFirstChank(allRange: AttackPasswordRange, incrimentPosition: number): AttackPasswordRange {
        const chank = AttackPasswordRange.createChanck(allRange.formPassword, incrimentPosition);
        if (allRange.toPassword.moreThan(chank.toPassword)) return chank;
        return new AttackPasswordRange(chank.formPassword, allRange.toPassword);
    }
}