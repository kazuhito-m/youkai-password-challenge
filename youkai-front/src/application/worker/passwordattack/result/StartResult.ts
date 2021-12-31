import { ResultType } from "./ResultType";
import WorkerResult from "./WorkerResult";

export default class StartResult implements WorkerResult {
    public result = ResultType.START;
}
