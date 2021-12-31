import { ResultType } from "./ResultType";
import WorkerResult from "./WorkerResult";

export default class AttackIntervalResult implements WorkerResult {
    constructor(
        public readonly attackedCount: number,
    ) { }

    public result = ResultType.ATTACK_INTERVAL;
}
