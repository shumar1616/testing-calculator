let display = document.getElementById('display');
let expression = '';

function appendNumber(num) {
    expression += num;
    display.value = expression;
}

function appendOperator(op) {
    if (expression && !isLastCharOperator()) {
        expression += op;
        display.value = expression;
    }
}

function isLastCharOperator() {
    const lastChar = expression[expression.length - 1];
    return ['+', '-', '*', '/', '.'].includes(lastChar);
}

function clearDisplay() {
    expression = '';
    display.value = '0';
}

function deleteLast() {
    expression = expression.slice(0, -1);
    display.value = expression || '0';
}

function calculate() {
    try {
        // Replace × aur − with * and -
        let result = expression.replace(/×/g, '*').replace(/−/g, '-');
        result = eval(result);
        
        // Round to 10 decimal places
        result = Math.round(result * 10000000000) / 10000000000;
        
        display.value = result;
        expression = result.toString();
    } catch (error) {
        display.value = 'Error';
        expression = '';
    }
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        appendNumber(e.key);
    } else if (e.key === '.') {
        appendNumber('.');
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        appendOperator(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
        calculate();
    } else if (e.key === 'Backspace') {
        deleteLast();
    } else if (e.key === 'Escape') {
        clearDisplay();
    }
});