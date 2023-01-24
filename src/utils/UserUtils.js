const { default: User } = require("../models/User");
import { faker } from "@faker-js/faker";

const users = new Array();
users.push(new User("James", "Hetfield", "999999", faker.datatype.uuid()));
users.push(new User("Lars", "Ulrich", "000000", faker.datatype.uuid()));
users.push(new User("Robert", "Hamett", "121212", faker.datatype.uuid()));

export default function getLoggedInUser(pin) {
    return users.find((user) => {
        return user.pin === pin;
    });
}