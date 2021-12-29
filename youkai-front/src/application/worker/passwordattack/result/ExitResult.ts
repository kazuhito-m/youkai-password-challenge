import { ResultType } from "./ResultType";
import WorkerResult from "./WorkerResult";

export default class ExitResult implements WorkerResult{
    public result = ResultType.EXIT;
}
