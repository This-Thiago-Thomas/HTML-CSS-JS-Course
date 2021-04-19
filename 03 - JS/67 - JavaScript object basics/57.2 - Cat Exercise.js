let cat = {
  name : 'Bertie',
  breed : 'Cymric',
  color : 'white',
  greeting: function() {
    console.log('Meow!');
  }
}
  
let catName = cat.name;
cat.greeting();
cat.color = 'black';

console.log(`The cat's name is ${ catName }.`);
console.log(`The cat's color is ${ cat.color }.`)