let number = 10;

console.log("The Odd numbers are: ")
for(let i = 0; i <= number; i++) {
    if(i % 2 !== 0) {
        continue;
    }
    console.log(i);
}