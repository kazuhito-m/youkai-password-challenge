import { ResultType } from "./ResultType";

export default interface WorkerResult {
    get result(): ResultType;
}
