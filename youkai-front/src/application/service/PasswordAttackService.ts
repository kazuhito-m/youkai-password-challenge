import PasswordAttackWorker from 'worker-loader!~/application/worker/passwordattack/PasswordAttack.worker';
import BeginAttackChunkResult from '../worker/passwordattack/result/BeginAttackChunkResult';
import AttackPasswordRange from "@/domain/youkai/attack/AttackPasswordRange";
import Password from '@/domain/youkai/checkdigit/state/Password';
import PasswordAttackStatus from "@/store/PasswordAttackStatus";
import ExecuteOrder from '@/application/worker/passwordattack/order/ExecuteOrder';
import CancelOrder from '@/application/worker/passwordattack/order/CancelOrder';
import WorkerResult from '@/application/worker/passwordattack/result/WorkerResult';
import HitPasswordResult from '@/application/worker/passwordattack/result/HitPasswordResult';
import { ResultType } from '@/application/worker/passwordattack/result/ResultType';

export default class PasswordAttackService {
    private worker: PasswordAttackWorker | null = null;

    public execute(passwordRange: AttackPasswordRange, status: PasswordAttackStatus): void {
        console.log("execute() : " + passwordRange);
        status.changeExecuteState(true);

        this.worker = new PasswordAttackWorker();
        this.worker.onmessage = (event: MessageEvent) => {
            const result = event.data as WorkerResult;
            console.log(`operationType(worker to coller):${result.result}`);
            const resType = result.result;
            if (resType === ResultType.START) this.onStart(status);
            if (resType === ResultType.EXIT) this.onExit(status);
            if (resType === ResultType.BEGIN_ATTACK_CHUNK) this.onBeginAttackChunk(result as BeginAttackChunkResult, status);
            if (resType === ResultType.HIT_PASSWORD) this.onHitPassword(result as HitPasswordResult, status);
        };

        const order = new ExecuteOrder(
            passwordRange.formPassword.toString(),
            passwordRange.toPassword.toString(),
        );
        this.worker.postMessage(order);
    }

    public cancel(status: PasswordAttackStatus) {
        this.onExit(status);
    }

    private onExit(status: PasswordAttackStatus) {
        if (!this.worker) return;
        this.worker.postMessage(new CancelOrder());
        this.worker?.terminate();
        this.worker = null;
        status.changeExecuteState(false);
    }

    private onStart(status: PasswordAttackStatus) {
        status.onStart();
    }

    private onBeginAttackChunk(result: BeginAttackChunkResult, status: PasswordAttackStatus) {
        const range = AttackPasswordRange.of(result.startPosition, result.endPosition);
        status.onBeginAttackChunk(range);
    }

    private onHitPassword(result: HitPasswordResult, status: PasswordAttackStatus) {
        const password = Password.withText(result.hitPassword);
        status.onHitPassword(password);
    }
}
