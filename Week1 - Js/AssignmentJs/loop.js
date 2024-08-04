function findSum(number){
    let sum = 0;
    for(let i= 1; i < number; i++){
        sum += i;
    }
    return sum;
}

const number = 10;
const result = findSum(number);
console.log(`The sum from 1 to ${number-1} is: ${result}`);