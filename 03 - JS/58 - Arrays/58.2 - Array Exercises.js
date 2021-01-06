//Exercise 1
let myArray1 = [87,90,2008]
myArray1.push('Sport Titles');
console.log(myArray1);

//Exercise 2
let myString = 'Ryu+Ken+Chun-Li+Cammy+Guile+Sakura+Sagat+Juri';
let myArray2 = myString.split('+');
let arrayLength = myArray2.length;
let lastItem = myArray2[arrayLength-1]
console.log('Array: '+myArray2);
console.log('The length of the array is'+ arrayLength);
console.log('The last item in array is '+ lastItem);

//Exercise 3
let myArray3 = [ "Ryu", "Ken", "Chun-Li", "Cammy", "Guile", "Sakura", "Sagat", "Juri" ];
myArray3.pop();
myArray3.push('Blanka','Vega');
for(let i = 0; i < myArray3.length; i++) {
  myArray3[i] = myArray3[i] + '('+i+')';
}
let myString2 = myArray3.join('-');
console.log(myString2);