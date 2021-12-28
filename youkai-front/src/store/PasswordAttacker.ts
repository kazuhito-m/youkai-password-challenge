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
    private foundPassswords: string[] = [];

    private fromPassword = "";
    private checkedCount = 0;

    private nickName = "";

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
                this.attack(passwordRange);
                resolve(0);
            } catch (e) {
                reject(e)
            }
        }).then(() => {
            this.changeExecuteState(false);
        }).catch(e => {
            console.log(e);
            this.changeExecuteState(false);
        });
    }

    @Action({ rawError: true })
    public cancel(): void {
        this.changeExecuteState(false);
    }

    private attack(passwordRange: AttackPasswordRange): boolean {
        this.onStart(passwordRange);

        const chank = AttackPasswordRange.createChanck(passwordRange.formPassword, 6);

        // while (this.executing) {
        // }

        return true;
    }

    private onStart(passwordRange: AttackPasswordRange): void {
        this.fromPassword = passwordRange.formPassword.toString();
        this.progressText = "";
        this.foundPassswords = [];
        this.checkedCount = 0;
    }
}