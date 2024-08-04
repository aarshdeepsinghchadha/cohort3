function greetUser(user){
    const {name, gender, age} = user;
    console.log(`Hi ${gender} ${name}, you age is ${age}.`);
}

const user = {
    name: "Aarshdeep",
    gender: "Mr",
    age: 23
}


greetUser(user);