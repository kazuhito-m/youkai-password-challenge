import { ResultType } from "./ResultType";
import WorkerResult from "./WorkerResult";

export default class BeginAttackChunkResult implements WorkerResult {
    constructor(
        public readonly startPosition: string,
        public readonly endPosition: string
    ) { }

    public result = ResultType.BEGIN_ATTACK_CHUNK;
}
