import { FETCH_ORDERS, SEED_ORDERS } from "../../constants";

export const seedOrders = (count) => {
    return {
        type: SEED_ORDERS,
        orderCount: count
    }
}
