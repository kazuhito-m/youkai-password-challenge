// ignore lint rule becouse axios bug. see: https://github.com/nuxt-community/axios-module/issues/555
/* eslint import/named: 0 */
import { NuxtAxiosInstance } from "@nuxtjs/axios";
import axios from 'axios';
import RegisterHazurePasswordsResponse from "./RegisterHazurePasswordsResponse";
import HazurePasswordRepository from "@/domain/youkai/password/hazure/HazurePasswordRepository";

export default class HazurePasswordTransfer implements HazurePasswordRepository {
    constructor(private readonly axios: NuxtAxiosInstance) { }

    public async register(passwords: string[]): Promise<boolean> {
        try {
            const url = "https://yokai-server-vunudhkwpa-an.a.run.app/api/import/rejected";
            const response = await axios.post<RegisterHazurePasswordsResponse>(url, passwords);
            const data = response.data;
            console.log(response);
            return data.rejected >= 0;
        } catch (error: any) {
            console.log("通信時エラー", error);
            return false;
        }
    }
}
