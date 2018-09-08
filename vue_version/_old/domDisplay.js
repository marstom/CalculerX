
const rootEl = document.querySelector('#display')

// const displayEl = document.querySelector('#display')
const displayEl = document.createElement('div')
rootEl.appendChild(displayEl)

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

export {_displayChar, newLine, addDigit, addSign, addResult}