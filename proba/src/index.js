/*
TODO child append before action

*/
console.log('Calclul X pro')


const displayEl = document.querySelector('#display')
console.log(displayEl)

const _displayChar = (char, type) => {
    const digitEl = document.createElement('div')
    digitEl.classList.add('digit')
    if (type !== 'digit') {
        digitEl.classList.add(type)
    }
    digitEl.textContent = char
    displayEl.appendChild(digitEl)
}

const newLine = () => {
    const hr = document.createElement('hr')
    displayEl.appendChild(hr)
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
    ok ? _displayChar(r, 'ok') : _displayChar(r, 'nok')
}

////task maker

// expr '2+3+23'
// returns list of '2' '+' '3' '23'
// and eval result

const gameState = {
    score: 0,
    questions: 5
}

class CalclulX {
     
    constructor() {
    }

    set task(expr){
        this.result = this._parseExpression(expr)
    }

    // draw formula on te page
    writeFormulaOnPage() {
        this.result.array.forEach((el) => {
            if (['+', '-', '*', '/', '^', '(', ')'].includes(el)) {
                addSign(el)
            } else {
                addDigit(el)
            }
        })
        _displayChar('=', 'digit')
    }

    displayGoodResult(){
        addResult(this.result.result, true)
    }

    displayUserResult(uresult){
        if(uresult === this.result.result){
            addResult(uresult, true)
        }else{
            addResult(uresult, false)
            addDigit('=>')
            addResult(this.result.result, true)

        }
    }

    _parseExpression(expr) {
        let array = expr.split(' ')
        let result = eval(expr)
        return {
            result: result,
            array: array
        }
    }
}


// good result
const calcul = new CalclulX()
calcul.task = '8 * ( 2 + 12 + 11 ) - 72'
calcul.writeFormulaOnPage()
calcul.displayUserResult(128)

newLine()
calcul.task = '2 + 2'
calcul.writeFormulaOnPage()
calcul.displayUserResult(11)

newLine()
calcul.task = '2 + 2'
calcul.writeFormulaOnPage()