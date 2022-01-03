import FoundPasswordRepository from "~/domain/youkai/foundpassword/FoundPasswordRepository";
import FoundPasswords from "@/domain/youkai/foundpassword/FoundPasswords";
import FoundPasswordSearchCondition from "@/domain/youkai/foundpassword/FoundPasswordSearchCondition";

export default class FoundPasswordService {
    constructor(private readonly repository: FoundPasswordRepository) {}

    public findOf(condition: FoundPasswordSearchCondition): FoundPasswords {
        return this.repository.findOf(condition);
    }
}
