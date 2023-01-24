import { combineReducers } from "redux";
import { PACKING_COMPLETE, SEED_ORDERS, TASK_DELIVERY } from "../../constants";
import { faker } from "@faker-js/faker";
import { TASK_PACKING, TASK_STATUS_NOT_STARTED } from "../../constants";
import Task from "../models/Task";

const initialState = {
    tasks: [],
    orders: []
}

export default function manageOrders(state = initialState, action) {
    switch (action.type) {
        case SEED_ORDERS: {
            const orders = createRandomOrders(action.orderCount);
            const tasks = createTasks(orders);
            return {
                orders: orders,
                tasks: tasks
            }
        }
        case PACKING_COMPLETE: {
            const order = state.orders.find((order) => { 
                return order.orderId === action.task.orderId;
            });
            
            const deliveryTask = new Task(order.codes.DL_CODE, TASK_DELIVERY, TASK_STATUS_NOT_STARTED, order.orderId);
            return {
                orders: state.orders,
                tasks: [...state.tasks, deliveryTask]
            }
        }
        default: {
            return initialState;
        }
    }
}

export const rootReducer = combineReducers({
    manageOrders
});

export function createTasks(orders) {
    const tasks = [];
    for (let i = 0; i < orders.length; i++) {
        const newTask = new Task(orders[i].codes.PCK_CODE, TASK_PACKING, TASK_STATUS_NOT_STARTED, orders[i].orderId);
        tasks.push(newTask);
    }
    return tasks;
}
  

export function createRandomOrders(count) {
    console.log("Generating orders");

    const orders = [];

    for (let i = 0; i < count; i++) {
        const products = createRandomProducts(Math.floor(Math.random() * 4) + 1);
        const user = createRandomUser();
        const taxInfo = createTaxInfo();
        const codes = generateCodes();

        orders.push({
            orderId: faker.datatype.uuid(),
            products: products,
            user: user,
            taxInfo: taxInfo,
            codes: codes
        });
    }

    return orders;
}

function createRandomUser() {
    return {
        userId: faker.datatype.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        phone: faker.phone,
        address: faker.address.buildingNumber() + ", " + faker.address.city() + ", " + faker.address.county()
    }
}

function createRandomProducts(productCount) {
    let products = [];

    for (let i = 0; i < productCount; i++) {
        products.push({
            name: faker.commerce.product(),
            productId: faker.datatype.uuid(),
            price: faker.commerce.price(),
            image: faker.image.abstract()
        });
    }

    return products;
}

function createTaxInfo() {
    return {
        tax: 15,
        delivery: 2
    }
}

function generateCodes() {
    const sampleCodes = [2341, 1345, 1242, 1425];
    const index = Math.floor(Math.random() * 4);
    return {
        IN_CODE: "IN_CODE_" + sampleCodes[index],
        PCK_CODE: "PCK_" + sampleCodes[index],
        DL_CODE: "DL_" + sampleCodes[index]
    }
}