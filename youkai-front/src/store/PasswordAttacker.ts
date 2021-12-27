import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators'

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
    public execute(): void {
        this.changeExecuteState(true);
    }

    @Action({ rawError: true })
    public cancel(): void {
        this.changeExecuteState(false);
    }
}