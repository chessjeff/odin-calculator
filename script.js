let expression = {
    a: [],
    op: '',
    b: [],
}

//each number listens and adds itself via writeNumbers
const nums = Array.from(document.getElementsByClassName('num'));
nums.forEach((num) => {
    num.addEventListener('click', () => writeNumbers(num.id));
});


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
const operators = Array.from(document.getElementsByClassName('operator'));
operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        if (expression.a && !expression.op) {
            expression.op = operator.textContent;
        };
    })
})

//pressing equals calls operate()
const equals = Array.from(document.getElementsByClassName('equals'));
equals.forEach((button) => {
    button.addEventListener('click', () => {
        execute();
    })
});

function execute() {
    a = expression.a.join(expression.a, '');
    b = expression.b.join(expression.b, '');
    const result = chooseOperator(a, b);
    console.log(result);
}

function chooseOperator(a, b) {
    switch (expression.op) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
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
