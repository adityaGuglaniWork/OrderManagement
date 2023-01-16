const { default: User } = require("../models/User");

const users = new Array();
users.push(new User("James", "Hetfield", "999999"));
users.push(new User("Lars", "Ulrich", "000000"));
users.push(new User("Robert", "Hamett", "121212"));

export default function getLoggedInUser(pin) {
    return users.find((user) => {
        return user.pin === pin;
    });
}