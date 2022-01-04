import FoundPasswordRepository from "~/domain/youkai/foundpassword/FoundPasswordRepository";
import FoundPasswords from "@/domain/youkai/foundpassword/FoundPasswords";
import FoundPasswordSearchCondition from "@/domain/youkai/foundpassword/FoundPasswordSearchCondition";
import FoundPasswordSearchResultDownload from "~/domain/youkai/foundpassword/download/FoundPasswordSearchResultDownload";

export default class FoundPasswordService {
    constructor(private readonly repository: FoundPasswordRepository) { }

    public async findOf(condition: FoundPasswordSearchCondition): Promise<FoundPasswords> {
        return await this.repository.findOf(condition);
    }

    public downloadFileOf(condition: FoundPasswordSearchCondition, typicalPassowrd: string): FoundPasswordSearchResultDownload {
        const downloadUrl = this.repository.generateFileDownloadUrlOf(condition, typicalPassowrd);
        return new FoundPasswordSearchResultDownload(downloadUrl, condition);
    }
}
