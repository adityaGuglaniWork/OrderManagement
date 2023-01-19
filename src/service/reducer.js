import { faker } from "@faker-js/faker";
import { act } from "react-test-renderer";
import { combineReducers } from "redux";
import { SEED_ORDERS, TASK_DELIVERY, TASK_PACKING, TASK_STATUS_NOT_STARTED } from "../../constants";
import { Status, Task } from "../utils/TaskUtils";

const initialState = {
    tasks: [],
    orders: []
}

export default function manageOrders(state = initialState, action) {
    switch (action.type) {
        case SEED_ORDERS: {
            const orders = createRandomOrders(action.orderCount);
            const tasks = createTasks(orders);

            console.log(tasks);
            return {
                orders: orders,
                tasks: tasks
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

function createTasks(orders) {
    const tasks = [];
    for (let i = 0; i < orders.length; i++) {
        const productStatusMapping = [];

        for (let j = 0; j < orders[i].products.length; j++) {
            productStatusMapping.push({
                productId: orders[i].products[j].productId,
                status: false
            });
        }
        tasks.push({
            type: TASK_DELIVERY,
            status: TASK_STATUS_NOT_STARTED,
            workerId: null,
            orderId: orders[i].orderId,
            productStatusMapping: productStatusMapping
        });
    }
    return tasks;
}
  

function createRandomOrders(count) {
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

    return orders
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
        IN_CODE: sampleCodes[index],
        PCK_CODE: sampleCodes[index],
        DL_CODE: sampleCodes[index]
    }
}