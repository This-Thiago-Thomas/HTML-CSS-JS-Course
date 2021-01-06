let total = 0;
let products = ['Underpants:6.99',
                'Socks:5.99',
                'T-shirt:14.99',
                'Trousers:31.99',
                'Shoes:23.99'];

for(let i = 0; i < products.length; i++) {
    let arrPrdt = products[i].split(':');
    let name = arrPrdt[0];
    let value = Number(arrPrdt[1]);
    total+=value;
    console.log(name+'-- $'+value);
}
console.log('Total: $'+total.toFixed(2));
