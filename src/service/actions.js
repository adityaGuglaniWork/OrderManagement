import { LOGIN_USER, PACKING_COMPLETE, SEED_ORDERS } from "../../constants";

export const seedOrders = (count) => {
    return {
        type: SEED_ORDERS,
        orderCount: count
    }
}

export const markPackingTaskComplete = (task) => {
    return {
        type: PACKING_COMPLETE,
        task: task
    }
}