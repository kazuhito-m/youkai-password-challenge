import { OrderType } from "./OrderType";
import WorkerOrder from "./WorkerOrder";

export default class CancelOrder implements WorkerOrder{
    public get order(): OrderType {
        return OrderType.EXECUTE;
    }
}
