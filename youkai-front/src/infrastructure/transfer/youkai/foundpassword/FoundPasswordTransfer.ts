import FoundPasswordRepository from "@/domain/youkai/foundpassword/FoundPasswordRepository";
import FoundPasswordSearchCondition from "@/domain/youkai/foundpassword/FoundPasswordSearchCondition";
import FoundPasswords from "@/domain/youkai/foundpassword/FoundPasswords";
import { NuxtAxiosInstance } from "@nuxtjs/axios";
import CodeToCharacterConverter from "~/domain/youkai/checkdigit/converter/CodeToCharacterConverter";
import Password from "~/domain/youkai/checkdigit/state/Password";

export default class FoundPasswordTransfer implements FoundPasswordRepository {
    constructor(private readonly axios: NuxtAxiosInstance) { }

    public findOf(condition: FoundPasswordSearchCondition): FoundPasswords {
        // TODO 実際のAPI呼び出し。

        // 以下、ダミーコード
        let fullCount = 0;
        if (condition.query === "AB") fullCount = 56789;
        if (condition.query === "XXX") fullCount = 12345;
        if (condition.query === "MIURA") fullCount = 543;

        const remainCount = Math.min(condition.limit, fullCount - condition.offset)
        const converter = new CodeToCharacterConverter();
        const result: string[] = [];
        for (let i = 0; i < remainCount; i++) {
            result.push(Password.generateRandom(14).toString());
        }
        return new FoundPasswords(result, fullCount);
    }
}