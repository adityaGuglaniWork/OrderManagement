export default class Task {
    constructor(taskId, type, status, orderId) {
        this.taskId = taskId;
        this.type = type;
        this.status = status;
        this.orderId = orderId;
        this.workerId = null;
    }
}