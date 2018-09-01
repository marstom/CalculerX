console.log('index.js')


const calc = (...numbers) => {
    let sum = 0
    numbers.forEach((n) => {
        sum += n
    })
    return sum
}

console.log(calc(2,3,4,3,2,3,4,3,12))

const a = (a, b) => {
    console.log(`twos ${a} ${b}`)
}

const ar = [1,2]

a(...ar) /// like * in python !


// object spread syntax, lik ** i n  p y t h o n !! (require special plugin to babel)
let house  = {
    rooms:2,
    beds:4
}

// let pension = {
    // ...house
// }

const todo = {
    id: 'asdfdasf',
    text: 'pay texes',
    completed:true,
    details: {juice:true, phun:true, fal:false}
}

// const text = todo.text
const { text:tex, completed:com, details:oth='no details provided' } = todo // = alternative text

console.log(tex)
console.log(com)
console.log(oth)

const ages = [12, 32, 43]
const [aa,bb,cc] = ages
console.log(aa,bb,cc)