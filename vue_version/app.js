


Vue.component('math-formula', {
    template: `
    <div>
    <span v-for="e in els">
        <div :class="[{digit:true, sign:isDigit(e)}]">{{ e }}</div>
    </span>

    <span v-if="showResult()">
        <div :class="[{digit:true, ok:isValidResult, nok:!isValidResult}]">{{ result }}</div>
    </span>
    <span v-if="showResult() && goodresult && !isValidResult">
        <div class="digit ok">{{ answer }}</div>
    </span>
    </div>
    `,
    props: {
        k: {
            type: Boolean,
            default: false
        },
        formula: {
            type: String,
            default: ''
        },
        result: {
            type: String,
            default: ''
        },
        show: {
            type: Boolean,
            default: false
        },
        goodresult: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            answer: null
        }
    },
    methods: {
        isDigit(n) {
            if (isNaN(parseInt(n))) {
                return true
            }
            return false
        },

        setAnswer() {
            this.answer = eval(this.formula)
            return this.answer
        },
        showResult() {
            this.answer = eval(this.formula)
            let res = ((this.result !== '') && (this.show === true))
            return res
        }

    },
    computed: {
        els() {
            const formula = this.formula.split(' ')
            formula.push('=')
            return formula
        },

        isValidResult() {
            if (this.setAnswer() === parseInt(this.result)) {
                return true
            }
            return false

        },

    }

})

new Vue({
    el: '#app',
    data: {
        ha: 'tomek',
        result: null,
        showResult: false,
        goodResult: false
    },
    methods: {
        getResult() {
            return this.result
        }

    }
})


