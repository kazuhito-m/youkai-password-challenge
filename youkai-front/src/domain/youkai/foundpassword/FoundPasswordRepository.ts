import FoundPasswords from "./FoundPasswords";
import FoundPasswordSearchCondition from "./FoundPasswordSearchCondition";

export default interface FoundPasswordRepository {
    findOf(condition: FoundPasswordSearchCondition): Promise<FoundPasswords>;
    generateFileDownloadUrlOf(condition: FoundPasswordSearchCondition): string;
}
