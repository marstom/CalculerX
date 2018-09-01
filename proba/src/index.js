console.log('Calclul X pro')


const displayEl = document.querySelector('#display')
console.log(displayEl)

const displayChar = (char, type) => {
    const digitEl = document.createElement('div')
    digitEl.classList.add('digit')
    if(type !== 'digit'){
        digitEl.classList.add(type)
    }
    digitEl.textContent = char
    displayEl.appendChild(digitEl)
}

const addDigit = (digit) => {
    displayChar(digit, 'digit')
}

const addSign = (s) => {
    displayChar(s, 'sign')
}

// r-result ok-bool
const addResult = (r, ok) => {
    displayChar('=', 'digit')
    ok ? displayChar(r, 'ok'): displayChar(r, 'nok')
}

addDigit(3)
addSign('+')
addDigit(3)
addResult(6, true)