import PasswordAttackWorker from 'worker-loader!~/application/worker/passwordattack/PasswordAttack.worker';
import Operand from "@/application/worker/passwordattack/Operand";
import AttackPasswordRange from "~/domain/youkai/attack/AttackPasswordRange";
import PasswordAttacker from "@/store/PasswordAttacker";
import ExecuteOrder from '../worker/passwordattack/order/ExecuteOrder';
import CancelOrder from '../worker/passwordattack/order/CancelOrder';

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
        
        const order  = new ExecuteOrder(
            passwordRange.formPassword.toString(),
            passwordRange.toPassword.toString(),
        );
        this.worker.postMessage(order);
    }

    public cancel(status: PasswordAttacker) {
        if (!this.worker) return;
        this.worker.postMessage(new CancelOrder());
        this.worker?.terminate();
        this.worker = null;
        status.changeExecuteState(false);
    }
}