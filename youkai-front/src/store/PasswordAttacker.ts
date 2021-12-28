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
    private attackedCount = 0;

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

    @Mutation
    private changeFromPassword(fromPassword: string) {
        this.fromPassword = fromPassword;
    }

    @Mutation
    private changeProgressText(progressText: string) {
        this.progressText = progressText;
    }

    @Mutation
    private changeFoundPassswords(foundPassswords: string[]) {
        this.foundPassswords = foundPassswords;
    }

    @Mutation
    private changeAttackedCount(attackedCount: number): void {
        this.attackedCount = attackedCount;
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

    private static readonly CHANK_DIVIDE_POS = 6;

    private attack(passwordRange: AttackPasswordRange): void {
        this.onStart(passwordRange);

        let chunk = AttackPasswordRange.createChunk(passwordRange.formPassword, PasswordAttacker.CHANK_DIVIDE_POS);

        while (this.executing) {
            this.attackChunk(chunk);


        }


        this.executing = false;
    }

    private attackChunk(chunk: AttackPasswordRange): void {
        console.log(chunk);
    }

    private onStart(passwordRange: AttackPasswordRange): void {
        this.changeFromPassword(passwordRange.formPassword.toString());
        this.changeProgressText("");
        this.changeFoundPassswords([]);
        this.changeAttackedCount(0);
    }
}