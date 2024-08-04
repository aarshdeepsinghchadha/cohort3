function canVote(age){
    if(age > 18){
        return true;
    }else return false;
}

let canIVote = canVote(17);
console.log('If my age is 17 canVote ans : ',canIVote);

let canIVote3 = canVote(18);
console.log('If my age is 18 canVote ans : ',canIVote3);

let canIVote2 = canVote(19);
console.log('If my age is 19 canVote ans : ',canIVote2);