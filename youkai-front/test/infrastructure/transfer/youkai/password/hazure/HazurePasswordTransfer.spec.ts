import axios from 'axios';
import RegisterHazurePasswordsResponse from '~/infrastructure/transfer/youkai/password/hazure/RegisterHazurePasswordsResponse';
import HazurePasswordTransfer from '~/infrastructure/transfer/youkai/password/hazure/HazurePasswordTransfer';

describe('HazurePasswordTransfer', () => {
    test.skip('axiosで通信を試す', async () => {
        try {
            const passwords: string[] = ["VYUTMIURA5LQTU", "!MIURAFD-22LTU"];
            const url = "https://yokai-server-vunudhkwpa-an.a.run.app/api/import/rejected";
            const response = await axios.post<RegisterHazurePasswordsResponse>(url, passwords);
            const data = response.data;
            console.log(response);
            return data.rejected > 0;
        } catch (error: any) {
            console.log("通信時エラー", error);
            return false;
        }
    });
});
