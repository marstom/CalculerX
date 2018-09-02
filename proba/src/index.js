/*
TODO child append before action


Usage:

// good result
const calcul = new CalculX()
calcul.task = '8 * ( 2 + 12 + 11 ) - 72'
calcul.writeFormulaOnPage()
calcul.displayUserResult(128)

//bad
newLine()
calcul.task = '2 + 2'
calcul.writeFormulaOnPage()
calcul.displayUserResult(11)

//not yet
newLine()
calcul.task = '2 + 2'
calcul.writeFormulaOnPage()


*/


import {CalculX} from './calculX'
import {newLine} from './domDisplay'

console.log('Calclul X pro')

// good result
const calcul = new CalculX()
calcul.task = '8 * ( 2 + 12 + 11 ) - 72'
calcul.writeFormulaOnPage()
calcul.displayUserResult(128)

//bad
newLine()
calcul.task = '2 + 2'
calcul.writeFormulaOnPage()
calcul.displayUserResult(11)

//not yet
newLine()
calcul.task = '2 + 2'
calcul.writeFormulaOnPage()