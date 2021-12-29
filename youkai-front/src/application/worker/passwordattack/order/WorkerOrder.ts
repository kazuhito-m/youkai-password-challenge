import { OrderType } from "./OrderType";

export default interface WorkerOrder {
    get order(): OrderType;
}
