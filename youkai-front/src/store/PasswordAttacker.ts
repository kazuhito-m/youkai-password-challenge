import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators';
import AttackPasswordRange from '@/domain/youkai/attack/AttackPasswordRange';

@Module({
    name: 'PasswordAttacker',
    stateFactory: true,
    namespaced: true,
})
export default class PasswordAttacker extends VuexModule {
    private executing = false;
    private nowStartPosition = "";
    private nowEndPosition = "";
    private progressText = "";
    private foundPassswords = "";

    private nickName = "";
    private fromPassword = "";

    public get nowExecuting(): boolean {
        return this.executing;
    }

    public get nowFromPassword(): string {
        return this.fromPassword;
    }

    @Mutation
    private changeExecuteState(executing: boolean) {
        this.executing = executing;
    }

    @Action({ rawError: true })
    public execute(passwordRange: AttackPasswordRange): void {
        console.log(passwordRange);
        this.changeExecuteState(true);
        new Promise((resolve, reject) => {
            try {
                if (this.attack(passwordRange)) resolve(0);
                else reject;
            } catch (e) {
                reject()
            }
        }).then(() => {
            this.changeExecuteState(false);
        }).catch(e => {
            this.changeExecuteState(false);
        });
    }

    @Action({ rawError: true })
    public cancel(): void {
        this.changeExecuteState(false);
    }

    private attack(passwordRange: AttackPasswordRange): boolean {




        return true;
    }
}