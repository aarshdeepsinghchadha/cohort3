function filterAdultUsers(users) {
    return users.filter(user => user.age > 18);
}

const users = [
    { name: "Jay", age: 17 },
    { name: "Ram", age: 22 },
    { name: "Harkirat", age: 18 },
    { name: "Kirat", age: 21 }
];

const adultUsers = filterAdultUsers(users);

console.log(adultUsers); 