console.log('Calclul X pro')


const displayEl = document.querySelector('#display')
console.log(displayEl)

const _displayChar = (char, type) => {
    const digitEl = document.createElement('div')
    digitEl.classList.add('digit')
    if(type !== 'digit'){
        digitEl.classList.add(type)
    }
    digitEl.textContent = char
    displayEl.appendChild(digitEl)
}

const addDigit = (digit) => {
    _displayChar(digit, 'digit')
}

const addSign = (s) => {
    _displayChar(s, 'sign')
}

// r-result ok-bool
const addResult = (r, ok) => {
    // _displayChar('=', 'digit')
    ok ? _displayChar(r, 'ok'): _displayChar(r, 'nok')
}

////task maker

// expr '2+3+23'
// returns list of '2' '+' '3' '23'
// and eval result
const parseExpression = (expr) => {
    let result = eval(expr)
    let array = expr.split(' ')
    return {
        result: result,
        array: array
    }
}

// draw formula on te page
const writeFormulaOnPage = (expr) =>{
    const result = parseExpression(expr)

    result.array.forEach((el)=> {
        if(['+', '-'].includes(el)){
            addSign(el)
        }else{
            addDigit(el)
        }
        console.log(el)
    })

    _displayChar('=', 'digit')

    // addResult(result.result)
    // addResult('_', true)

}

writeFormulaOnPage('2 + 2 - 7')

// addDigit(3)
// addSign('+')
// addDigit(3)
// addResult(' 1', true)