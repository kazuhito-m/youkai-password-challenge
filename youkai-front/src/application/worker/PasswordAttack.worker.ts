const worker: Worker = self as any;

let on = false;

worker.addEventListener('message', async event => {
    const operationType = event.data;
    console.log(`operationType(coller to worker):${operationType}`);
    if (operationType === "execute") execute();
    if (operationType === "cancel") cancel();
});

function execute() {
    console.log('execute() called.');
    on = true;
    for (let i = 0; i < 1000000000; i++) {
        if (!on) break;
        if (i % 100000000 === 0) console.log("途中経過:" + i);
    }
    on = false;
    worker.postMessage("exit");
}

function cancel() {
    console.log('cancel() called.');
    on = false;
}
