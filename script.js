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

//can only take one op and only after a is true
const operators = Array.from(document.getElementsByClassName('operator'));
operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        if (expression.a.length > 0 && !expression.op) {
            expression.op = operator.textContent;
        };
    })
})

//pressing equals executes expression
const equals = Array.from(document.getElementsByClassName('equals'));
equals.forEach((button) => {
    button.addEventListener('click', () => {
        if (expression.op && expression.b.length > 0) {
            execute();
        }
    })
});

//creates arrays to be converted to string by execute function
function writeNumbers(num) {
    //writes a first and waits for operator selection to write b
    if (!expression.op) {
        expression.a.push(num);
    } else {
        expression.b.push(num); 
    }

}

function execute() {
    a = parseInt(expression.a.join(expression.a, ''));
    b = parseInt(expression.b.join(expression.b, ''));
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
