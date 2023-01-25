import { useDispatch, useSelector } from "react-redux";
import { TASK_PACKING, TASK_STATUS_COMPLETED } from "../../constants";
import { seedOrders, markPackingTaskComplete } from "./actions";

export function useTaskManager() {
    const dispatch = useDispatch();
    const orders = useSelector((state) => {
        return [...state.manageOrders.orders];
    });

    const packingTasks = [];
    const deliveryTasks = [];

    useSelector((state) => {
        state.manageOrders.tasks
            .filter((task) => {
                return task.status != TASK_STATUS_COMPLETED
            }) 
            .filter((task) => {
                if (task.type === TASK_PACKING) {
                    packingTasks.push(task);
                } else {
                    deliveryTasks.push(task);
                }
        });
    });

    function seedOrdersHandler(count) {
        dispatch(seedOrders(count));
    }

    const packingTaskCompleteHander = (task) => {
        dispatch(markPackingTaskComplete(task));
    } 

    const searchOrderHandler = (orderId) => {
        return orders.find((order) => {
            return order.orderId === orderId;
        });
    }

    const fetchDetailedTask = (taskId, type) => {
        const tasks = (type === TASK_PACKING) ? packingTasks : deliveryTasks;
        const task = tasks.find((task) => {
            return task.taskId === taskId;
        });

        const order = (task) ? searchOrderHandler(task.orderId) : null;
        return [task, order];
    }

    const doesTaskExist = (taskId, type) => {
        const tasks = (type === TASK_PACKING) ? packingTasks : deliveryTasks;
        return tasks.some((task) => task.taskId === taskId );
    }

    const data = {
        orders: orders,
        packingTasks: packingTasks,
        deliveryTasks: deliveryTasks
    }

    const handlers = {
        seedOrdersHandler: seedOrdersHandler,
        searchOrderHandler: searchOrderHandler,
        fetchDetailedTask: fetchDetailedTask,
        packingTaskCompleteHander: packingTaskCompleteHander,
        doesTaskExist: doesTaskExist
    }

    return [data, handlers];
}