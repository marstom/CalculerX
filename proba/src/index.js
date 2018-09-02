/*
TODO child append before action


Usage:

// good result
const calcul = new CalculX()
calcul.task = '8 * ( 2 + 12 + 11 ) - 72'
calcul.displayUserResult(128)

//bad
newLine()
calcul.task = '2 + 2'
calcul.displayUserResult(11)

//not yet
newLine()
calcul.task = '2 + 2'


*/


import {CalculX} from './calculX'
import {newLine} from './domDisplay'

console.log('Calclul X pro')

/// get task from tasks poool
/*
Task are from 0 to x
x - number of tasks
URLS
GET
/number
{
    number_tasks: 6
}

/tasks?q=3
{
    task: '2 + 3 + 4'
}

/tasks
{
    task: ['2 + 3 + 4', '2 + 3 + 4', '2 + 3 + 4', ...  ]
}

POST:
// perform action add new task
{
    task: '2 + 3 + 4'
}

*/



/// handle result form
// read result
const resultFormEl = document.querySelector('#result-form')
resultFormEl.addEventListener('submit', (e) => {
    e.preventDefault()
    const resEl = document.querySelector('#result')
    const val = resEl.value
    console.log(val)
    calcul.displayUserResult(eval(val))
    newLine()
    // task from pool
    calcul.task = '22 + 11'

    resEl.value = ''
})




// good result
newLine()
const calcul = new CalculX()
calcul.task = '1 + 1'