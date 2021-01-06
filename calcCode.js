function add(n1, n2){
    newNum = n1 + n2;
    return newNum;
}

function sub(n1, n2){
    newNum = n1 - n2;
    return newNum;
}

function mult(n1, n2){
    newNum = n1 * n2;
    return newNum;
}

function div(n1, n2){
    newNum = n1 / n2;
    return newNum;
}

function operate(operator, n1, n2){ // takes in operator and 2 numbers then calls the proper function 
    if(operator === '+'){
        return add(n1,n2);
    } else if(operator === '-') {
        return sub(n1,n2);
    }else if(operator === '*') {
        return mult(n1,n2);
    }else if(operator === '/') {
        return div(n1,n2);
    }
}

function generateDisplay(event){ 
    if(operators == ''){ // if no operator has been clicked, n1 either is 0 or less than max
        if(number1.length <= 5 && alreadySolution == false){ // can't be bigger than 5
            number1 = number1.toString() + event.target.firstChild.data;
            answerDisplay.textContent = number1;
        } else if(number1.length <= 5 && alreadySolution == true) { // if less than five and previous solution 
            window.prompt('Clicking a number adds the digit to the previous solution');
            alreadySolution = false;
        } else { // larger than 6 digits
            messages.textContent = "Cannot have a number longer than 6 digits";
        }
    } else {
        if(number1.length == 0){ //not necessary I believe
            messages.textContent = "Must Choose a number first";
            operators = '';
        } else {
            if(number2.length <= 5){ // if number 2 is less than 5
                number2 = number2.toString() + event.target.firstChild.data;
                answerDisplay.textContent = number2;
            } else {
                messages.textContent = "Cannot have a number longer than 6 digits";
            }
        }
    }
}

function getOperation (event){
    if(number1.length == 0){ //Only needed here I think // choose a number before clicking operation
        messages.textContent = "Must Choose a number first";
        return;
    } else {
        if(number1.length && number2.length > 0){ // can't continually add numbers
            messages.textContent = "Please Evaluate the two numbers chosen";
            return;
        } else { // we know that number1 has been chosen and number two has not
            operators = event.target.firstChild.data;
            messages.textContent = '';
            answerDisplay.textContent = '';
            equationDisplay.textContent = `${number1} ${operators}`;
            return;
        }
    }
}

function completeOperation(event){
    if(number1.length > 0 && number2.length > 0 && operators.length > 0){ // can't just press equals
        equationDisplay.textContent = `${number1} ${operators} ${number2}`;
        solution = operate(operators, Number(number1), Number(number2)).toString();
        answerDisplay.textContent = solution;
        number1 = solution; // set the solution to the number, and to the answerDisplay
        operators = '';
        number2 = '';
        alreadySolution = true;
    }
}

function clearCalculator(event){
 //resets everything
    number1 = '';
    number2 = '';
    operators = '';
    alreadySolution = false;
    answerDisplay.textContent = ''
    equationDisplay.textContent = '';
    messages.textContent = 'Everything Cleared';
}

let number1 = '';
let number2 = '';
let operators = '';
let alreadySolution = false;

const equationDisplay = document.querySelector('.Equation');
const messages = document.querySelector('.message');
const answerDisplay = document.querySelector('.Answer');

const calcNumbers = document.querySelectorAll('.number');
calcNumbers.forEach(number => number.addEventListener('click', generateDisplay));

const calcOperators = document.querySelectorAll('.operator');
calcOperators.forEach(operator => operator.addEventListener('click', getOperation));

const calcEquals = document.querySelector('.Equals');
calcEquals.addEventListener('click', completeOperation); 

const calcClear = document.querySelector('.Clear');
calcClear.addEventListener('click', clearCalculator); 


