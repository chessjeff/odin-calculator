let expression = {
    a: [],
    op: '',
    b: [],
    aChosen: false,
    bChosen: false,
    opAgain: false,
}

function clearExpression() {
    expression = {
        a: [],
        op: '',
        b: [],
        aChosen: false,
        bChosen: false,
        opAgain: false,
    }
    decimal.disabled = false;
}

const display = document.querySelector('.display');
const decimal = document.getElementById('.');

//logic for writing numbers
const nums = Array.from(document.getElementsByClassName('num'));
nums.forEach((num) => {
    num.addEventListener('click', () => {
        writeExpression(num.id);
    });
});

//can only take one op and only after a is true
const operators = Array.from(document.getElementsByClassName('operator'));
operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        // check if first op or further op
        expression.aChosen = true;
        if (expression.bChosen) {
            execute();
            writeExpression(operator.id);
        } else {
            writeExpression(operator.id);
        }
    })
})

//pressing equals executes expression only after op and b are chosen
const equals = Array.from(document.getElementsByClassName('equals'));
equals.forEach((button) => {
    button.addEventListener('click', () => {
        if (expression.op && expression.bChosen) {
            execute();
        }
    })
});

//clears display div and expression
const clear = Array.from(document.getElementsByClassName('clear'));
clear.forEach((button) => {
    button.addEventListener('click', () => {
        display.textContent = '0';
        clearExpression();
    })
})

//requires 'a' to be selected, then an operator, then 'b'
function writeExpression(input) {
    //first button press expression.a will be empty
    //after check if no operator
    if (!expression.aChosen) {  // only goes if aChosen is false
        expression.a.push(input);
        //expression.aChosen = true;
        if (expression.a.slice(-1) == '.') {
            //check if last selection was decimal
            a = parseInt(expression.a.join('')) + '.';
            display.textContent = a
            decimal.disabled = true;
        } else if (expression.a.slice(-1) != '.'){
            a = parseFloat(expression.a.join(''));
            display.textContent = a;
        }
    //confirm a is selected and allow operator to be selected
    } else if (expression.aChosen && !(expression.op)) {
        expression.op = input
        display.textContent = a + ' ' + expression.op;
        decimal.disabled = false;
    //b logic similar to a
    } else {
        expression.b.push(input);
        expression.bChosen = true;
        if (expression.b.slice(-1) == '.') {
            b = parseInt(expression.b.join('')) + '.';
            display.textContent = a + ' ' + expression.op + ' ' + b;
            decimal.disabled = true;
        } else if (expression.b.slice(-1) != '.') {
            b = parseFloat(expression.b.join(''));
            display.textContent = a + ' ' + expression.op + ' ' + b;
        }   
    }
}

function execute() {
    a = parseFloat(expression.a.join(''));
    b = parseFloat(expression.b.join(''));
    //lets continuous operations be done
    a = operate(a, b);
    display.textContent = a;
    clearExpression();
    expression.a = Array.from(a.toString());
    expression.aChosen = true;
    decimal.disabled = true;
    expression.opAgain = true;
}

function operate(a, b) {
    switch (expression.op) {
        case '+':
            return operations.add(a, b);
        case '-':
            return operations.subtract(a, b);
        case '*':
            return operations.multiply(a, b);
        case '/':
            if (b == 0) {
                clearExpression();
                alert("DON'T DO THAT");
                return expression.a = '0';
            } else {
                return operations.divide(a, b);
            }
    }
}

const operations = {
    add(a, b) {
        return a + b;
    },
    subtract(a, b) {
        return a - b;
    },
    multiply(a, b) {
        return a * b;
    },
    divide(a, b) {
        return Math.round((a / b) * 1000) / 1000;
    }
}