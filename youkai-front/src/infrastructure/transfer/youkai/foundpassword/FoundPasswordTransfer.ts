import FoundPasswordRepository from "@/domain/youkai/foundpassword/FoundPasswordRepository";
import FoundPasswordSearchCondition from "@/domain/youkai/foundpassword/FoundPasswordSearchCondition";
import FoundPasswords from "@/domain/youkai/foundpassword/FoundPasswords";
import { NuxtAxiosInstance } from "@nuxtjs/axios";

export default class FoundPasswordTransfer implements FoundPasswordRepository {
    constructor(private readonly axios: NuxtAxiosInstance) {}

    public findOf(condition: FoundPasswordSearchCondition): FoundPasswords {
        return new FoundPasswords(["ABCDEFGH", "IJKLMNOPQ"] , 2);
    }
}