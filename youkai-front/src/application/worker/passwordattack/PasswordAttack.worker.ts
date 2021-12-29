import WorkerOrder from "./order/WorkerOrder";
import { OrderType } from "./order/OrderType";
import ExecuteOrder from "./order/ExecuteOrder";
import ExitResult from "./result/ExitResult";
import StartResult from "./result/StartResult";
import BeginAttackChunkResult from "./result/BeginAttackChunkResult";
import HitPasswordResult from "./result/HitPasswordResult";
import AttackPasswordRange from "@/domain/youkai/attack/AttackPasswordRange";
import CheckDigitCalculator from "@/domain/youkai/checkdigit/CheckDigitCalculator";
import Password from "@/domain/youkai/checkdigit/state/Password";
import A31F from "@/domain/youkai/checkdigit/state/A31F";
import CorrectCheckDigits from "@/domain/youkai/checkdigit/correct/CorrectCheckDigits";

const _w: Worker = self as any;

const calculator = new CheckDigitCalculator();

let on = false;
let attackedCount = 0;

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

const CHANK_DIVIDE_POS = 5;

function attack(passwordRange: AttackPasswordRange): void {
    attackedCount = 0;
    onStart();

    let chunk = new AttackPasswordRange(passwordRange.formPassword, passwordRange.formPassword);
    const attackTargetCheckDigit = calculator.calculate(CorrectCheckDigits.無敵.typicalPassowrd);

    while (!chunk.toPassword.equals(passwordRange.toPassword)) {
        if (!on) break; // FIXME whileに含めたいが、Lintさんが文句を言うので。

        chunk = chunk.nextChunk(CHANK_DIVIDE_POS, passwordRange);
        onBeginAttackChunk(chunk);

        attackChunk(chunk, attackTargetCheckDigit);

        onFinishAttackChunk(chunk);
    }
}

const INTARCEPT_INTARVAL = 10000000;

function attackChunk(chunk: AttackPasswordRange, attackTargetCheckDigit: A31F): void {
    let password = chunk.formPassword;
    while (!password.equals(chunk.toPassword)) {
        if (!on) break
        if (++attackedCount % INTARCEPT_INTARVAL === 0) onAttackInterval(attackedCount);

        const currentCheckDigit = calculator.calculate(password);

        if (attackTargetCheckDigit.equals(currentCheckDigit)) onHitPassowrd(password);

        password = password.increment();
    }
}

function cancel() {
    console.log('cancel() called.');
    on = false;
}

function onHitPassowrd(hitPassword: Password) {
    console.log("パスワード見つかった！:" + hitPassword.toString())
    const result = new HitPasswordResult(hitPassword.toString());
    _w.postMessage(result);
}

function onStart() {
    _w.postMessage(new StartResult());
}

function onAttackInterval(attackedCount: number) {
    console.log(`現在のアタック数:${attackedCount}`);
}

function onBeginAttackChunk(chunk: AttackPasswordRange) {
    const result = new BeginAttackChunkResult(chunk.formPassword.toString(), chunk.toPassword.toString());
    _w.postMessage(result);
}

function onFinishAttackChunk(chunk: AttackPasswordRange) {
    console.log("onFinishAttackChunk(" + chunk + ")");
}
