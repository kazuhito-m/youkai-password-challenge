const worker: Worker = self as any;

let on = false;

worker.addEventListener('message', async event => {
    const operationType = event.data;
    console.log(`operationType:${operationType}`)
    if (operationType === "execute") execute();
    if (operationType === "cancel") cancel();
});

function execute() {
    console.log('execute() called.');
    on = true;
    for (let i = 0; i < 10000000000; i++) {
        if (!on) break;
        if (i % 1000000000 === 0) console.log("途中経過:" + i);
    }
    on = false;
}

function cancel() {
    console.log('cancel() called.');
    on = false;
}