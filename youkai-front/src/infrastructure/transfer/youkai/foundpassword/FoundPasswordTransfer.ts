// ignore lint rule becouse axios bug. see: https://github.com/nuxt-community/axios-module/issues/555
/* eslint import/named: 0 */
import { NuxtAxiosInstance } from "@nuxtjs/axios";
import FoundPasswordResponse from "./FoundPasswordResponse";
import FoundPasswordRepository from "@/domain/youkai/foundpassword/FoundPasswordRepository";
import FoundPasswordSearchCondition from "@/domain/youkai/foundpassword/FoundPasswordSearchCondition";
import FoundPasswords from "@/domain/youkai/foundpassword/FoundPasswords";

export default class FoundPasswordTransfer implements FoundPasswordRepository {
    constructor(private readonly axios: NuxtAxiosInstance) { }

    public async findOf(condition: FoundPasswordSearchCondition): Promise<FoundPasswords> {
        // DEBUG
        if (condition.query === "ERROR") return FoundPasswords.error();
        if (condition.query === "MANY") return new FoundPasswords([], 50001);
        
        try {
            const response = await this.axios.get<FoundPasswordResponse>('/api/foundpassword', { params: condition });
            const data = response.data;
            return new FoundPasswords(data.passwords, data.fullCount);
        } catch (error: any) {
            console.log("通信時エラー", error);
            return FoundPasswords.error();
        }
    }
}
