import HazurePasswordRepository from "~/domain/youkai/password/hazure/HazurePasswordRepository";

export default class HazurePasswordService {
    constructor(private readonly repository: HazurePasswordRepository) { }

    public async register(passwords: string[]): Promise<boolean> {
        return await this.repository.register(passwords);
    }
}
