import WorkerOrder from "./order/WorkerOrder";
import { OrderType } from "./order/OrderType";
import ExecuteOrder from "./order/ExecuteOrder";
import ExitResult from "./result/ExitResult";
import AttackPasswordRange from "@/domain/youkai/attack/AttackPasswordRange";

const _w: Worker = self as any;

let on = false;

_w.onmessage = (event) => {
    const order = event.data as WorkerOrder;
    console.log(`operationType(coller to worker):${order.order}`);
    if (order.order === OrderType.EXECUTE) execute(order as ExecuteOrder);
    if (order.order === OrderType.CANCEL) cancel();
};

function execute(order: ExecuteOrder): void {
    console.log(order);
    on = true;

    const passwordRange = AttackPasswordRange.of(order.fromPasswordText, order.toPasswordText);

    attack(passwordRange);

    on = false;
    _w.postMessage(new ExitResult());
}

const CHANK_DIVIDE_POS = 6;

function attack(passwordRange: AttackPasswordRange): void {
    // status.onStart(passwordRange);

    let chunk = new AttackPasswordRange(passwordRange.formPassword, passwordRange.formPassword);

    while (chunk.toPassword.equals(passwordRange.toPassword)) {
        if (!on) break; // FIXME whileに含めたいが、Lintさんが文句を言うので。

        chunk = chunk.nextChunk(CHANK_DIVIDE_POS, passwordRange);
        // status.onBeginAttackChunk(chunk);

        attackChunk(chunk);

        // status.onFinishAttackChunk(chunk);
    }

    // status.changeExecuteState(false);
}

function attackChunk(chunk: AttackPasswordRange): void {
    console.log("attackChunk()に来ている。")
    console.log(chunk.toString());
}

function cancel() {
    console.log('cancel() called.');
    on = false;
}
