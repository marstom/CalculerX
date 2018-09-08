
////task maker

// expr '2+3+23'
// returns list of '2' '+' '3' '23'
// and eval result
import {_displayChar, newLine, addDigit, addSign, addResult} from './domDisplay'

const gameState = {
    score: 0,
    questions: 5
}

class CalculX {
     
    constructor() {
    }

    set task(expr){
        this.result = this._parseExpression(expr)
        this.writeFormulaOnPage()
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

export {CalculX}