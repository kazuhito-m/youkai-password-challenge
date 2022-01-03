import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators';
import FoundPasswordSearchCondition from '~/domain/youkai/foundpassword/FoundPasswordSearchCondition';
import PasswordViewModel from './PasswordViewModel';

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

    public get nowConditionQuery(): string {
        return this.conditionQuery;
    }

    public get nowReverceOrder(): boolean {
        return this.reverceOrder;
    }

    @Mutation
    private changeConditionQuery(value: string) {
        this.conditionQuery = value;
    }

    @Mutation
    private changeReverceOrder(value: boolean) {
        this.reverceOrder = value;
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
