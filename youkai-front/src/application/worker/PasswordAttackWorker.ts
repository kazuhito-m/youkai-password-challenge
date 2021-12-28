const ctx: Worker = self as any;

// Post data to parent thread
ctx.postMessage({ foo: "foo" });

// Respond to message from parent thread
ctx.addEventListener("message", (event) => {
    console.log(event);
    console.log("ここで何が来ているのかを見る。");
    // event.data.test = "日本語が入ったらどうなるのっと。"
});

// export default class WebpackWorker extends Worker {
//     constructor() {
//         super('')
//     }
// }

export default ctx;