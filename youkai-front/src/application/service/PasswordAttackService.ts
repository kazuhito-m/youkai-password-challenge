import PasswordAttackWorker from 'worker-loader!~/application/worker/PasswordAttack.worker';
import Operand from "../worker/Operand";
import AttackPasswordRange from "~/domain/youkai/attack/AttackPasswordRange";
import PasswordAttacker from "@/store/PasswordAttacker";

export default class PasswordAttackService {
    private worker: PasswordAttackWorker | null = null;

    public execute(passwordRange: AttackPasswordRange, status: PasswordAttacker): void {
        console.log("execute() : " + passwordRange);
        status.changeExecuteState(true);

        status.setPasswordRange(
            passwordRange.formPassword.toString(),
            passwordRange.toPassword.toString()
        );

        this.worker = new PasswordAttackWorker();
        this.worker.onmessage = (event: MessageEvent) => {
            const operationType = event.data;
            console.log(`operationType(worker to coller):${operationType}`);
            if (operationType === "exit") this.cancel(status);
        };
        const operand  = new Operand('execute',
            passwordRange.formPassword.toString(),
            passwordRange.toPassword.toString(),
        );
        this.worker.postMessage(operand);
    }

    public cancel(status: PasswordAttacker) {
        if (!this.worker) return;
        this.worker.postMessage('cancel');
        this.worker?.terminate();
        this.worker = null;
        status.changeExecuteState(false);
    }
}