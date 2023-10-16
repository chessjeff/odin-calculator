let expression = {
    a: ['0'],
    op: '',
    b: ['0'],
    aChosen: false,
    bChosen: false,
    opAgain: false,
}

function clearExpression() {
    expression = {
        a: ['0'],
        op: '',
        b: ['0'],
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
        decimal.disabled = false;
        if (expression.bChosen) {
            execute();
            writeExpression(operator.value);
        } else {
            writeExpression(operator.value);
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
        clearExpression();
        display.textContent = expression.a;
    })
})

//requires 'a' to be selected, then an operator, then 'b'
function writeExpression(input) {
    if (!expression.aChosen) {
        expression.a.push(input);
        let aSelection = expression.a.join('');
        if (expression.a.slice(-1) == '.') {
            //only one decimal allowed          
            decimal.disabled = true;
        } else if (expression.a[0] === '0' && expression.a[1] !== '.') {
            expression.a.shift();
            aSelection = expression.a.join('')
        }
        display.textContent = aSelection;
    //confirm a is selected and allow operator to be selected
    } else if (expression.aChosen && !(expression.op)) {
        expression.op = input
        display.textContent = expression.a.join('') + ' ' + expression.op;
    //b logic similar to a
    } else {
        expression.bChosen = true;
        expression.b.push(input);
        let bSelection = expression.b.join('');
        if (expression.b.slice(-1) == '.') {
            decimal.disabled = true;
        } else if (expression.b[0] === '0' && expression.b[1] !== '.') {
            expression.b.shift();
            bSelection = expression.b.join('');
        } 
        display.textContent = expression.a.join('') + ' ' + expression.op + ' ' + bSelection;
    }
}

function execute() {
    a = parseFloat(expression.a.join(''));
    b = parseFloat(expression.b.join(''));
    //lets continuous operations be done
    a = operate(a, b);
    if (isNaN(a)) {
        clearExpression()
        display.textContent = 'SyntaxError'
    } else {
        display.textContent = a;
        clearExpression();
        expression.a = Array.from(a.toString());
        expression.aChosen = true;
        expression.opAgain = true;
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
                return expression.a = ['0'];
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