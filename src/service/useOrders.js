import { useDispatch, useSelector } from "react-redux";
import { TASK_PACKING } from "../../constants";
import { seedOrders } from "./actions";

export function useOrders() {
    const dispatch = useDispatch();
    const orders = useSelector((state) => {
        return [...state.manageOrders.orders];
    });

    const packingTasks = [];
    const deliveryTasks = [];

    useSelector((state) => {
        state.manageOrders.tasks.filter((task) => {
            if (task.type === TASK_PACKING) {
                packingTasks.push(task);
            } else {
                deliveryTasks.push(task);
            }
        });
    });

    const seedOrdersHandler = (count) => {
        dispatch(seedOrders(count));
    }

    const searchOrderHandler = (orderId) => {
        return orders.find((order) => {
            return order.orderId === orderId;
        });
    }

    const data = {
        orders: orders,
        packingTasks: packingTasks,
        deliveryTasks: deliveryTasks
    }

    const handlers = {
        seedOrdersHandler: seedOrdersHandler,
        searchOrderHandler: searchOrderHandler
    }

    return [data, handlers];
}