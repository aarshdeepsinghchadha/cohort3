function greetUser(user) {
    const { name, gender, age } = user;
    console.log(`Hi ${gender} ${name}, your age is ${age}.`);
    
    if (age >= 18) {
        console.log("You are legal to vote.");
    } else {
        console.log("You are not legal to vote.");
    }
}


const user = {
    name: "Aarshdeep",
    gender: "Mr",
    age: 23
}

greetUser(user);
