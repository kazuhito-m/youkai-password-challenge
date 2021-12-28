import AttackPasswordRange from "~/domain/youkai/attack/AttackPasswordRange";
import PasswordAttacker from "@/store/PasswordAttacker";
import PasswordAttackWorker from 'worker-loader!~/application/worker/PasswordAttack.worker';

export default class PasswordAttackService {
    public execute(passwordRange: AttackPasswordRange, status: PasswordAttacker): void {
        console.log("execute() : " + passwordRange);
        status.changeExecuteState(true);

        const worker = new PasswordAttackWorker();
        worker.addEventListener('message', (event: MessageEvent) => {
            const operationType = event.data;
            console.log(`operationType(worker to coller):${operationType}`);
            if (operationType === "exit") {
                worker.terminate();
                status.changeExecuteState(false);
            }
        });
        worker.postMessage('execute');
    }
}