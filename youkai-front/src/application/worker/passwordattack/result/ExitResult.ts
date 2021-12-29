import { ResultType } from "./ResultType";
import WorkerResult from "./WorkerResult";

export default class ExitResult implements WorkerResult{
    public get result(): ResultType {
        return ResultType.EXIT;
    }
}
