import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators'
import AttackPasswordRange from '@/domain/youkai/attack/AttackPasswordRange';

@Module({
    name: 'PasswordAttacker',
    stateFactory: true,
    namespaced: true,
})
export default class PasswordAttacker extends VuexModule {
    private executing = false;

    public get nowExecuting(): boolean {
        return this.executing;
    }

    @Mutation
    private changeExecuteState(executing: boolean) {
        this.executing = executing;
    }

    @Action({ rawError: true })
    public execute(passwordRange: AttackPasswordRange): void {
        console.log(passwordRange);
        this.changeExecuteState(true);
    }

    @Action({ rawError: true })
    public cancel(): void {
        this.changeExecuteState(false);
    }
}