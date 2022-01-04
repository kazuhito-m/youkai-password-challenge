import FoundPasswordRepository from "@/domain/youkai/foundpassword/FoundPasswordRepository";
import FoundPasswordSearchCondition from "@/domain/youkai/foundpassword/FoundPasswordSearchCondition";
import FoundPasswords from "@/domain/youkai/foundpassword/FoundPasswords";
import { NuxtAxiosInstance } from "@nuxtjs/axios";
import CodeToCharacterConverter from "~/domain/youkai/checkdigit/converter/CodeToCharacterConverter";
import Password from "~/domain/youkai/checkdigit/state/Password";
import FoundPasswordResponse from "./FoundPasswordResponse";

export default class FoundPasswordTransfer implements FoundPasswordRepository {
    constructor(private readonly axios: NuxtAxiosInstance) { }

    public async findOf(condition: FoundPasswordSearchCondition): Promise<FoundPasswords> {
        try {
            const response = await this.axios.get<FoundPasswordResponse>('foundpassword?query=MI&offset=1400&limit=20&reverse=true');
            const data = response.data;
            return new FoundPasswords(data.passwords, data.fullCount);
        } catch (error: any) {
            console.log("通信時エラー", error);
            return FoundPasswords.error();
        }
    }

    private test(condition: FoundPasswordSearchCondition) {
        let fullCount = 0;
        if (condition.query === "AB") fullCount = 56789;
        if (condition.query === "XXX") fullCount = 12345;
        if (condition.query === "MIURA") fullCount = 543;
        if (condition.query === "200") fullCount = 200;
        if (condition.query === "201") fullCount = 201;

        let remainCount = Math.min(condition.limit, fullCount - condition.offset);
        const converter = new CodeToCharacterConverter();
        const result: string[] = [];
        for (let i = 0; i < remainCount; i++) {
            result.push(Password.generateRandom(14).toString());
        }
        return new FoundPasswords(result, fullCount);
    }
}