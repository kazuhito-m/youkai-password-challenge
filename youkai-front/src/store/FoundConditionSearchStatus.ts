import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators';
import moment, { Moment } from 'moment';
import PasswordViewModel from './PasswordViewModel';
import FoundPasswordService from '@/application/service/FoundPasswordService';
import FoundPasswordSearchCondition from '~/domain/youkai/foundpassword/FoundPasswordSearchCondition';

@Module({
    name: 'FoundConditionSearchStatus',
    stateFactory: true,
    namespaced: true,
})
export default class FoundConditionSearchStatus extends VuexModule {
    private conditionQuery: string = "";
    private reverseOrder = false;

    private searchedCondition: FoundPasswordSearchCondition | null = null;
    private searchedFullCount: number = 0;
    private searchedDateTime: Moment | null = null;
    private searchedError: boolean = false;

    private passwords: PasswordViewModel[] = [];

    private searching: boolean = false;

    public service?: FoundPasswordService;

    private static readonly ONE_READ_REC_COUNT = 100;
    public static readonly VIEW_LIMIT_COUNT = 50000;

    public get nowConditionQuery(): string {
        return this.conditionQuery;
    }

    public get nowReverseOrder(): boolean {
        return this.reverseOrder;
    }

    public get nowPasswords(): PasswordViewModel[] {
        return this.passwords;
    }

    public get nowSearchedFullCount(): number {
        return this.searchedFullCount;
    }

    public get nowSearchedCondition(): FoundPasswordSearchCondition | null {
        return this.searchedCondition;
    }

    public get nowSearchedDateTime(): Moment | null {
        return this.searchedDateTime;
    }

    public get nowSearchedError(): boolean {
        return this.searchedError;
    }

    public get nowSearching(): boolean {
        return this.searching;
    }

    public get hasReadYetPasswords(): boolean {
        const passCount = this.passwords.length
        const fullCount = this.nowSearchedFullCount
        return fullCount > 0
            && passCount > 0
            && passCount < fullCount
    }

    @Mutation
    private changeConditionQuery(value: string) {
        this.conditionQuery = value;
    }

    @Mutation
    private changeReverseOrder(value: boolean) {
        this.reverseOrder = value;
    }

    @Mutation
    private changePasswords(values: PasswordViewModel[]) {
        this.passwords = values;
    }

    @Mutation
    private changeSearchedFullCount(value: number) {
        this.searchedFullCount = value;
    }

    @Mutation
    private changeSearchedCondition(value: FoundPasswordSearchCondition | null) {
        this.searchedCondition = value;
    }

    @Mutation
    private changeSearchedDateTime(value: Moment | null) {
        this.searchedDateTime = value;
    }

    @Mutation
    private changeSearchedError(value: boolean) {
        this.searchedError = value;
    }

    @Mutation
    private changeSearching(value:boolean) {
        this.searching = value;
    }

    @Action({ rawError: true })
    public async searchAsync(): Promise<void> {
        this.changeSearching(true);

        this.clearResults();

        const condition = new FoundPasswordSearchCondition(
            this.nowConditionQuery,
            0,
            FoundConditionSearchStatus.ONE_READ_REC_COUNT,
            this.nowReverseOrder
        );
        this.changeSearchedCondition(condition);
        this.changePasswords([]);

        await this.findAndAddPasswordsAsync();

        this.changeSearchedDateTime(moment());

        this.changeSearching(false);
    }

    @Action({ rawError: true })
    public async searchRemainPasswordsAsync(): Promise<void> {
        if (this.nowPasswords.length >= this.nowSearchedFullCount) return;
        await this.findAndAddPasswordsAsync();
    }

    @Action({ rawError: true })
    private async findAndAddPasswordsAsync(): Promise<void> {
        if (this.nowSearchedCondition === null) return;

        this.changeSearchedError(false);

        const service = this.service as FoundPasswordService;

        const password = this.nowPasswords;
        const condition = this.nowSearchedCondition.withOffsetOf(password.length);

        const results = await service.findOf(condition);

        if (results.isError()) {
            this.changeSearchedError(true);
            this.clearResults();
            return;
        }

        if (results.fullCount > FoundConditionSearchStatus.VIEW_LIMIT_COUNT) return;

        const addNo = password.length + 1;
        const viewModels = results.passwords
            .map((result, i) => new PasswordViewModel(i + addNo, result));

        const newPasswords = password.concat(viewModels);

        this.changePasswords(newPasswords);
        this.changeSearchedFullCount(results.fullCount);
    }

    @Action({ rawError: true })
    public clearResultsAndCondition(): void {
        this.changeConditionQuery("");
        this.changeReverseOrder(false);

        this.clearResults();
    }

    @Action({ rawError: true })
    public clearResults(): void {
        this.changePasswords([]);
        this.changeSearchedFullCount(0);
        this.changeSearchedCondition(null);
        this.changeSearchedDateTime(null);
    }


    @Action({ rawError: true })
    public setConditionQuery(value: string) {
        this.changeConditionQuery(value);
    }

    @Action({ rawError: true })
    public setReverseOrder(value: boolean) {
        this.changeReverseOrder(value);
    }
}
