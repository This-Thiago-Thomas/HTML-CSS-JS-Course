function bigFunction() {
    let val = 87;

    subFunction1(val);
    subFunction2(val);
    subFunction3(val);
    subFunction3(val);
    subFunction2(val);
    subFunction1(val);
}

function subFunction1(value) {
    console.log("sub function 1 and the value is: "+value);
}

function subFunction2(value) {
    console.log("sub function 2 and the value is: "+value);
}

function subFunction3(value) {
    console.log("sub function 3 and the value is: "+value)
}

bigFunction();