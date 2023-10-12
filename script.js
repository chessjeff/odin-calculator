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
        // check if first op or further op
        if (expression.aChosen && !expression.op) {
            expression.op = operator.textContent;
            expression.opAgain = true; 
            writeExpression();
        
        } else if (expression.opAgain && expression.bChosen) {
            execute();
            expression.op = operator.textContent;
            expression.opAgain = true;
            writeExpression();
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
function writeExpression(num) {
    let text = display.textContent;

    //first button press expression.a will be empty
    //after check if no operator
    if (!expression.aChosen || !expression.op) {
        if (!expression.op) {

            expression.a.push(num);
            a = parseInt(expression.a.join(expression.a, ''));
            display.textContent = a;

            expression.aChosen = true;
        }
    //make sure an operator is selected
    } else if (!(text.includes('+') || text.includes('-') || text.includes('*') || text.includes('/'))) {
        display.textContent = a + ' ' + expression.op;

    //b logic similar to a
    } else {
        expression.b.push(num);
        b = parseInt(expression.b.join(expression.b, ''));
        display.textContent = a + ' ' + expression.op + ' ' + b;

        expression.bChosen = true;
    }
}

function execute() {
    a = parseInt(expression.a.join(expression.a, ''));
    b = parseInt(expression.b.join(expression.b, ''));
    
    //lets continuous operations be done
    a = operate(a, b);
    display.textContent = a;
    clearExpression();
    expression.a = Array.from(a.toString()).map(Number);
    expression.aChosen = true;

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