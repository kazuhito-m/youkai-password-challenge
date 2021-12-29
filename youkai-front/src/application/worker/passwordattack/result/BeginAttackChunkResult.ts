import { ResultType } from "./ResultType";
import WorkerResult from "./WorkerResult";

export default class BeginAttackChunkResult implements WorkerResult {
    constructor(
        startPosition: string,
        endPassword: string
    ) { }
    public result = ResultType.BEGIN_ATTACK_CHUNK;
}
