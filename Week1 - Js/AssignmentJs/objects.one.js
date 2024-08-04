function greetUser(user){
    const {name, age} = user;
    console.log(`Hello, ${name}! You are ${age} years old.`);
}

const user = {
    name: "Aarsh",
    age: 23
}

greetUser(user);