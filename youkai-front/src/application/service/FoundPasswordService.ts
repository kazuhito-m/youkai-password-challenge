import FoundPasswordRepository from "~/domain/youkai/foundpassword/FoundPasswordRepository";
import FoundPasswords from "@/domain/youkai/foundpassword/FoundPasswords";
import FoundPasswordSearchCondition from "@/domain/youkai/foundpassword/FoundPasswordSearchCondition";

export default class FoundPasswordService {
    constructor(private readonly repository: FoundPasswordRepository) {}

    public async findOf(condition: FoundPasswordSearchCondition): Promise<FoundPasswords> {
        return await this.repository.findOf(condition);
    }
}
