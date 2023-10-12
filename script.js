let expression = {
    a: [],
    op: '',
    b: [],
}

const display = document.querySelector('.display')

//each number listens and adds itself via writeNumbers
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
        if (expression.a.length > 0 && !expression.op) {
            expression.op = operator.textContent;
            writeExpression();
        };
    })
})

//pressing equals executes expression only after op and b are chosen
const equals = Array.from(document.getElementsByClassName('equals'));
equals.forEach((button) => {
    button.addEventListener('click', () => {
        if (expression.op && expression.b.length > 0) {
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

function clearExpression() {
    expression = {
        a: [],
        op: '',
        b: [],
    }
}

//requires 'a' to be selected, then an operator, then 'b'
function writeExpression(num) {
    let text = display.textContent;
    //first button press expression.a will be empty
    //after check if no operator
    if (expression.a.length < 1 || !expression.op) {
        if (!expression.op) {
            expression.a.push(num);
            a = parseInt(expression.a.join(expression.a, ''));
            display.textContent = a;
        }
    //make sure an operator is selected
    } else if (!(text.includes('+') || text.includes('-') || text.includes('*') || text.includes('/'))) {
        display.textContent = a + ' ' + expression.op;
    //b logic similar to a
    } else {
        expression.b.push(num);
        b = parseInt(expression.b.join(expression.b, ''));
        display.textContent = a + ' ' + expression.op + ' ' + b;
    }
}

function execute() {
    a = parseInt(expression.a.join(expression.a, ''));
    b = parseInt(expression.b.join(expression.b, ''));
    
    //lets continuous operations be done
    a = operate(a, b);
    display.textContent = a;
    expression = {
        a: Array.from(a.toString()).map(Number),
        op: '',
        b: [],
    }
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
        return a / b;
    }
}