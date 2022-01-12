export default interface HazurePasswordRepository {
    register(passwords: string[]): Promise<boolean>;
}