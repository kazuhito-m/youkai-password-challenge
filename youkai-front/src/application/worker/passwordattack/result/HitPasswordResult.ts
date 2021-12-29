import { ResultType } from "./ResultType";
import WorkerResult from "./WorkerResult";

export default class HitPasswordResult implements WorkerResult {
    constructor(public readonly hitPassword: string) { }

    public result = ResultType.HIT_PASSWORD;
}
