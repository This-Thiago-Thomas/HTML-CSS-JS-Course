// Add your code here
let myName;
myName = "Thiago";
let myAge;
myAge = 2020;

// Don't edit the code below here!

section.innerHTML = ' ';
let para1 = document.createElement('p');
para1.textContent = myName;
let para2 = document.createElement('p');
para2.textContent = myAge;
section.appendChild(para1);