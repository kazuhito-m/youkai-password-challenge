import { OrderType } from "./order/OrderType";
import WorkerOrder from "./order/WorkerOrder";
import ExecuteOrder from "./order/ExecuteOrder";
import ExitResult from "./result/ExitResult";
import StartResult from "./result/StartResult";
import BeginAttackChunkResult from "./result/BeginAttackChunkResult";
import HitPasswordResult from "./result/HitPasswordResult";
import AttackIntervalResult from "./result/AttackIntervalResult";
import AttackPasswordRange from "@/domain/youkai/attack/AttackPasswordRange";
import CheckDigitCalculator from "@/domain/youkai/checkdigit/CheckDigitCalculator";
import Password from "@/domain/youkai/checkdigit/state/Password";
import A31F from "@/domain/youkai/checkdigit/state/A31F";
import CorrectCheckDigits from "@/domain/youkai/checkdigit/correct/CorrectCheckDigits";
import CodeToCharacterConverter from "~/domain/youkai/checkdigit/converter/CodeToCharacterConverter";

const _w: Worker = self as any;

const calculator = new CheckDigitCalculator();

const converter = new CodeToCharacterConverter();

let on = false;
let attackedCount = 0;

_w.onmessage = (event) => {
    const order = event.data as WorkerOrder;
    console.log(`operationType(coller to worker):${order.order}`);
    if (order.order === OrderType.EXECUTE) execute(order as ExecuteOrder);
    if (order.order === OrderType.CANCEL) cancel();
};

function execute(order: ExecuteOrder): void {
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

// 微調整。30秒くらいになるように。
const INTARCEPT_INTARVAL = converter.validCharacters().length ** (CHANK_DIVIDE_POS - 1) * 3;

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
    const result = new HitPasswordResult(hitPassword.toString());
    _w.postMessage(result);
}

function onStart() {
    _w.postMessage(new StartResult());
}

function onAttackInterval(attackedCount: number) {
    _w.postMessage(new AttackIntervalResult(attackedCount))
}

function onBeginAttackChunk(chunk: AttackPasswordRange) {
    const result = new BeginAttackChunkResult(chunk.formPassword.toString(), chunk.toPassword.toString());
    _w.postMessage(result);
}

function onFinishAttackChunk(chunk: AttackPasswordRange) {
    console.log("onFinishAttackChunk(" + chunk + ")");
}
