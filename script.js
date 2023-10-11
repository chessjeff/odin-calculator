let expression = {
    a: [],
    op: '',
    b: [],
}

//each number listens and adds itself via writeNumbers
const nums = Array.from(document.getElementsByClassName('num'));
nums.forEach((num) => {
    num.addEventListener('click', () => writeNumbers(num.id))
});

//when equals is pushed insert: expression.a = expression.a.join(expression.a, '');
// and expression.b = expression.b.join(b, '');

//creates array to be converted to string by operating function
function writeNumbers(num) {
    if (!expression.op) {
        expression.a.push(num);
    } else {
        expression.b.push(num); 
    }
}

//when op is added, writeNumbers adds to b
//can only take one op and only after a is true
const operators = Array.from(document.getElementsByClassName('operator'))
operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        if (expression.a && !expression.op) {
            expression.op = operator.textContent
        };
    })
})

//pressing equals calls operate()


function chooseOperator() {
    switch (expression.op) {
        case '+':
            add(expression.a, expression.b);
            break;
        case '-':
            subtract(expression.a, expression.b);
            break;
        case '*':
            multiply(expression.a, expression.b);
            break;
        case '/':
            divide(expression.a, expression.b);
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    return a / b;
}
