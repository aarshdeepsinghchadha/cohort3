function IsEven(number){
    if (number % 2 == 0){
        return 'The nmumber is even.';
    } else {
        return 'The number is odd.'
    }
}

const test1 = IsEven(3);
const test2 = IsEven(4);

console.log('The eneterd number is 3 and ans of IsEven is : ', test1);
console.log('The eneterd number is 4 and ans of IsEven is : ', test2);