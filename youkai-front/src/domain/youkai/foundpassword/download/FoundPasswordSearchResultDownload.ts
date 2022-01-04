import FoundPasswordSearchCondition from "@/domain/youkai/foundpassword/FoundPasswordSearchCondition";
import moment from "moment";

export default class FoundPasswordSearchResultDownload {
    constructor(
        public readonly downloadUrl: string,
        private readonly condition: FoundPasswordSearchCondition
    ) { }

    public localDownloadFileName(): string {
        return `password_${this.dateTimeText()}_${this.condition.query}.txt`;
    }

    private dateTimeText(): string {
        return moment().format("YYYYMMDDHHmmss");
    }
}