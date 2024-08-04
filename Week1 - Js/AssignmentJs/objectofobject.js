function processUser(user) {
    const { name, age, address: { city } } = user;
    console.log(`User's Name: ${name}`);
    console.log(`User's Age: ${age}`);
    console.log(`User's City: ${city}`);
}

const user = {
    name: "Harkirat",
    age: 19,
    address: {
        city: "Delhi",
        country: "India",
        address: "1122 DLF"
    }
};

processUser(user);
