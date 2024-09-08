//map, filter, arrow funs
// given an array, give me back a new array in which every value is multiplied by 2
// [1,2,3,4,5]
// [2,4,6,8,10]


// 1 way
const input = [1,2,3,4,5];
// const newArray = [];

// for(let i = 0; i <input.length; i++){
//     newArray.push(input[i] * 2);
// }

// console.log(newArray);

// 2nd way with map

function transform(i) {
    return i * 2;
}

const ans = input.map(transform);
console.log(ans);

// filter

// given a input array, give me back all the even numbers from it

const arr = [1,2,3,4,5];
const ansFilter = arr.filter(x=>x%2 === 0);
console.log(ansFilter);  


// Assignment : Create a map fn that takes an array and a transform fn as input and returns the transformed array as output



function squareMap(arr, transformFn) {
    const result = [];  
    for (let i = 0; i < arr.length; i ++) {
        result.push(transformFn(arr[i]));
    }
    return result;
}
const number = [1,2,3,4,5];
const square = (num) =>  num * num;

const transformedArray = squareMap(number,square);

console.log(transformedArray);
