import { Module, VuexModule } from 'vuex-module-decorators';
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

}
