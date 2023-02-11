import { TaskStatus } from "./taskStatus";

export type TaskType = {
    id: number;
    title: string;
    status: TaskStatus;
}