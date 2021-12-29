import Operand from "./Operand";
import AttackPasswordRange from "@/domain/youkai/attack/AttackPasswordRange";

const _w: Worker = self as any;

let on = false;

// _w.addEventListener('message', event => {
//     const finctionType = event.data;
//     console.log(`operationType(coller to worker):${finctionType}`);
//     if (finctionType === "execute") execute();
//     if (finctionType === "cancel") cancel();
// });

_w.onmessage = (event) => {
    const operand = event.data as Operand;
    // const status = event.data[1] as AttackPasswordRange;
    console.log(`operationType(coller to worker):${operand.finctionType}`);
    if (operand.finctionType === "execute") execute(operand);
    if (operand.finctionType === "cancel") cancel();
};


function execute(operand: Operand): void {
    console.log(operand);
    on = true;

    const passwordRange = AttackPasswordRange.of(operand.fromPasswordText, operand.toPasswordText);

    attack(passwordRange);

    on = false;
    _w.postMessage("exit");
}

const CHANK_DIVIDE_POS = 6;

function attack(passwordRange: AttackPasswordRange): void {
    // status.onStart(passwordRange);

    let chunk = new AttackPasswordRange(passwordRange.formPassword, passwordRange.formPassword);

    while (chunk.toPassword.equals(passwordRange.toPassword)) {
        if (!on) break;　// FIXME whileに含めたいが、Lintさんが文句を言うので。

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


// function execute(status: PasswordAttacker) {
//     console.log('execute() called.');
//     on = true;
//     for (let i = 0; i < 10000000000; i++) {
//         if (!on) break;
//         if (i % 1000000000 === 0) console.log("途中経過:" + i);
//     }
//     on = false;
//     _w.postMessage("exit");
// }

function cancel() {
    console.log('cancel() called.');
    on = false;
}
