const ctx: Worker = self as any;

ctx.addEventListener('message', async event => {
    console.log('Workerだよ！受信したよ →', event.data);

    for (let i = 0; i < 10000000000; i++) {
        if (i % 1000000000 === 0) console.log("途中経過:" + i)
    }    

    ctx.postMessage('Workerからのデータです');
});
