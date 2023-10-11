let expression = {
    //a: num,
    //op: str,
    //b: num,
}

function operate(expression) {
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

