import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators';
import FoundPasswordService from '@/application/service/FoundPasswordService';
import FoundPasswordSearchCondition from '~/domain/youkai/foundpassword/FoundPasswordSearchCondition';
import PasswordViewModel from './PasswordViewModel';
import FoundPasswords from '~/domain/youkai/foundpassword/FoundPasswords';

@Module({
    name: 'FoundConditionSearchStatus',
    stateFactory: true,
    namespaced: true,
})
export default class FoundConditionSearchStatus extends VuexModule {
    private conditionQuery: string = "";
    private reverceOrder = false;

    private searchedCondition: FoundPasswordSearchCondition | null = null;
    private searchedFullCount: number = 0;

    private passwords: PasswordViewModel[] = [];

    public service?: FoundPasswordService;

    private static readonly ONE_READ_REC_COUNT = 100;

    public get nowConditionQuery(): string {
        return this.conditionQuery;
    }

    public get nowReverceOrder(): boolean {
        return this.reverceOrder;
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

    @Mutation
    private changeConditionQuery(value: string) {
        this.conditionQuery = value;
    }

    @Mutation
    private changeReverceOrder(value: boolean) {
        this.reverceOrder = value;
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

    @Action({ rawError: true })
    public search(): void {
        const service = this.service as FoundPasswordService;

        const condition = new FoundPasswordSearchCondition(
            this.nowConditionQuery,
            0,
            FoundConditionSearchStatus.ONE_READ_REC_COUNT,
            this.nowReverceOrder
        );

        const results = service.findOf(condition);

        const addNo = 1;
        const viewModels = results.passwords
            .map((result, i) => new PasswordViewModel(i + addNo, result));

        this.changePasswords(viewModels);
        this.changeSearchedFullCount(results.fullCount);
        this.changeSearchedCondition(condition);
    }

    @Action({ rawError: true })
    public clearResultsAndCondition(): void {
        this.changeConditionQuery("");
        this.changeReverceOrder(0);

        this.changePasswords([]);
        this.changeSearchedFullCount(0);
        this.changeSearchedCondition(null);
    }

    @Action({ rawError: true })
    public setConditionQuery(value: string) {
        this.changeConditionQuery(value);
    }

    @Action({ rawError: true })
    public setReverceOrder(value: boolean) {
        this.changeReverceOrder(value);
    }
}
