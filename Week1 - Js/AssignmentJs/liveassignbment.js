function filterAdultMaleUsers(users) {
    return users.filter(user => user.age > 18 && user.gender === "male");
}


const users = [
    { name: "Jay", age: 17, gender: "male" },
    { name: "Ram", age: 18, gender: "male" },
    { name: "Harkirat", age: 22, gender: "male" },
    { name: "Kirat", age: 21, gender: "female" }
];

const adultMaleUsers = filterAdultMaleUsers(users);

console.log(adultMaleUsers);